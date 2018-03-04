import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {Web3ProviderService} from "../../../core/web3-provider.service";
import {ScrWeb3Container} from "../../../core/wallet.model";

@Component({
  selector: 'scr-wallet-private-transaction',
  template: `
    <div *ngIf="loading">
      <div  fxLayout="row"
            fxLayoutAlign="center">
        <div fxFlex="100px">
          <mat-spinner  color="primary"
                        strokeWidth="2">
          </mat-spinner>
        </div>
      </div>
    </div>
    <div *ngIf="!loading">
      <span class="mat-title">Send coins</span>
      <div  class="error"
            *ngIf="errorMessage">
        <span class="mat-body-2 error">{{ errorMessage }}</span>
      </div>
      <div  fxLayout="column"
            fxLayoutGap="16px">
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    required=""
                    [(ngModel)]="targetAddress"
                    placeholder="Target address" />
          </mat-form-field>
        </div>
        <div fxFlex="">
          <mat-form-field>
            <input  matInput=""
                    required=""
                    [(ngModel)]="amount"
                    placeholder="Amount (WEI)" />
          </mat-form-field>
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
  `,
  styles: [`
    mat-form-field, input { width: 100%; }
    
    .error { color: #F44336; }
  `]
})
export class ScrWalletTransactionComponent extends ScrWeb3Container implements OnInit {

  @Input() wallet: any;

  @Output() onTransactionSuccess: EventEmitter<any> = new EventEmitter();

  public targetAddress: string;
  public amount: string;

  public loading: boolean = false;
  public errorMessage: string;

  constructor(
    web3Provider: Web3ProviderService,
    public snackBar: MatSnackBar
  ) {
    super(web3Provider);
  }

  ngOnInit(): void {
    this._web3.eth.getPastLogs({
        address: this.wallet[0].address,
        topics: null
      })
      .then((logs: any) => console.log(logs))
  }

  public sendTransaction() {
    if(!this._web3.utils.isAddress(this.targetAddress)) {
      this.errorMessage = 'Target is not a valid address.'
      return;
    }

    this.loading = true;
    this._web3.eth.accounts.signTransaction(
      {
        chainId: 15,
        to: this.targetAddress,
        from: this.wallet[0].address,
        value: this.amount,
        gas: "21000"
      },
      this.wallet[0].privateKey
    ).then((tx: any) => {

      this._web3.eth.sendSignedTransaction(tx.rawTransaction)
        .once('transactionHash', (hash: any) => {
          /**
           * at this point transaction should be succeeded
           */
          console.log('hash', hash);
          this.onSuccess();
        })
        .once('receipt', (receipt: any) => console.log('receipt', receipt))
        .on('confirmation', (confNumber: any, receipt: any) => {
          console.log('confNumber', confNumber);
          console.log('receipt', receipt);
        })
        .on('error', (error: any) => {
          if(error.message === 'Failed to check for transaction receipt:\n{}') {
            /**
             * A bit of a hack but needed because of the wrong error handling when waiting for transaction receipt.
             * See: https://github.com/ethereum/web3.js/issues/1255
             */
            console.log('not really an error')
          } else if(error.message.indexOf('Returned error: known transaction') > -1) {
            this.errorMessage = 'Transaction already known.'
          } else if(error.message.indexOf('insufficient funds') > -1) {
            this.errorMessage = 'Insufficient funds.'
          } else {
            this.errorMessage = 'We\'re sorry! An unknown error occurred, please try again later.'
            console.log('error', error.message)
          }
          this.loading = false;
        })
        .then((receipt: any) => {
          console.log('finally', receipt);
        });
    });
  }

  public onSuccess() {
    this.loading = false;
    this.errorMessage = null;

    // clear the form
    this.targetAddress = null;
    this.amount = null;

    this.snackBar.open('Transaction completed', 'Close',{
      duration: 3000,
    });

    this.onTransactionSuccess.emit(true);
  }
}
