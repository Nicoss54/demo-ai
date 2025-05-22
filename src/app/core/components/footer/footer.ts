import { Component } from '@angular/core';
import { TranslatePipe } from '@demo-ai/shared/pipes/tranlate';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div>
        <nz-icon nzType="heart" nzTheme="outline" />
        <span>{{ 'Made with love by' | translate }} Nicolas Frizzarin</span>
      </div>
    </footer>
  `,
  styles: `
    footer {
      all: unset;
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
      box-sizing: border-box;
      height: 100%;
      align-items: center;
      background-image: linear-gradient(to right top, #42a5f5, #85a9f5, #afaef1, #ccb5ec, #e1bee7);
      color: white;
      text-transform: uppercase;

      nz-icon {
        margin-right: 0.5rem;
      }
    }
  `,
  imports: [TranslatePipe, NzIconModule],
})
export class Footer {}
