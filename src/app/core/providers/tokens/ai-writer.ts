import { InjectionToken } from '@angular/core';

export const AIWriter = new InjectionToken('AI_WRITER', {
  providedIn: 'root',
  factory: () => Writer,
});
