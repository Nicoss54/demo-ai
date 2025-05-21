import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { ITranslatorInstance } from '@demo-ai/shared/ai-api.model';
import { AITranslator } from '../tokens/ai-translator';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslatorService {
  private readonly AITranslator = inject(AITranslator);
  private translatorInstance: ITranslatorInstance | null = null;
  private _sourceLang = signal('en');
  private _targetLang = signal('fr');
  private _isAvailable = signal<null | boolean>(null);
  private readonly _triggerNewTranslation = new BehaviorSubject<null>(null);

  triggerNewTranslation = this._triggerNewTranslation.asObservable();
  sourceLang = this._sourceLang.asReadonly();
  targetLang = this._targetLang.asReadonly();
  isAvailable = this._isAvailable.asReadonly();

  constructor() {
    /**
     * First effect to check if the model is available for th specific configuration of
     * sourceLang and targetLang
     */
    effect(async () => {
      const sourceLang = this._sourceLang();
      const targetLang = this._targetLang();

      try {
        const availability = await this.AITranslator.availability({ sourceLanguage: sourceLang, targetLanguage: targetLang });
        if (availability === 'available') {
          untracked(() => this._isAvailable.set(true));
        } else {
          untracked(() => this._isAvailable.set(false));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        untracked(() => this._isAvailable.set(false));
      }
    });

    /**
     * Second effect to create the translator Instance
     * This translator instance is created only if the model is available
     */
    effect(async () => {
      this.translatorInstance = null;
      const isAvailable = this._isAvailable();
      const sourceLang = untracked(this._sourceLang);
      const targetLang = untracked(this._targetLang);
      if (isAvailable) {
        this.translatorInstance = await this.AITranslator.create({ sourceLanguage: sourceLang, targetLanguage: targetLang });
        this._triggerNewTranslation.next(null);
      }
    });
  }

  translate(text: string): Promise<string> {
    if (this.translatorInstance) {
      return this.translatorInstance.translate(text);
    }
    return Promise.resolve('');
  }

  setTargetLang(lang: string): void {
    this._isAvailable.set(null);
    this._targetLang.set(lang);
  }
}
