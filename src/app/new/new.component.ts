import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet-new',
  template: `
    <div>
      <scr-wallet-new [userId]="userId"
                      (onWalletCreationFinished)="onWalletCreationFinished()">
      </scr-wallet-new>
    </div>
  `,
  styles: [`

  `]
})
export class ScrWalletNewDemoComponent {


  public userId = 'a867c686-25cd-4686-81bf-471b7d1a4ff8';

  constructor(private router: Router) {
  }

  public onWalletCreationFinished() {
    console.log('finished wallet creation');

    this.router.navigate(['/wallet']);
  }
}
