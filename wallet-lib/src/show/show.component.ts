import {Component, Input, OnInit} from '@angular/core';
import {ScrWavesApiService} from '../core/waves-provider.service';

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
export class ScrWalletShowComponent implements OnInit {

  @Input() publicKey: string;

  public address: string;

  constructor(private _wavesApiProvider: ScrWavesApiService) {

  }

  ngOnInit(): void {
    this.address = this._wavesApiProvider.wavesApi.tools.getAddressFromPublicKey(this.publicKey);
  }
}
