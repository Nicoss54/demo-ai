import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window';

export const AITranslator = new InjectionToken('AI_TRANSLATOR', {
  factory: () => inject(WINDOW).Translator,
});
