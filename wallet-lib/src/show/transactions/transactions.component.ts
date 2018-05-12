import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs/observable/interval';
import {startWith} from 'rxjs/operators';
import {IWavesAPI} from '@waves/waves-api';
import {ScrWavesApiService} from '../../core/core.module';

@Component({
  selector: 'scr-wallet-transactions',
  template: `
    <span class="mat-title">Your transactions</span>
    <div class="transaction-list">
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div fxFlex="24px">
          &nbsp;
        </div>
        <div fxFlex="310px">
          <span class="mat-caption">Recipient</span>
        </div>
        <div fxFlex="">
          <span class="mat-caption">Amount (Waves)</span>
        </div>
      </div>
      <ng-container *ngIf="sent.length > 0; then sentTxList else emptyList;">
      </ng-container>
      <ng-template #sentTxList>
        <ul>
          <li *ngFor="let tx of sent">
            <div  fxLayout="row"
                  fxLayoutGap="24px">
              <div fxFlex="24px">
                <mat-icon>chevron_right</mat-icon>
              </div>
              <div  fxFlex="310px"
                    class="mat-body-1">
                {{tx.recipient.split(':')[1]}}
              </div>
              <div  fxFlex=""
                    class="mat-body-1">
                {{tx.amount | number:'1.0-8'}}
              </div>
            </div>
          </li>
        </ul>
      </ng-template>
    </div>
    <div class="transaction-list">
      <div  fxLayout="row"
            fxLayoutGap="24px">
        <div fxFlex="24px">
          &nbsp;
        </div>
        <div fxFlex="310px">
          <span class="mat-caption">Sender</span>
        </div>
        <div fxFlex="">
          <span class="mat-caption">Amount (Waves)</span>
        </div>
      </div>
      <ng-container *ngIf="received.length > 0; then receivedTxList else emptyList;">
      </ng-container>
      <ng-template #receivedTxList>
        <ul>
          <li *ngFor="let tx of received">
            <div  fxLayout="row"
                  fxLayoutGap="24px">
              <div fxFlex="24px">
                <mat-icon>chevron_left</mat-icon>
              </div>
              <div  fxFlex="310px"
                    class="mat-body-1">
                {{tx.sender}}
              </div>
              <div  fxFlex=""
                    class="mat-body-1">
                {{tx.amount | number:'1.0-8'}}
              </div>
            </div>
          </li>
        </ul>
      </ng-template>
    </div>
    
    <ng-template #emptyList>
      <div  fxLayout="row"
            fxLayoutAlign="center">
        <div fxFlex="150px">
          <span class="mat-caption">No transactions found.</span>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .transaction-list {
      padding: 24px 12px;
    }

    .transaction-list ul {
      list-style: none;
      padding-left: 0;
    }
  `]
})
export class ScrWalletShowTransactionsComponent implements OnInit {

  @Input() address: string;

  public sent: any[] = [];
  public received: any[] = [];

  private _wavesApi: IWavesAPI;

  constructor(private _wavesApiService: ScrWavesApiService) {
    this._wavesApi = this._wavesApiService.wavesApi;
  }

  ngOnInit(): void {
    if (!!this.address) {
      const checkInterval = interval(10000);

      checkInterval
        .pipe(startWith(0))
        .subscribe(() => {
          this._wavesApi.API.Node.v1.transactions.getList(this.address)
            .then((txList) => this._processTransactions(txList));
        });
    }
  }

  private _processTransactions(txList: any[]) {
    this.received = [];
    this.sent = [];

    txList.forEach((tx: any) => {
      const recipientSelf: string = `address:${this.address}`;

      if (tx.recipient === recipientSelf) {
        this.received.push(tx);
      } else if (tx.sender === this.address) {
        this.sent.push(tx);
      }
    });
  }
}
