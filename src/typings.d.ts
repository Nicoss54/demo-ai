import { IAILanguageDetector, IAISummarizer, IAITranslator } from '@demo-ai/shared/ai-api.model';

declare global {
  const Translator: IAITranslator;
  const LanguageDetector: IAILanguageDetector;
  const Summarizer: IAISummarizer;
}
