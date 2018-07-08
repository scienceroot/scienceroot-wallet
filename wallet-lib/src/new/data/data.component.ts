import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScrWallet} from '../../core/wallet.model';

@Component({
  selector: 'scr-wallet-new-data',
  template: `
    <div fxLayout="row"
         fxLayoutGap="24px">
      <div fxFlex="24px"
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
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="75px"
             fxFlexAlign="center">
          <span class="mat-caption">Address</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input matInput=""
                   #addressField
                   type="text"
                   [value]="wallet.address"
                   readonly/>
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
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="75px"
             fxFlexAlign="center">
          <span class="mat-caption">Public key</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input matInput=""
                   #publicKeyField
                   type="text"
                   [value]="wallet.seed.keyPair.publicKey"
                   readonly/>
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
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="75px"
             fxFlexAlign="center">
          <span class="mat-caption">Private key</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input matInput=""
                   #privateKeyField
                   type="text"
                   [value]="wallet.seed.keyPair.privateKey"
                   readonly/>
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
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="75px"
             fxFlexAlign="center">
          <span class="mat-caption">Phrase</span>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input matInput=""
                   #seedField
                   type="text"
                   [value]="wallet.seed.phrase"
                   readonly/>
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
    <div fxLayout="row" 
         fxLayoutAlign="end">
      <div fxFlex="100px">
        <button mat-raised-button=""
                color="accent"
                (click)="continueClick.emit(true);">
          <span>Continue</span>
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
export class ScrWalletCreateDataComponent implements OnInit {

  @Input() wallet: ScrWallet;

  @Output() continueClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit(): void {

  }
}
