import {Component, Input} from '@angular/core';
import {ScrWallet} from '../../core/wallet.model';
import {SCR_WALLET_STORAGE_KEY} from '../../core/wallet.const';

@Component({
  selector: 'scr-wallet-private',
  template: `
    <div  fxLayout="row"
          fxLayoutAlign="end">
      <div fxFlex="32px">
        <ng-container *ngIf="!wallet">
          <mat-icon class="locked">lock_outline</mat-icon>
        </ng-container>
        <ng-container *ngIf="!!wallet">
          <mat-icon class="unlocked">lock_open</mat-icon>
        </ng-container>
      </div>
    </div>
    <div fxLayout="row">
      <div fxFlex="">
        <div *ngIf="!wallet">
          <div *ngIf="!walletIsStored">
            <scr-wallet-private-load  (onKeyfileLoad)="walletIsStored = true;">
            </scr-wallet-private-load>
          </div>
          <div *ngIf="walletIsStored">
            <scr-wallet-private-decrypt (onDecryptWallet)="wallet = $event;">
            </scr-wallet-private-decrypt>
          </div>
        </div>
        <div *ngIf="!!wallet">
          <scr-wallet-private-transaction [wallet]="wallet">
          </scr-wallet-private-transaction>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .locked { color: #F44336; }
    
    .unlocked { color: #4CAF50; }
  `]
})
export class ScrWalletPrivateComponent {

  @Input() address: string;

  public walletIsStored: boolean;
  public wallet: ScrWallet;

  constructor() {
    this.walletIsStored = !!localStorage.getItem(SCR_WALLET_STORAGE_KEY);
  }
}
