import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatorService } from '@demo-ai/core/providers/service/translator';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  templateUrl: './translator.html',
  styleUrl: './translator.css',
  imports: [FormsModule, NzSelectModule, NzInputModule, NzButtonModule, NzFormModule],
})
export class Translator {
  private readonly translatorService = inject(TranslatorService);
  private readonly nzNotificationService = inject(NzNotificationService);
  protected translationAPIAvailable = this.translatorService.availableStatus;

  textToTranslate = signal('');
  translatedText = signal<string | null>(null);
  targetLang = linkedSignal(() => this.translatorService.targetLang());

  constructor() {
    effect(() => {
      const availableStatus = this.translationAPIAvailable();

      if (availableStatus === 'available') {
        this.nzNotificationService.success('Congratulation', 'Translator AI API is available for this configuration:)');
      }

      if (availableStatus === 'downloading' || availableStatus === 'downloadable') {
        this.nzNotificationService.info('Info', 'Model is currently downloading');
      }

      if (availableStatus === 'unavailable') {
        this.nzNotificationService.error('Error', 'Translator AI API is not available for this configuration:(');
      }
    });
  }

  async translate(text: string): Promise<void> {
    const translation = await this.translatorService.translate(text);
    this.translatedText.set(translation);
  }

  changeTargetLang(lang: string): void {
    this.translatorService.setTargetLang(lang);
  }

  setTextToTranslate(textToTranslate: string) {
    this.textToTranslate.set(textToTranslate);
  }
}
