import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <div>
      <h1>@scienceroot/wallet</h1>
      <ul>
        <li>
          <a [routerLink]="['']">Home</a>
        </li>
      </ul>

    </div>

    <router-outlet></router-outlet>    
  `,
  styles: [`
    
  `]
})
export class AppComponent {

}

