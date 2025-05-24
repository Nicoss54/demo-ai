import { effect, inject, Injectable, signal } from '@angular/core';
import type { IAIMonitor, IAIMonitorEvent, IAIWriterCreateConfig, IAIWriterCreateCoreConfig, IAIWriterInstance } from '@demo-ai/shared/ai-api.model';
import { AIWriter } from '../tokens/ai-writer';

@Injectable({
  providedIn: 'root',
})
export class WriterService {
  private readonly AiWriter = inject(AIWriter);
  private writerInstance: IAIWriterInstance | null = null;
  private writerCoreConfig = signal<IAIWriterCreateCoreConfig>({ tone: 'formal', format: 'plain-text' });
  private _availableStatus = signal<string | null>(null);

  availableStatus = this._availableStatus.asReadonly();

  constructor() {
    effect(async () => {
      const writerCoreConfig = this.writerCoreConfig();
      const availability = await this.AiWriter.availability();
      try {
        if (['available', 'downloadable', 'downloading'].includes(availability)) {
          this.writerInstance = await this.AiWriter.create({
            ...writerCoreConfig,
            monitor: (m: IAIMonitor) => {
              const callBack = (event: IAIMonitorEvent) => {
                console.info(`Downloaded ${event.loaded * 100}%`);
                if (event.loaded === 1) {
                  m.removeEventListener('downloadprogress', callBack);
                }
              };
              m.addEventListener('downloadprogress', callBack);
            },
          });
          await this.writerInstance.ready;
          this._availableStatus.set('available');
        }
      } catch (error) {
        this.writerInstance = null;
        this._availableStatus.set('unavailable');
        throw error;
      }
    });
  }

  write(text: string, config?: IAIWriterCreateConfig): Promise<string> {
    if (!this.writerInstance) {
      return Promise.resolve('');
    }
    return this.writerInstance.write(text, config);
  }
}
