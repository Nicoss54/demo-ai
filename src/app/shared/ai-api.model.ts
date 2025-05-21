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
