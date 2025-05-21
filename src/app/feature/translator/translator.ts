import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatorService } from '@demo-ai/core/providers/service/translator';
import { TranslatePipe } from '@demo-ai/shared/pipes/tranlate';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  templateUrl: './translator.html',
  styleUrl: './translator.css',
  imports: [FormsModule, NzSelectModule, NzInputModule, NzButtonModule, NzFormModule, TranslatePipe],
})
export class Translator {
  private readonly translatorService = inject(TranslatorService);
  private readonly nzNotificationService = inject(NzNotificationService);
  protected isTranslatorAPIAvailable = this.translatorService.isAvailable;

  textToTranslate = signal('');
  translatedText = signal<string | null>(null);
  targetLang = linkedSignal(() => this.translatorService.targetLang());

  constructor() {
    effect(() => {
      const isAvailable = this.isTranslatorAPIAvailable();

      if (isAvailable) {
        this.nzNotificationService.success('Congratulation', 'Translator AI API is available for this configuration:)');
      }

      if (isAvailable === false) {
        this.nzNotificationService.error('Error', 'Translator AI API is not available for this configuration:(');
      }
    });
  }

  async translate(text: string): Promise<void> {
    console.log(text);
    const translation = await this.translatorService.translate(text);
    console.log(translation);
    this.translatedText.set(translation);
  }

  changeTargetLang(lang: string): void {
    this.translatorService.setTargetLang(lang);
  }

  setTextToTranslate(textToTranslate: string) {
    this.textToTranslate.set(textToTranslate);
  }
}
