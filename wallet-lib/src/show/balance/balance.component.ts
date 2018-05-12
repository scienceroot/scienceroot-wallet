import {Component, Input, OnInit} from '@angular/core';
import {ScrWavesApiService} from '../../core/waves-provider.service';
import {interval} from 'rxjs/observable/interval';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'scr-wallet-show-balance',
  template: `
    <div>
      <span class="mat-title">Your wallet</span>
      <div fxLayout="row"
           fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-caption">
              Address
            </span>
        <span fxFlex=""
              class="mat-subheading-2">
              {{ address }}
            </span>
      </div>
      <div fxLayout="row"
           fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-caption">
              Current balance
            </span>
        <span fxFlex=""
              class="mat-subheading-2">
              {{ balance | async | number:'1.0-10' }} Waves
            </span>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletShowBalanceComponent implements OnInit {

  @Input() address: string;

  public balance: Promise<number>;

  private _wavesApi: any;

  constructor(private _wavesProvider: ScrWavesApiService) {
    this._wavesApi = this._wavesProvider.wavesApi;
  }

  ngOnInit(): void {
    const checkInterval = interval(10000);

    checkInterval
      .pipe(startWith(0))
      .subscribe(() => this._getBalance());

  }

  private _getBalance() {
    this.balance = this._wavesApi.API.Node.v1.addresses.balance(this.address)
      .then((res: any) => res.balance);
  }
}
