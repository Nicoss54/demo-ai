import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import type { ILanguageDetectorInstance } from '@demo-ai/shared/ai-api.model';
import { AILanguageDetector } from '../tokens/ai-detector-language';

@Injectable({ providedIn: 'root' })
export class LanguageDetectorService {
  private readonly aiLanguageDetector = inject(AILanguageDetector);
  private _isAvailable = signal<boolean | null>(null);
  detectorInstance: ILanguageDetectorInstance | null = null;

  isAvailable = this._isAvailable.asReadonly();

  constructor() {
    effect(async () => {
      const availability = await this.aiLanguageDetector.availability();
      if (availability === 'available') {
        this.detectorInstance = await this.aiLanguageDetector.create();
      }
      untracked(() => this._isAvailable.set(availability === 'available'));
    });
  }

  async detect(text: string): ReturnType<ILanguageDetectorInstance['detect']> {
    if (this.detectorInstance) {
      return await this.detectorInstance.detect(text);
    }
    return Promise.resolve([]);
  }
}
