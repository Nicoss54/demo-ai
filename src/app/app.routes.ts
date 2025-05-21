import { Routes } from '@angular/router';
import { Translator } from './feature/translator/translator';

export const routes: Routes = [
  { path: '', redirectTo: '/translator', pathMatch: 'full' },
  { path: 'translator', component: Translator },
];
