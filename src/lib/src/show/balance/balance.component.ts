import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Web3ProviderService} from "../../core/web3-provider.service";
import {ScrWallet, ScrWeb3Container} from "../../core/wallet.model";
import {interval} from "rxjs/observable/interval";
import {startWith} from "rxjs/operators";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'scr-wallet-show-balance',
  template: `
    <div>
      <span class="mat-headline">Your wallet</span>
      <div  fxLayout="row"
            fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-subheading">
              Public address
            </span>
        <span fxFlex=""
              class="mat-title">
              {{ publicAddress }}
            </span>
      </div>
      <div fxLayout="row"
           fxLayoutGap="24px">
            <span fxFlex="130px"
                  class="mat-subheading">
              Current balance
            </span>
        <span fxFlex=""
              class="mat-title">
              {{ balance | async | number:'1.0-10' }} WEI
            </span>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletShowBalanceComponent extends ScrWeb3Container implements OnInit, OnDestroy {

  @Input() publicAddress: string;

  public balance: Promise<number>;

  private _wallet: ScrWallet;
  private _checkSub: Subscription;

  constructor(private web3Provider: Web3ProviderService) {
    super(web3Provider);
  }

  ngOnInit(): void {
    this._wallet = new ScrWallet(this.publicAddress, this.web3Provider);

    const checkInterval = interval(10000);
    this._checkSub = checkInterval.pipe(startWith(0))
      .subscribe(() => this.balance = this._wallet.getBalance());

  }

  ngOnDestroy(): void {
    this._checkSub.unsubscribe();
  }
}
