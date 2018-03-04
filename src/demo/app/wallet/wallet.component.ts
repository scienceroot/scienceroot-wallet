import {Component} from "@angular/core";

@Component({
  selector: '',
  template: `
    <div>
      <scr-wallet-show [publicAddress]="publicAddress">
      </scr-wallet-show>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletDemoComponent {

  public publicAddress: string = '0x6c5893B4e19e837022437071D09d92BEd58A8A07';
}
