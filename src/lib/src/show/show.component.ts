import {Component} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../core/wallet.const";
import {Web3ProviderService} from "../core/web3-provider.service";
import {interval} from "rxjs/observable/interval";

@Component({
  selector: 'scr-wallet-show',
  template: `
    <div>
      <ng-container *ngIf="!!wallet">
        <div>
          <span class="mat-headline">Your wallet</span>
          <div  fxLayout="row"
                fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-subheading">
              Public address
            </span>
            <span fxFlex=""
                  class="mat-title">
              {{ wallet[0].address }}
            </span>
          </div>
          <div fxLayout="row"
               fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-subheading">
              Current balance
            </span>
            <span fxFlex=""
                  class="mat-title">
              {{ balance | async | number:'1.0-10' }} WEI
            </span>
          </div>
        </div>
      </ng-container>
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
export class ScrWalletShowComponent {

  public openError: string = null;

  public walletIsStored: boolean;
  public password: string;
  public wallet: any;
  public balance: Promise<any>;

  private _web3: any;

  constructor(private web3Provider: Web3ProviderService) {
    this._web3 = this.web3Provider.get();

    this.walletIsStored = !!localStorage.getItem(SCR_WALLET_STORAGE_KEY);

  }

  public decryptWallet() {
    try {
      this.wallet = this._web3.eth.accounts.wallet.load(this.password, SCR_WALLET_STORAGE_KEY);
    } catch(error) {
      this.openError = error.message;
      console.error(error.message);
    }

    this.getWalletBalance();
    const checkInterval = interval(10000);
    checkInterval.subscribe(() => this.getWalletBalance());
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

  public getWalletBalance() {
    this.balance = this._web3.eth.getBalance(this.wallet[0].address);
  }
}
