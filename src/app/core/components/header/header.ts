import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavMenu } from './menu/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [NgOptimizedImage, NavMenu],
})
export class Header {}
