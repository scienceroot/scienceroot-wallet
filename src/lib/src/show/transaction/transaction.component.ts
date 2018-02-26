import {Component, Input, OnInit} from "@angular/core";
import {Web3ProviderService} from "../../core/web3-provider.service";

@Component({
  selector: 'scr-wallet-transaction',
  template: `
    <span class="mat-title">Send coins</span>
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
  `,
  styles: [`
    mat-form-field, input { width: 100%; }
  `]
})
export class ScrWalletTransactionComponent implements OnInit {

  @Input() wallet: any;

  public targetAddress: string;
  public amount: string;

  private _web3: any;

  constructor(private web3Provider: Web3ProviderService) {
    this._web3 = this.web3Provider.get();
  }

  ngOnInit(): void {
    this._web3.eth.getPastLogs({
        address: this.wallet[0].address,
        topics: null
      })
      .then((logs: any) => console.log(logs))
  }

  public sendTransaction() {
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
        .once('transactionHash', (hash: any) => console.log('hash', hash))
        .once('receipt', (receipt: any) => console.log('receipt', receipt))
        .on('confirmation', (confNumber: any, receipt: any) => {
          console.log('confNumber', confNumber);
          console.log('receipt', receipt);
        })
        .on('error', (error: any) => {
          /**
           * A bit of a hack but needed because of the wrong error handling when waiting for transaction receipt.
           * See: https://github.com/ethereum/web3.js/issues/1255
           */

          if(error.message === 'Failed to check for transaction receipt:\n{}') {
            console.log('not really an error')
          } else {
            console.log('error', error)
          }
        })
        .then((receipt: any) => {
          console.log('finally', receipt);
        });
    });
  }


}
