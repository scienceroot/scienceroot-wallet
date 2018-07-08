import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ScrWallet} from '../../core/wallet.model';

@Component({
  selector: 'scr-wallet-new-store',
  template: `
    <span class="mat-title">Save encrypted wallet</span>
    <ng-container *ngIf="!fileReady">
      <p class="mat-body-1">
        This password encrypts your wallets data.
      </p>
      <div>
          <span *ngIf="!!passwordError"
                class="scr-warn-text">
            {{ passwordError }}
          </span>
      </div>
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    placeholder="Password"
                    [(ngModel)]="password"
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    minlength="6"
                    required />
          </mat-form-field>
        </div>
        <div fxFlex="100px">
          <button mat-raised-button=""
                  color="accent"
                  (click)="encrypt()">
            <span>Encrypt</span>
          </button>
        </div>
      </div>
    </ng-container>
    <ng-container *ngIf="fileReady">
      <div fxLayout="row" 
           fxLayoutAlign="center">
        <div fxFlex="100px">
          <a  mat-raised-button=""
              color="accent"
              [href]="pkFileURI"
              download="scr_wallet_encrypted.txt">
            Download
          </a>
        </div>
      </div>
    </ng-container>
    <div  class="wallet--store"
          fxLayout="row"
          fxLayoutAlign="end"
          fxLayoutGap="24px">
      <div fxFlex="100px">
        <button mat-raised-button=""
                color="accent"
                (click)="continueClick.emit(wallet)">
          Finish
        </button>
      </div>
    </div>
  `,
  styles: [`
    
  `]
})
export class ScrWalletNewStoreComponent implements OnChanges {

  @Input() wallet: ScrWallet;

  @Output() continueClick: EventEmitter<ScrWallet> = new EventEmitter();

  public pkFileURI: SafeUrl;

  public password: string;
  public passwordError: string;

  public fileReady: boolean = false;
  private _pkFile: string;
  private _pkFilePrefix: string = 'data:text/plain;charset=UTF-8,';

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnChanges(changes: any): void {

  }

  public encrypt() {
    if (this._passwordValid()) {
      this.wallet.password = this.password;
      this._pkFile = encodeURIComponent(this.wallet.encrypted);
      this.pkFileURI = this.sanitizer.bypassSecurityTrustUrl(this._pkFilePrefix + this._pkFile);
      this.fileReady = true;
    }
  }

  private _passwordValid(): boolean {
    let valid: boolean;

    if (!this.password) {
      this.passwordError = 'Password required.';
      valid = false;
    } else if (this.password.length < 6) {
      this.passwordError = 'Password needs at least 6 characters.';
      valid = false;
    } else {
      valid = true;
    }

    return valid;
  }
}
