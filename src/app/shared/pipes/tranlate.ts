import { DestroyRef, inject, Pipe, PipeTransform, signal, untracked } from '@angular/core';
import { TranslatorService } from '@demo-ai/core/providers/service/translator';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Pipe({ name: 'translate', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslatorService);
  private readonly destroyRef = inject(DestroyRef);
  private translation = signal<string>('');

  transform(value: string): string | null {
    const obs = this.translationService.triggerNewTranslation.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(async () => await this.translationService.translate(value)),
    );
    obs.subscribe(translatedText => {
      untracked(() => this.translation.set(translatedText || value));
    });
    return this.translation();
  }
}
