import {Component} from '@angular/core';
import {ScrWavesApiService} from '@scienceroot/wallet';
import {IWavesAPI} from '@waves/waves-api';

@Component({
  selector: 'app-wallet-demo',
  template: `
    <div>
      <scr-wallet-show [publicKey]="'F1j2q8nJitLp5nk8QiJVbSD6UBSTe3AUashtmgUvKaz3'">
      </scr-wallet-show>
    </div>
  `,
  styles: [`

  `]
})
export class ScrWalletDemoComponent {


  private _wavesApi: IWavesAPI;

  constructor(private _wavesApiService: ScrWavesApiService) {
    this._wavesApi = this._wavesApiService.wavesApi;
  }
}
