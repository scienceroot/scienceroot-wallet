import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {IWavesAPI} from '@waves/waves-api';
import {ScrWallet} from '../../../core/wallet.model';
import {ScrWavesApiService} from '../../../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-private-transaction',
  template: `
    <scr-loading [waitFor]="transactionReq">
      <div onInit>
        <span class="mat-title">New transaction</span>
        <div  class="error"
              *ngIf="errorMessage">
          <span class="mat-body-2 error">{{ errorMessage }}</span>
        </div>
        <div  fxLayout="column"
              fxLayoutGap="12px">
          <div fxFlex="">
            <mat-form-field>
              <input  matInput=""
                      [(ngModel)]="targetAddress"
                      placeholder="Target address" />
            </mat-form-field>
          </div>
          <div fxFlex="">
            <mat-form-field>
              <input  matInput=""
                      [(ngModel)]="amount"
                      placeholder="Amount (Waves)" />
            </mat-form-field>
          </div>
          <div fxFlex="">
            <div fxLayout="row">
              <div fxFlex="75px">
                <span class="mat-caption">Fee</span>
              </div>
              <div>
                <span class="mat-body-2">{{0.001 | number:'0.0-3'}} WAVES</span>
              </div>
            </div>
          </div>
          <div fxFlex="">
            <div  fxLayout="row"
                  fxLayoutAlign="end">
              <div fxFlex="100px">
                <button mat-raised-button=""
                        color="accent"
                        (click)="sendTransaction()">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scr-loading>
  `,
  styles: [`
    mat-form-field, input { width: 100%; }
    
    .error { color: #F44336; }
  `]
})
export class ScrWalletTransactionComponent {

  @Input() wallet: ScrWallet;

  @Output() onTransactionSuccess: EventEmitter<any> = new EventEmitter();

  public targetAddress: string;
  public amount: string;

  public transactionReq: Promise<any>;
  public errorMessage: string;

  private _wavesApi: IWavesAPI;

  constructor(
    private _snackBar: MatSnackBar,
    private _wavesApiService: ScrWavesApiService
  ) {
    this._wavesApi = this._wavesApiService.wavesApi;
  }

  public sendTransaction() {
    if(!this.amount) {
      this.errorMessage = 'Please enter an amount to send.';

      return;
    }

    if(!this.targetAddress) {
      this.errorMessage = 'Please enter a valid target address.';

      return;
    }

    const transferData = {
      recipient: this.targetAddress,
      assetId: 'WAVES',
      amount: this.amount,
      feeAssetId: 'WAVES',
      fee: 100000,
      attachment: '',
      timestamp: Date.now()
    };

    this.transactionReq = this._wavesApi.API.Node.v1.assets
      .transfer(transferData, this.wallet.seed.keyPair);

    this.transactionReq
      .then(() => this._onSuccess())
      .catch((error: any) => this._onError(error));
  }

  private _onSuccess() {
    this.transactionReq = null;
    this.errorMessage = null;

    // clear the form
    this.targetAddress = null;
    this.amount = null;

    this._snackBar.open('Transaction completed', 'Close',{
      duration: 3000,
    });

    this.onTransactionSuccess.emit(true);
  }

  private _onError(error: any) {
    this.transactionReq = null;
    this.errorMessage = error.data.message;
  }
}
