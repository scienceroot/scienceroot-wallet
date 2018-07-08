import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ScrWallet} from '@scienceroot/wallet';

@Component({
  selector: 'app-wallet-new',
  template: `
    <div>
      <scr-wallet-new (walletCreate)="onWalletCreationFinished($event)">
      </scr-wallet-new>
    </div>
  `,
  styles: [`

  `]
})
export class ScrWalletNewDemoComponent {

  constructor(
    private _router: Router
  ) {

  }

  public onWalletCreationFinished(wallet: ScrWallet) {
    console.log('finished wallet creation', wallet);

    this._router.navigate(['/wallet']);
  }
}
