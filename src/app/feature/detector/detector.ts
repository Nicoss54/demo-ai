import { Component, computed, effect, inject, signal } from '@angular/core';
import { LanguageDetectorService } from '@demo-ai/core/providers/service/language-detector';
import type { IAIDetectorResult } from '@demo-ai/shared/ai-api.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const languageIsoMap = new Map([
  ['fr', 'French'],
  ['en', 'English'],
  ['es', 'Spanish'],
  ['de', 'German'],
]);

@Component({
  templateUrl: './detector.html',
  styleUrl: './detector.css',
  imports: [NzFormModule, NzInputModule, NzButtonModule, NzListModule, NzGridModule, NzCardModule],
})
export class Detector {
  private readonly languageDetectorService = inject(LanguageDetectorService);
  private readonly nzNotificationService = inject(NzNotificationService);
  private detectorAvailableStatus = this.languageDetectorService.availableStatus;
  private _detections = signal<IAIDetectorResult[]>([]);

  finalResult = computed(() =>
    this._detections()
      .map(({ detectedLanguage, confidence }) => ({
        detectedLanguage: languageIsoMap.get(detectedLanguage),
        confidence: (confidence * 100).toFixed(2),
      }))
      .filter(({ detectedLanguage }) => !!detectedLanguage),
  );

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

    effect(() => {
      console.table(this.finalResult());
    });
  }

  async detectLanguage(text: string): Promise<void> {
    const response = await this.languageDetectorService.detect(text);
    this._detections.set(response);
  }
}
