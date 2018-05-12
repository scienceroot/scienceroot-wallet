import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ScrWallet} from '../../core/wallet.model';

@Component({
  selector: 'scr-wallet-new-store',
  template: `
    <span class="mat-title">Save backup</span>
    <div  fxLayout="row"
          fxLayoutGap="24px">
      <div  fxFlex="24px"
            fxFlexAlign="center">
        <mat-icon>warning</mat-icon>
      </div>
      <div fxFlex="">
        <p class="mat-body-1">
          Do not lose it! It cannot be recovered if you lose it.
        </p>
        <p class="mat-body-1">
          Do not share it!
        </p>
      </div>
    </div>
    <div class="wallet-info">
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div  fxFlex="75px"
              fxFlexAlign="center">
          <span class="mat-caption">Address</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    #addressField
                    type="text"
                    [value]="wallet.address"
                    readonly />
          </mat-form-field>
        </div>
        <div fxFlex="24px">
          <button mat-icon-button=""
                  [ngxClipboard]="addressField"
                  color="accent">
            <mat-icon>file_copy</mat-icon>
          </button>
        </div>
      </div>
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div  fxFlex="75px"
              fxFlexAlign="center">
          <span class="mat-caption">Public key</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    #publicKeyField
                    type="text"
                    [value]="wallet.seed.keyPair.publicKey"
                    readonly />
          </mat-form-field>
        </div>
        <div fxFlex="24px">
          <button mat-icon-button=""
                  [ngxClipboard]="publicKeyField"
                  color="accent">
            <mat-icon>file_copy</mat-icon>
          </button>
        </div>
      </div>
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div  fxFlex="75px"
              fxFlexAlign="center">
          <span class="mat-caption">Private key</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    #privateKeyField
                    type="text"
                    [value]="wallet.seed.keyPair.privateKey"
                    readonly />
          </mat-form-field>
        </div>
        <div fxFlex="24px">
          <button mat-icon-button=""
                  [ngxClipboard]="privateKeyField"
                  color="accent">
            <mat-icon>file_copy</mat-icon>
          </button>
        </div>
      </div>
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div  fxFlex="75px"
              fxFlexAlign="center">
          <span class="mat-caption">Phrase</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    #seedField
                    type="text"
                    [value]="wallet.seed.phrase"
                    readonly />
          </mat-form-field>
        </div>
        <div fxFlex="24px">
          <button mat-icon-button=""
                  [ngxClipboard]="seedField"
                  color="accent">
            <mat-icon>file_copy</mat-icon>
          </button>
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

    .wallet-info > div { margin: 12px 0; }
    
    mat-form-field, mat-form-field input { width: 100%; }
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
