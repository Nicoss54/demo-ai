import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { AISummarizer } from '../tokens/ai-summarizer';
import { IAISummarizerConfig, IAISummarizerInstance } from '@demo-ai/shared/ai-api.model';

@Injectable({
  providedIn: 'root',
})
export class SummarizerService {
  private readonly AiSummarizer = inject(AISummarizer);
  private _summarizerSharedConfig = signal<Partial<IAISummarizerConfig>>({ type: 'key-points', format: 'plain-text', length: 'medium' });
  private _availableStatus = signal<string | null>(null);
  private summarizerInstance: IAISummarizerInstance | null = null;

  summarizerSharedConfig = this._summarizerSharedConfig.asReadonly();
  availableStatus = this._availableStatus.asReadonly();

  constructor() {
    effect(async () => {
      const config = this.summarizerSharedConfig();
      this.summarizerInstance = null;
      try {
        const availability = await this.AiSummarizer.availability();
        if (['available', 'downloadable', 'downloading'].includes(availability)) {
          this.summarizerInstance = await this.AiSummarizer.create({
            ...config,
            monitor(m) {
              m.addEventListener('downloadprogress', e => {
                console.info(`Downloaded ${e.loaded * 100}%`);
              });
            },
          });
          await this.summarizerInstance.ready;
          untracked(() => this._availableStatus.set('available'));
        }
      } catch (error) {
        this.summarizerInstance = null;
        untracked(() => this._availableStatus.set('unavailable'));
        throw error;
      }
    });
  }

  setSummarizerSharedConfig(config: Partial<IAISummarizerConfig>): void {
    this._summarizerSharedConfig.update(currentConfig => ({ ...currentConfig, ...config }));
  }

  summarize(textToSummarize: string): Promise<string> {
    if (this.summarizerInstance) {
      return this.summarizerInstance.summarize(textToSummarize);
    }
    return Promise.resolve('');
  }
}
