import {Component, EventEmitter, Output} from "@angular/core";
import {ScrWeb3Container} from "../../../core/wallet.model";
import {Web3ProviderService} from "../../../core/web3-provider.service";
import {SCR_WALLET_STORAGE_KEY} from "../../../core/wallet.const";

@Component({
  selector: 'scr-wallet-private-decrypt',
  template: `
    <div>
      <p class="mat-body-1">Please enter the password to decrypt your wallet.</p>
    </div>
    <div  class="error"
          *ngIf="openError">
      <span class="mat-body-2">{{ openError }}</span>
    </div>
    <div>
      <mat-form-field>
        <input  matInput=""
                [(ngModel)]="password"
                type="password"
                placeholder="Password" />
      </mat-form-field>
    </div>
    <div>
      <button mat-raised-button=""
              (click)="decryptWallet()"
              color="accent">
        Open wallet
      </button>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletPrivateDecryptComponent extends ScrWeb3Container {

  @Output() onDecryptWallet: EventEmitter<any> = new EventEmitter();

  public openError: string = null;
  public password: string;

  constructor(web3Provider: Web3ProviderService) {
    super(web3Provider);
  }

  public decryptWallet() {
    let wallet: any;

    try {
      wallet = this._web3.eth.accounts.wallet.load(this.password, SCR_WALLET_STORAGE_KEY);

      this.onDecryptWallet.emit(wallet);
    } catch(error) {
      this.openError = error.message;
      console.error(error.message);
    }
  }
}
