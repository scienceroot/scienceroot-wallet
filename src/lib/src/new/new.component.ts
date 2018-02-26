import {Component} from "@angular/core";
import {Web3ProviderService} from "../core/web3-provider.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {SCR_WALLET_STORAGE_KEY} from "../core/wallet.const";

@Component({
  selector: '',
  template: `
    <div>
      <h1>Create your wallet</h1>
      <div>
        <ng-container *ngIf="!pkFileURI; then create else store;">
        </ng-container>
      </div>
    </div>
    
    <ng-template #create>
      <div class="wallet--form">
        <span *ngIf="!!passwordError">
          {{ passwordError }}
        </span>
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
      <div class="wallet--store">
        <a  mat-raised-button=""
            color="accent"
            [href]="pkFileURI"
            download="scr_private_key.json">
          Speichern
        </a>
      </div>
    </ng-template>
  `,
  styles: [`
  
  `]
})
export class ScrWalletNewComponent {

  public password: string;
  public passwordError: string;
  public pkFileURI: SafeUrl;

  private _web3: any;
  private _pkFile: string;
  private _pkFilePrefix: string = 'data:text/json;charset=UTF-8,';

  constructor(
    private web3Provider: Web3ProviderService,
    private sanitizer: DomSanitizer
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

