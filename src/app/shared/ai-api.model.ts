export interface ITranslatorOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

export interface ITranslatorInstance {
  translate(text: string): Promise<string>;
}

export interface ITranslator {
  create(options: ITranslatorOptions): Promise<ITranslatorInstance>;
  availability(options: ITranslatorOptions): Promise<string>;
}

export interface IDetectorResult {
  detectedLanguage: string;
  confidence: number;
}

export interface ILanguageDetectorInstance {
  detect(text: string): Promise<IDetectorResult[]>;
}

export interface ILanguageDetector {
  availability(): Promise<string>;
  create(): Promise<ILanguageDetectorInstance>;
}
