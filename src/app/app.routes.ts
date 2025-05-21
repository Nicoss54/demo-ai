import { Routes } from '@angular/router';
import { Detector } from './feature/detector/detector';
import { Translator } from './feature/translator/translator';

export const routes: Routes = [
  { path: '', redirectTo: '/translator', pathMatch: 'full' },
  { path: 'translator', component: Translator },
  { path: 'detector', component: Detector },
];
