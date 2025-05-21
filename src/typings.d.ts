import { ITranslator } from '@demo-ai/shared/ai-api.model';

declare global {
  interface Window {
    Translator: ITranslator;
  }
}
