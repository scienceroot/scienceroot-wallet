import {Component, EventEmitter, Output} from "@angular/core";
import {IWavesAPI} from 'waves-api';
import {SCR_WALLET_STORAGE_KEY, ScrWallet} from '../../../..';
import {ScrWavesApiService} from '../../../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-private-decrypt',
  template: `
    <span class="mat-title">Local wallet is encrypted</span>
    <mat-divider></mat-divider>
    <div class="decrypt-form">
      <div>
        <p class="mat-body-1">Please enter the password to decrypt your wallet.</p>
      </div>
      <div  class="error"
            *ngIf="openError">
        <span class="mat-body-2">{{ openError }}</span>
      </div>
      <div fxLayout="row">
        <div  fxFlex="200px"
              fxFlexAlign="center">
          <mat-form-field>
            <input  matInput=""
                    required
                    [(ngModel)]="password"
                    type="password"
                    placeholder="Password" />
          </mat-form-field>
        </div>
        <div  fxFlex=""
              fxFlexAlign="center">
          <button mat-raised-button=""
                  (click)="decryptWallet()"
                  color="accent">
            Decrypt
          </button>
        </div>
      </div>
    </div>
    <mat-divider></mat-divider>
  `,
  styles: [`
    .decrypt-form {
      padding: 24px 12px;
    }
  `]
})
export class ScrWalletPrivateDecryptComponent {

  @Output() onDecryptWallet: EventEmitter<any> = new EventEmitter();

  public openError: string = null;
  public password: string;

  private _wavesApi: IWavesAPI;

  constructor(private _wavesApiService: ScrWavesApiService) {
    this._wavesApi = this._wavesApiService.wavesApi;
  }

  public decryptWallet() {
    const stored = localStorage.getItem(SCR_WALLET_STORAGE_KEY);

    if (!!stored) {
      this.openError = null;

      const walletRaw = JSON.parse(stored);

      try {
        const seedPhrase = this._wavesApi.Seed.decryptSeedPhrase(walletRaw.encrypted, this.password);
        const seed = this._wavesApi.Seed.fromExistingPhrase(seedPhrase);
        const wallet = new ScrWallet(seed, this.password);

        this.onDecryptWallet.emit(wallet);
      } catch (e) {
        console.log(e)
        this.openError = 'Unable to restore wallet. Please check your password and try again.';
      }
    } else {
      this.openError = 'No wallet locally stored.';
    }
  }
}
