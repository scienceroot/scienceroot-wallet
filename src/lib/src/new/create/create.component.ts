import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../../core/wallet.const";
import {Web3ProviderService} from "../../core/web3-provider.service";
import {ScrWalletService} from "../../core/wallet.service";
import {ScrWeb3Container} from "../../core/wallet.model";

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
    <div class="wallet--form">
      <p class="mat-body-1">
        This password encrypts your private key. This does not act as a seed to generate your keys.
      </p>
      <p class="mat-body-2">
        You will need this password + your private key to unlock your wallet.
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
export class ScrWalletNewCreateComponent extends ScrWeb3Container {

  @Output() onWalletCreate: EventEmitter<any> = new EventEmitter();

  public passwordError: string;
  public password: string;

  constructor(
    web3Provider: Web3ProviderService
  ) {
    super(web3Provider);
  }

  public createWallet() {
    if(this.passwordValid()) {
      let wallet = this._web3.eth.accounts.wallet.create(1);
      let encryptedWallet = wallet.encrypt(this.password);

      wallet.save(this.password, SCR_WALLET_STORAGE_KEY);

      this.onWalletCreate.emit(encryptedWallet);
    }

  }

  private passwordValid(): boolean {
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
