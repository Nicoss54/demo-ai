import { Component, computed, effect, inject, signal } from '@angular/core';
import { LanguageDetectorService } from '@demo-ai/core/providers/service/language-detector';
import type { IAIDetectorResult } from '@demo-ai/shared/ai-api.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const languageIsoMap = new Map([
  ['fr', 'French'],
  ['en', 'English'],
  ['sp', 'Spanish'],
  ['de', 'German'],
]);

@Component({
  templateUrl: './detector.html',
  styleUrl: './detector.css',
  imports: [NzFormModule, NzInputModule, NzButtonModule],
})
export class Detector {
  private readonly languageDetectorService = inject(LanguageDetectorService);
  private readonly nzNotificationService = inject(NzNotificationService);
  private detectorAvailableStatus = this.languageDetectorService.availableStatus;
  private _detections = signal<IAIDetectorResult[]>([]);

  finalResult = computed(() => {
    const result = this._detections().at(0);
    if (result) {
      return { detectedLanguage: languageIsoMap.get(result.detectedLanguage), confidence: result.confidence * 100 };
    }
    return result;
  });

  constructor() {
    effect(() => {
      const detectorAvailableStatus = this.detectorAvailableStatus();
      if (detectorAvailableStatus === 'available') {
        this.nzNotificationService.success('Congratulation', 'Language Detector AI API is available for this configuration:)');
      }
      if (detectorAvailableStatus === 'downloading' || detectorAvailableStatus === 'downloadable') {
        this.nzNotificationService.info('Info', 'Model is currently downloading');
      }
      if (detectorAvailableStatus === 'unavailable') {
        this.nzNotificationService.error('Error', 'Language Detector AI API is not available for this configuration:(');
      }
    });
  }

  async detectLanguage(text: string): Promise<void> {
    const response = await this.languageDetectorService.detect(text);
    this._detections.set(response);
  }
}
