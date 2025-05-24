import { Routes } from '@angular/router';
import { Detector } from './feature/detector/detector';
import { Summarizer } from './feature/summarizer/summarizer';
import { Translator } from './feature/translator/translator';
import { Writer } from './feature/writer/writer';

export const routes: Routes = [
  { path: '', redirectTo: '/translator', pathMatch: 'full' },
  { path: 'translator', component: Translator },
  { path: 'detector', component: Detector },
  { path: 'summarizer', component: Summarizer },
  { path: 'writer', component: Writer },
];
