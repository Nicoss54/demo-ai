import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { IAIMonitor, IAITranslatorInstance } from '@demo-ai/shared/ai-api.model';
import { BehaviorSubject, catchError, from, of, switchMap, tap } from 'rxjs';
import { AITranslator } from '../tokens/ai-translator';

@Injectable({ providedIn: 'root' })
export class TranslatorService {
  private readonly AITranslator = inject(AITranslator);
  private translatorInstance: IAITranslatorInstance | null = null;
  private _sourceLang = signal('en');
  private _targetLang = signal('fr');
  private _availableStatus = signal<string | null>(null);
  private translationConfigObject = computed(() => ({ sourceLang: this._sourceLang(), targetLang: this._targetLang() }));
  private readonly _triggerNewTranslation = new BehaviorSubject<null>(null);

  triggerNewTranslation = this._triggerNewTranslation.asObservable();
  targetLang = this._targetLang.asReadonly();
  availableStatus = this._availableStatus.asReadonly();

  constructor() {
    effect(onCleanup => {
      const translationConfig = this.translationConfigObject();
      const translationSetup$ = of(translationConfig).pipe(
        switchMap(({ sourceLang, targetLang }) =>
          from(
            this.AITranslator.availability({
              sourceLanguage: sourceLang,
              targetLanguage: targetLang,
            }),
          ).pipe(
            tap(status => untracked(() => this._availableStatus.set(status))),
            switchMap(() => this.createTranslatorInstance(sourceLang, targetLang)),
            catchError(() => {
              untracked(() => this._availableStatus.set('unavailable'));
              this._triggerNewTranslation.next(null);
              this.translatorInstance = null;
              return of(null);
            }),
          ),
        ),
      );

      const subscription = translationSetup$.subscribe();
      onCleanup(() => subscription.unsubscribe());
    });
  }

  translate(text: string): Promise<string> {
    if (this.translatorInstance) {
      return this.translatorInstance.translate(text);
    }
    return Promise.resolve('');
  }

  setTargetLang(lang: string): void {
    this._availableStatus.set(null);
    this._targetLang.set(lang);
  }

  /**
   * Creates a new translator instance with the specified source and target languages.
   *
   * This method sets the `translatorInstance` to null before attempting to create
   * a new instance using the `AITranslator` service. It monitors the download progress
   * and updates the availability status accordingly. If successful, it marks the
   * instance as ready and triggers a new translation event.
   *
   * @param sourceLang - The source language code for translation.
   * @param targetLang - The target language code for translation.
   * @returns A promise that resolves to the created translator instance.
   * @throws An error if the creation of the translator instance fails.
   */
  private async createTranslatorInstance(sourceLang: string, targetLang: string) {
    this.translatorInstance = await this.AITranslator.create({
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      monitor: (m: IAIMonitor) => {
        m.addEventListener('downloadprogress', e => {
          console.info(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
    await this.translatorInstance.ready;
    this._triggerNewTranslation.next(null);
    untracked(() => this._availableStatus.set('available'));
    return this.translatorInstance;
  }
}
