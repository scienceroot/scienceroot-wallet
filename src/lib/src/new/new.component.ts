import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Web3ProviderService} from "../core/web3-provider.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SCR_WALLET_STORAGE_KEY} from "../core/wallet.const";
import {ScrWalletService} from "../core/wallet.service";

@Component({
  selector: 'scr-wallet-new',
  template: `
    <div>
      <div>
        <ng-container *ngIf="!pkFileURI; then create else store;">
        </ng-container>
      </div>
    </div>
    
    <ng-template #create>
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
    </ng-template>

    <ng-template #store>
      <h1>Save your Keystore File</h1>
      <div>
        <p class="mat-title">
          Do not lose it! It cannot be recovered if you lose it.
        </p>
        <p class="mat-title">
          Do not share it!
        </p>
      </div>
      <div  class="wallet--store"
            fxLayout="row"
            fxLayoutGap="24px">
        <div fxFlex="100px">
          <a  mat-raised-button=""
              color="accent"
              [href]="pkFileURI"
              download="scr_private_key.json">
            Download
          </a>
        </div>
        <div fxFlex="100px">
          <button mat-raised-button=""
                  (click)="onWalletCreationFinished.emit(true)">
            Continue
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .error { color: #F44336; }
  `]
})
export class ScrWalletNewComponent {

  @Input() userId: string;

  @Output() onWalletCreationFinished: EventEmitter<boolean> = new EventEmitter();

  public password: string;
  public passwordError: string;
  public pkFileURI: SafeUrl;

  private _web3: any;
  private _pkFile: string;
  private _pkFilePrefix: string = 'data:text/json;charset=UTF-8,';

  constructor(
    private web3Provider: Web3ProviderService,
    private sanitizer: DomSanitizer,
    private walletService: ScrWalletService
  ) {
    this._web3 = this.web3Provider.get();
  }

  public createWallet() {
    if(this.passwordValid()) {
      let wallet = this._web3.eth.accounts.wallet.create(1);
      let encryptedWallet = wallet.encrypt(this.password);

      this._pkFile = encodeURIComponent(JSON.stringify(encryptedWallet));
      this.pkFileURI = this.sanitizer.bypassSecurityTrustUrl(this._pkFilePrefix + this._pkFile);

      wallet.save(this.password, SCR_WALLET_STORAGE_KEY);

      this.walletService.setPublicAddress(this.userId, wallet[0].address)
        .then((res: any) => console.log(res));
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

