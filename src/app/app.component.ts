import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div  fxLayout="row"
          class="menu">
      <div  fxFlex="64px"
            class="menu-item logo-container">
        <img src="" alt="" />
      </div>
      <div  class="menu-item"
            fxFlex="">
        <div  fxLayout="row"
              fxLayoutAlign="end center">
          <div fxFlex="150px">
            <scr-user-details-link>
            </scr-user-details-link>
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 24px">
      <div  fxLayout="row"
            fxLayoutAlign="center">
        <div  fxFlex="90%"
              fxFlex.lt-md="100%"
              fxFlex.lt-lg="90%"
              fxFlex.xl="75%">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .menu {
      padding: 0 24px;
      height: 64px;
      background-color: #B1B7C1;
    }

    .menu .menu-item.logo-container {
      padding: 8px 0;
    }

    .menu .menu-item.logo-container img {
      height: 48px;
      width: 48px;
    }
  `]
})
export class AppComponent {
  title = 'app';
}
