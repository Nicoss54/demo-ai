import { InjectionToken } from '@angular/core';

export const AITranslator = new InjectionToken('AI_TRANSLATOR', {
  factory: () => Translator,
});
