import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ScrWallet} from '../core/wallet.model';
import {ScrWalletService} from "../core/wallet.service";

@Component({
  selector: 'scr-wallet-new',
  template: `
    <div>
      <scr-loading [waitFor]="walletReq">
        <div onInit>
          <scr-wallet-new-create (onWalletCreate)="onWalletCreate($event)">
          </scr-wallet-new-create>      
        </div>
        <div onFinish>
          <ng-container *ngIf="!walletSaved">
            <div  fxLayout="row"
                  fxLayoutGap="24px"
                  class="error">
              <div  fxFlex=""
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
          </ng-container>
          <ng-container *ngIf="walletSaved">
            <scr-wallet-new-store [wallet]="wallet"
                                  (onWalletCreationFinished)="onWalletCreationFinished.emit(true)">
            </scr-wallet-new-store>
          </ng-container>
        </div>
      </scr-loading>
    </div>
  `,
  styles: [`
    .error { color: #F44336; }
  `]
})
export class ScrWalletNewComponent {

  @Input() userId: string;

  @Output() onWalletCreationFinished: EventEmitter<boolean> = new EventEmitter();

  public walletReq: Promise<any> = null;
  public walletSaved: boolean;
  public wallet: ScrWallet;

  constructor(
    private _walletService: ScrWalletService
  ) {

  }

  public onWalletCreate(newWallet: any) {
    this.wallet = newWallet;

    this.walletReq = this._walletService.setPublicAddress(this.userId, this.wallet.getPublicKey());
    this.walletReq
      .then(() => this.walletSaved = true)
      .catch(() => this.walletSaved = false);
  }

  public reset() {
    this.walletReq = null;
    this.wallet = null;
  }
}

