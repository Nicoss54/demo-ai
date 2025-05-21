import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  imports: [RouterLink, RouterLinkActive],
})
export class NavMenu {}
