import { IAILanguageDetector, IAISummarizer, IAITranslator } from '@demo-ai/shared/ai-api.model';

declare global {
  interface Window {
    Translator: IAITranslator;
    LanguageDetector: IAILanguageDetector;
    Summarizer: IAISummarizer;
  }
}
