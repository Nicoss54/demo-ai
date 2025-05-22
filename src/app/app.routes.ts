import { Routes } from '@angular/router';
import { Detector } from './feature/detector/detector';
import { Translator } from './feature/translator/translator';
import { Summarizer } from './feature/summarizer/summarizer';

export const routes: Routes = [
  { path: '', redirectTo: '/translator', pathMatch: 'full' },
  { path: 'translator', component: Translator },
  { path: 'detector', component: Detector },
  { path: 'summarizer', component: Summarizer },
];
