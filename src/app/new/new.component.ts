import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ScrActiveUserService} from '@scienceroot/user';
import {ScrWallet} from '@scienceroot/wallet';

@Component({
  selector: 'app-wallet-new',
  template: `
    <div>
      <scr-wallet-new (walletCreate)="onWalletCreationFinished()">
      </scr-wallet-new>
    </div>
  `,
  styles: [`

  `]
})
export class ScrWalletNewDemoComponent {


  public userId;

  constructor(
    private _router: Router,
    private _activeUserService: ScrActiveUserService
  ) {
    this.userId = this._activeUserService.get().uid;
  }

  public onWalletCreationFinished(wallet: ScrWallet) {
    console.log('finished wallet creation', wallet);

    this._router.navigate(['/wallet']);
  }
}
