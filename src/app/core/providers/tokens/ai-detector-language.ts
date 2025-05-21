import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window';

export const AILanguageDetector = new InjectionToken('LANGUAGE_DETECTOR', { factory: () => inject(WINDOW).LanguageDetector });
