import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ScrWallet} from '../../core/wallet.model';

@Component({
  selector: 'scr-wallet-new-store',
  template: `
    <span class="mat-title">Save your wallet data as file</span>
    <div>
      <p class="mat-subheading-1">
        Do not lose it! It cannot be recovered if you lose it.
      </p>
      <p class="mat-subheading-1">
        Do not share it!
      </p>
    </div>
    <div class="wallet-info">
      <div fxLayout="row">
        <div fxFlex="75px">
          <span class="mat-caption">Address</span>
        </div>
        <div fxFlex="">
          <span class="mat-body-1">{{wallet.address}}</span>
        </div>
      </div>
      <div fxLayout="row">
        <div fxFlex="75px">
          <span class="mat-caption">Public key</span>
        </div>
        <div fxFlex="">
          <span class="mat-body-1">{{wallet.seed.keyPair.publicKey}}</span>
        </div>
      </div>
      <div fxLayout="row">
        <div fxFlex="75px">
          <span class="mat-caption">Private key</span>
        </div>
        <div fxFlex="">
          <span class="mat-body-1">{{wallet.seed.keyPair.privateKey}}</span>
        </div>
      </div>
      <div fxLayout="row">
        <div fxFlex="75px">
          <span class="mat-caption">Phrase</span>
        </div>
        <div fxFlex="">
          <span class="mat-body-1">{{wallet.seed.phrase}}</span>
        </div>
      </div>
    </div>
    <div  class="wallet--store"
          fxLayout="row"
          fxLayoutGap="24px">
      <div fxFlex="100px">
        <a  mat-raised-button=""
            color="accent"
            [href]="pkFileURI"
            download="scr_wallet_encrypted.txt">
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
  `,
  styles: [`
    .wallet-info { padding: 24px 12px; }
  `]
})
export class ScrWalletNewStoreComponent implements OnChanges {

  @Input() wallet: ScrWallet;

  @Output() onWalletCreationFinished: EventEmitter<any> = new EventEmitter();

  public pkFileURI: SafeUrl;

  private _pkFile: string;
  private _pkFilePrefix: string = 'data:text/plain;charset=UTF-8,';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: any): void {
    if (changes.wallet) {
      this.onWalletChange(changes.wallet);
    }
  }

  private onWalletChange(change: SimpleChange) {
    if (!!change.currentValue) {
      this._pkFile = encodeURIComponent(change.currentValue.encrypted);
      this.pkFileURI = this.sanitizer.bypassSecurityTrustUrl(this._pkFilePrefix + this._pkFile);
    }
  }
}
