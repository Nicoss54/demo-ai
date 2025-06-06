import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import type { IAILanguageDetectorInstance, IAIMonitor, IAIMonitorEvent } from '@demo-ai/shared/ai-api.model';
import { AILanguageDetector } from '../tokens/ai-detector-language';

@Injectable({ providedIn: 'root' })
export class LanguageDetectorService {
  private readonly aiLanguageDetector = inject(AILanguageDetector);
  private _availableStatus = signal<string | null>(null);
  detectorInstance: IAILanguageDetectorInstance | null = null;

  availableStatus = this._availableStatus.asReadonly();

  constructor() {
    effect(async () => {
      this.detectorInstance = null;
      try {
        const availability = await this.aiLanguageDetector.availability();
        if (['available', 'downloadable', 'downloading'].includes(availability)) {
          this.detectorInstance = await this.aiLanguageDetector.create({
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
          await this.detectorInstance.ready;
          untracked(() => this._availableStatus.set('available'));
        }
      } catch (error) {
        this.detectorInstance = null;
        untracked(() => this._availableStatus.set('unavailable'));
        throw error;
      }
    });
  }

  async detect(text: string): ReturnType<IAILanguageDetectorInstance['detect']> {
    if (this.detectorInstance) {
      return await this.detectorInstance.detect(text);
    }
    return Promise.resolve([]);
  }
}
