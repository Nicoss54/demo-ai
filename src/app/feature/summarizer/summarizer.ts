import { Component, computed, effect, inject, signal } from '@angular/core';
import { SummarizerService } from '@demo-ai/core/providers/service/summarizer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  templateUrl: './summarizer.html',
  styleUrl: './summarizer.css',
  imports: [NzFormModule, NzInputModule, NzButtonModule, NzListModule],
})
export class Summarizer {
  private readonly summarizerService = inject(SummarizerService);
  private readonly nzNotificationService = inject(NzNotificationService);

  summarizerAvailabilityStatus = this.summarizerService.availableStatus;
  summarizedText = signal<string | null>(null);
  summarizedTextKeyPoints = computed(() =>
    this.summarizedText()
      ?.split('*')
      .map(item => item.replace(/\n/g, '').trim())
      .filter(Boolean),
  );

  isLoading = signal(false);

  constructor() {
    effect(() => {
      const summarizerAvailabilityStatus = this.summarizerAvailabilityStatus();
      if (summarizerAvailabilityStatus === 'available') {
        this.nzNotificationService.success('Congratulation', 'Summarizer AI API is available for this configuration:)');
      }
      if (summarizerAvailabilityStatus === 'downloading' || summarizerAvailabilityStatus === 'downloadable') {
        this.nzNotificationService.info('Info', 'Model is currently downloading');
      }
      if (summarizerAvailabilityStatus === 'unavailable') {
        this.nzNotificationService.error('Error', 'Summarizer AI API is not available for this configuration:(');
      }
    });
  }

  async summarize(text: string): Promise<void> {
    this.isLoading.set(true);
    const summarize = await this.summarizerService.summarize(text);
    this.isLoading.set(false);
    this.summarizedText.set(summarize);
  }
}
