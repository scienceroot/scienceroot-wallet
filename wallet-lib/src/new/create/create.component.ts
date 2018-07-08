import {Component, EventEmitter, Output} from '@angular/core';
import {IWavesAPI} from '@waves/waves-api';
import {ScrWallet} from '../../core/wallet.model';
import {ScrWavesApiService} from '../../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-new-create',
  template: `
    <div>
      <span class="mat-title">New Account</span>
    </div>
    <div class="wallet--form">
      <form (submit)="createWallet()">
        <div  fxLayout="row"
              fxLayoutAlign="center">
          <div fxFlex="150px">
            <button mat-raised-button=""
                    type="submit"
                    color="accent">
              Create new account
            </button>
          </div>
        </div>
      </form>
  </div>
`,
  styles: [`
    mat-form-field, mat-form-field input { width: 100%; }
    
    .wallet--form {
      padding: 24px;
    }
  `]
})
export class ScrWalletNewCreateComponent {

  @Output() onWalletCreate: EventEmitter<any> = new EventEmitter();

  private _wallet: ScrWallet;
  private _wavesApi: IWavesAPI;

  constructor(
    private _wavesProvider: ScrWavesApiService
  ) {
    this._wavesApi = this._wavesProvider.wavesApi;
  }

  public createWallet() {
    const seed = this._wavesApi.Seed.create();

    this._wallet = new ScrWallet(seed);

    this.onWalletCreate.emit(this._wallet);
  }
}
