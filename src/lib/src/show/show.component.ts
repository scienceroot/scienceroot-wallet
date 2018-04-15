import {Component, Input} from "@angular/core";

@Component({
  selector: 'scr-wallet-show',
  template: `
    <div>
      <div class="section">
        <scr-wallet-show-balance [address]="address">
        </scr-wallet-show-balance>
      </div>
      <div class="section">
        <scr-wallet-transactions [address]="address">
        </scr-wallet-transactions>
      </div>
      <div class="section">
        <scr-wallet-private [address]="address">
        </scr-wallet-private>
      </div>
    </div>
  `,
  styles: [`    
    .section { padding: 24px; }
  `]
})
export class ScrWalletShowComponent {

  @Input() address: string;

  constructor() {

  }




}
