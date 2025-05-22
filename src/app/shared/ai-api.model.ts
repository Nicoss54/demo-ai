export interface IAiMonitor {
  addEventListener(event: string, callback: (event: { loaded: number }) => void): void;
}

export interface ITranslatorOptions {
  sourceLanguage: string;
  targetLanguage: string;
  monitor?(m: IAiMonitor): void;
}

export interface ITranslatorInstance {
  translate(text: string): Promise<string>;
  ready: Promise<boolean>;
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
