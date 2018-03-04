import {Component, Input} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../core/wallet.const";
import {Web3ProviderService} from "../core/web3-provider.service";
import {interval} from "rxjs/observable/interval";
import {ScrWeb3Container} from "../core/wallet.model";

@Component({
  selector: 'scr-wallet-show',
  template: `
    <div>
      <scr-wallet-show-balance [publicAddress]="publicAddress">
      </scr-wallet-show-balance>
      <ng-container *ngIf="!wallet && walletIsStored">
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
      </ng-container>
      <ng-container *ngIf="!wallet && !walletIsStored">
        <span class="mat-body-1">
          Input your keystore file.
        </span>
        <div>
          <input  type="file"
                  placeholder="Keystorefile"
                  (change)="keystoreFileChange($event)">
        </div>
      </ng-container>
    </div>
    <div *ngIf="!!wallet">
      <scr-wallet-transaction [wallet]="wallet"
                              (onTransactionSuccess)="getWalletBalance()">
      </scr-wallet-transaction>
    </div>
  `,
  styles: [`
    .error { color: #F44336; }
  `]
})
export class ScrWalletShowComponent extends ScrWeb3Container {

  @Input() publicAddress: string;

  public openError: string = null;

  public walletIsStored: boolean;
  public password: string;
  public wallet: any;

  constructor(private web3Provider: Web3ProviderService) {
    super(web3Provider);

    this.walletIsStored = !!localStorage.getItem(SCR_WALLET_STORAGE_KEY);
  }

  public decryptWallet() {
    try {
      this.wallet = this._web3.eth.accounts.wallet.load(this.password, SCR_WALLET_STORAGE_KEY);
    } catch(error) {
      this.openError = error.message;
      console.error(error.message);
    }
  }

  public keystoreFileChange(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      if(!!e.target.result) {
        localStorage.setItem(SCR_WALLET_STORAGE_KEY, e.target.result);
        this.walletIsStored = true;
      }
    };

    fileReader.readAsText(file);
  }
}
