import {Component, EventEmitter, Output} from "@angular/core";
import {IWavesAPI} from 'waves-api'
import {ScrWallet} from '../../core/wallet.model';
import {ScrWavesApiService} from '../../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-new-create',
  template: `
    <h1>Create your wallet</h1>
    <div  class="info"
          fxLayout="row"
          fxLayoutGap="24px">
      <div  fxFlex="32px"
            fxFlexAlign="center">
        <mat-icon>info_outline</mat-icon>
      </div>
      <div  fxFlex=""
            fxFlexAlign="center">
        <p>
          We will initially fund your wallet with some coins to play around. It may take a few minutes before the coins appear in your wallet.
        </p>
        <p>
          The coins used in this wallet belong to a private network and have no real value.
        </p>
      </div>
    </div>
    <div class="seed">
      
    </div>
    <div class="wallet--form">
      <p class="mat-body-1">
        This password encrypts your wallets data.
      </p>
      <div>
          <span *ngIf="!!passwordError"
                class="error">
            {{ passwordError }}
          </span>
      </div>
      <mat-form-field>
        <input  matInput=""
                placeholder="Password"
                [(ngModel)]="password"
                type="password"
                minlength="6"
                required />
      </mat-form-field>
    </div>
    <div class="actions">
      <button mat-raised-button=""
              (click)="createWallet()"
              color="accent">
        Create wallet
      </button>
    </div>
  `,
  styles: [`
    .error { color: #F44336; }
  `]
})
export class ScrWalletNewCreateComponent {

  @Output() onWalletCreate: EventEmitter<any> = new EventEmitter();

  public passwordError: string;
  public password: string = 'secret';

  private _wallet: ScrWallet;
  private _wavesApi: IWavesAPI;

  constructor(
    private _wavesProvider: ScrWavesApiService
  ) {
    this._wavesApi = this._wavesProvider.wavesApi;
  }

  public createWallet() {
    if(this._passwordValid()) {
      const seed = this._wavesApi.Seed.create();

      this._wallet = new ScrWallet(seed, this.password);

      this.onWalletCreate.emit(this._wallet);
    }

  }

  private _passwordValid(): boolean {
    let valid: boolean;

    if(!this.password) {
      this.passwordError = 'Password required.';
      valid = false;
    } else if(this.password.length < 6) {
      this.passwordError = 'Password needs at least 6 characters.';
      valid = false;
    } else {
      valid = true;
    }

    return valid;
  }
}
