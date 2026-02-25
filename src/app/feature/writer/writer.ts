import { Component, effect, inject, signal } from '@angular/core';
import { WriterService } from '@demo-ai/core/providers/service/writer';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  templateUrl: './writer.html',
  styleUrl: './writer.css',
  imports: [NzFormModule, NzInputModule, NzButtonModule, NzAlertModule],
})
export class Writer {
  private readonly writerService = inject(WriterService);
  private readonly nzNotificationService = inject(NzNotificationService);
  private availableStatus = this.writerService.availableStatus;

  protected readonly finalResult = signal<string | null>(null);
  protected readonly isLoading = signal(false);

  constructor() {
    effect(() => {
      const availableStatus = this.availableStatus();
      if (availableStatus === 'available') {
        this.nzNotificationService.success('Congratulation', 'Writer AI API is available for this configuration:)');
      }
      if (availableStatus === 'downloading' || availableStatus === 'downloadable') {
        this.nzNotificationService.info('Info', 'Model is currently downloading');
      }
      if (availableStatus === 'unavailable') {
        this.nzNotificationService.error('Error', 'Writer AI API is not available for this configuration:(');
      }
    });
  }

  async write(text: string): Promise<void> {
    this.isLoading.set(true);
    const result = await this.writerService.write(text);
    console.log(result);
    this.isLoading.set(false);
    this.finalResult.set(result);
  }
}
