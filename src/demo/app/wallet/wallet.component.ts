import {Component} from "@angular/core";
import {ScrWavesApiService} from 'wallet';
import {IWavesAPI} from 'waves-api';

@Component({
  selector: '',
  template: `
    <div>
      <scr-wallet-show [publicKey]="'DBMD5MEasKPXAu2sYGX6jxYoxyaaBQDyyznxX84mrS33'">
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
