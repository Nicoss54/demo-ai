import { Component, effect, inject, signal } from '@angular/core';
import { SummarizerService } from '@demo-ai/core/providers/service/summarizer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  templateUrl: './summarizer.html',
  styleUrl: './summarizer.css',
  imports: [NzFormModule, NzInputModule, NzButtonModule],
})
export class Summarizer {
  private readonly summarizerService = inject(SummarizerService);
  private readonly nzNotificationService = inject(NzNotificationService);

  summarizerAvailabilityStatus = this.summarizerService.availableStatus;
  summarizedText = signal<string | null>(null);

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
    const summarize = await this.summarizerService.summarize(text);
    this.summarizedText.set(summarize);
  }
}
