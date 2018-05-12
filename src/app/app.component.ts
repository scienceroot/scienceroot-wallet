import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>@scienceroot/wallet</h1>
      <ul>
        <li>
          <a [routerLink]="['']">Home</a>
        </li>
        <li>
          <a [routerLink]="['new']">Create</a>
        </li>
      </ul>

    </div>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
