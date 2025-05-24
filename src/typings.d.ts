import type { IAILanguageDetector, IAISummarizer, IAITranslator, IAIWriter } from '@demo-ai/shared/ai-api.model';

declare global {
  const Writer: IAIWriter;
  const Translator: IAITranslator;
  const LanguageDetector: IAILanguageDetector;
  const Summarizer: IAISummarizer;
}
