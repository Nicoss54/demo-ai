import { InjectionToken } from '@angular/core';

export const AISummarizer = new InjectionToken('AI_SUMMARIZER', {
  providedIn: 'root',
  factory: () => Summarizer,
});
