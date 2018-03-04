import {Component, EventEmitter, Output} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../../../core/wallet.const";

@Component({
  selector: 'scr-wallet-private-load',
  template: `
    <span class="mat-title">Keyfile missing</span>
    <div>
      <span class="mat-body-1">
        Input your keyfile here to open your wallet.
      </span>
      <div>
        <input  type="file"
                placeholder="Keyfile"
                (change)="keystoreFileChange($event)">
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletPrivateLoadComponent {

  @Output() onKeyfileLoad: EventEmitter<any> = new EventEmitter();

  public keystoreFileChange(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      if(!!e.target.result) {
        localStorage.setItem(SCR_WALLET_STORAGE_KEY, e.target.result);
        this.onKeyfileLoad.emit(true);
      }
    };

    fileReader.readAsText(file);
  }
}
