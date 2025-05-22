import { Component } from '@angular/core';
import { Header } from '@demo-ai/core/components/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@demo-ai/core/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
