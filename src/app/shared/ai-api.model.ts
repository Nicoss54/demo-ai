export interface IAIMonitorEvent {
  loaded: number;
  total: number;
}

export interface IAIMonitor {
  addEventListener(event: string, callback: (event: IAIMonitorEvent) => void): void;
  removeEventListener(event: string, callback: (event: IAIMonitorEvent) => void): void;
}

export interface IAISharedMonitor {
  monitor?(m: IAIMonitor): void;
}

export interface IAITranslatorOptions extends IAISharedMonitor {
  sourceLanguage: string;
  targetLanguage: string;
}

export interface IAITranslatorInstance {
  translate(text: string): Promise<string>;
  ready: Promise<boolean>;
}

export interface IAITranslator {
  create(options: IAITranslatorOptions): Promise<IAITranslatorInstance>;
  availability(options: IAITranslatorOptions): Promise<string>;
}

export interface IAIDetectorResult {
  detectedLanguage: string;
  confidence: number;
}

export interface IAILanguageDetectorInstance {
  detect(text: string): Promise<IAIDetectorResult[]>;
  ready: Promise<boolean>;
}

export interface IAISummarizerConfig extends IAISharedMonitor {
  sharedContext: string;
  type: string;
  format: string;
  length: string;
}

export interface IAISummarizerInstance {
  summarize(text: string): Promise<string>;
  ready: Promise<boolean>;
}

export interface IAISummarizer {
  create(config?: Partial<IAISummarizerConfig>): Promise<IAISummarizerInstance>;
  availability(): Promise<string>;
}

export interface IAILanguageDetector {
  availability(): Promise<string>;
  create(config?: IAISharedMonitor): Promise<IAILanguageDetectorInstance>;
}

export interface IAIWriterCreateCoreConfig extends IAISharedMonitor {
  tone?: string;
  format?: string;
  length?: string;
  sharedContext?: string;
}

export interface IAIWriterCreateConfig {
  context: string;
}

export interface IAIWriterInstance {
  ready: Promise<boolean>;
  write(text: string, config?: IAIWriterCreateConfig): Promise<string>;
}

export interface IAIWriter {
  create(config?: IAIWriterCreateCoreConfig): Promise<IAIWriterInstance>;
  availability(): Promise<string>;
}
