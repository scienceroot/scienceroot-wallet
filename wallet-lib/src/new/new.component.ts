import {Component, EventEmitter, Output} from '@angular/core';
import {ScrWallet} from '../core/wallet.model';
import {ScrWavesApiService} from '../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-new',
  template: `
    <div>
      <ng-container *ngIf="activeStep === 'create'">
        <div>
          <span class="mat-display-1">Add your wallet</span>
        </div>
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
              We will initially fund your wallet with some coins to play around.
              It may take a few minutes before the coins appear in your wallet.
            </p>
            <p>
              The coins used in this wallet belong to a private network and have no real value.
            </p>
          </div>
        </div>
        <div class="section">
          <scr-wallet-new-create (onWalletCreate)="onWalletCreated($event)">
          </scr-wallet-new-create>
        </div>
        <mat-divider></mat-divider>
        <div class="section">
          <scr-wallet-new-seed (walletCreate)="onWalletCreated($event)">
          </scr-wallet-new-seed>
        </div>
      </ng-container>
      
      <ng-container *ngIf="activeStep === 'data'">
        <scr-wallet-new-data [wallet]="wallet"
                              (continueClick)="activeStep = 'store'">
        </scr-wallet-new-data>
      </ng-container>
      <ng-container *ngIf="activeStep === 'store'">
        <scr-wallet-new-store [wallet]="wallet"
                              (continueClick)="onWalletStored($event)">
        </scr-wallet-new-store>
      </ng-container>
      <!--<ng-container *ngIf="!walletSaved">
        <div fxLayout="row"
             fxLayoutGap="24px"
             class="error">
          <div fxFlex=""
               fxFlexAlign="center">
            <span>We're sorry. Something went wrong creating your wallet.</span>
          </div>
          <div fxFlex=""
               fxFlexAlign="center">
            <button mat-raised-button=""
                    (click)="reset()"
                    color="warn">
              Retry
            </button>
          </div>
        </div>
      </ng-container>-->
      
    </div>
  `,
  styles: [`
    .error { color: #F44336; }
    .section {
      padding: 24px 0;
    }
  `]
})
export class ScrWalletNewComponent {

  @Output() walletCreate: EventEmitter<ScrWallet> = new EventEmitter();

  public walletReq: Promise<any> = null;
  public wallet: ScrWallet;
  public activeStep: 'create' | 'data' | 'store' = 'create';

  constructor() {

  }

  public onWalletCreated(newWallet: any) {
    this.wallet = newWallet;
    this.activeStep = 'data';
  }

  public onWalletStored(newWallet: any) {
    this.walletCreate.emit(newWallet);
  }

  public reset() {
    this.walletReq = null;
    this.wallet = null;
  }
}

