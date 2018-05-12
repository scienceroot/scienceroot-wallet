import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ScrActiveUserService} from '@scienceroot/user';

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


  public userId;

  constructor(
    private _router: Router,
    private _activeUserService: ScrActiveUserService
  ) {
    this.userId = this._activeUserService.get().uid;
  }

  public onWalletCreationFinished() {
    console.log('finished wallet creation');

    this._router.navigate(['/wallet']);
  }
}
