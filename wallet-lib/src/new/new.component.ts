import {Component, EventEmitter, Output} from '@angular/core';
import {ScrWallet} from '../core/wallet.model';
import {ScrWavesApiService} from '../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-new',
  template: `
    <div>
      <ng-container *ngIf="!wallet">
        <scr-wallet-new-create (onWalletCreate)="onWalletCreated($event)">
        </scr-wallet-new-create>
      </ng-container>
      <ng-container *ngIf="!!wallet">
        <scr-wallet-new-store [wallet]="wallet"
                              (onWalletCreationFinished)="onWalletStored($event)">
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
  `]
})
export class ScrWalletNewComponent {

  @Output() walletCreate: EventEmitter<ScrWallet> = new EventEmitter();

  public walletReq: Promise<any> = null;
  public wallet: ScrWallet;


  constructor() {

  }

  public onWalletCreated(newWallet: any) {
    this.wallet = newWallet;
  }

  public onWalletStored(newWallet: any) {
    this.walletCreate.emit(newWallet);
  }

  public reset() {
    this.walletReq = null;
    this.wallet = null;
  }
}

