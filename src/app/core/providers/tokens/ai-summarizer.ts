import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from '../tokens/window';

export const AISummarizer = new InjectionToken('AI_SUMMARIZER', {
  providedIn: 'root',
  factory: () => inject(WINDOW).Summarizer,
});
