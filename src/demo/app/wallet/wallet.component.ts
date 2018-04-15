import {Component} from "@angular/core";
import {ScrWavesApiService} from 'wallet';
import {IWavesAPI} from 'waves-api';

@Component({
  selector: '',
  template: `
    <div>
      <scr-wallet-show [address]="publicAddress">
      </scr-wallet-show>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletDemoComponent {

  public publicAddress: string;

  private _wavesApi: IWavesAPI;

  constructor(private _wavesApiService: ScrWavesApiService) {
    this._wavesApi = this._wavesApiService.wavesApi;
    this.publicAddress = this._wavesApi.tools.getAddressFromPublicKey('DBMD5MEasKPXAu2sYGX6jxYoxyaaBQDyyznxX84mrS33')

    //this._sendTransaction();
  }

  private _sendTransaction() {
    const transferData = {
      recipient: '3FakYmsBTU4Q9GxnHf63ugU2Xn5dxyw5Eof',
      assetId: 'WAVES',
      amount: 100000000,
      feeAssetId: 'WAVES',
      fee: 100000,
      attachment: '',
      timestamp: Date.now()
    };

    this._wavesApi.API.Node.v1.assets.transfer(
      transferData,
      {
        publicKey: '8QQb7fHePewqgXD6wEnTDWKmm5Pnec8YQh7sNqrnF25z',
        privateKey: 'DRBB2AxCb6KvpPSpUwWuV2XYspGM72CXMNKzjbC3VmFG'
      }
    );
  }
}
