import { InjectionToken } from '@angular/core';

export const AILanguageDetector = new InjectionToken('LANGUAGE_DETECTOR', { factory: () => LanguageDetector });
