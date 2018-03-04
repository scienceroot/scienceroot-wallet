import {Component, Input} from "@angular/core";
import {Web3ProviderService} from "../core/web3-provider.service";
import {ScrWeb3Container} from "../core/wallet.model";

@Component({
  selector: 'scr-wallet-show',
  template: `
    <div>
      <span class="mat-headline">Your wallet</span>
      <div class="section">
        <scr-wallet-show-balance [publicAddress]="publicAddress">
        </scr-wallet-show-balance>
      </div>
      <div class="section">
        <scr-wallet-private [publicAddress]="publicAddress">
        </scr-wallet-private>
      </div>
    </div>
  `,
  styles: [`    
    .section { padding: 24px; }
  `]
})
export class ScrWalletShowComponent extends ScrWeb3Container {

  @Input() publicAddress: string;

  constructor(private web3Provider: Web3ProviderService) {
    super(web3Provider);
  }




}
