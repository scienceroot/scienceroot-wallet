import {Component} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../core/wallet.const";
import {Web3ProviderService} from "../core/web3-provider.service";
import {FileChangeEvent} from "@angular/compiler-cli/src/perform_watch";

@Component({
  selector: '',
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
      <scr-wallet-transaction [wallet]="wallet">
      </scr-wallet-transaction>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletShowComponent {

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
    this.wallet = this._web3.eth.accounts.wallet.load(this.password, SCR_WALLET_STORAGE_KEY);
    this.getWalletBalance();
    console.log(this.wallet)
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

  private getWalletBalance() {
    this.balance = this._web3.eth.getBalance(this.wallet[0].address);
  }
}
