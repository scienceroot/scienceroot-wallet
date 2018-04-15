import {Component, EventEmitter, Output} from "@angular/core";
import {SCR_WALLET_STORAGE_KEY} from "../../../core/wallet.const";

@Component({
  selector: 'scr-wallet-private-load',
  template: `
    <span class="mat-title">No local wallet data found</span>
    <mat-divider></mat-divider>
    <div class="load-wallet">
      <span class="mat-body-1">
        Input your keyfile here to open your wallet.
      </span>
      <div class="input-container">
        <button type="button" 
                mat-raised-button=""
                color="accent"
                (click)="walletFileInput.click()">
            <span>Select file</span>
        </button>
        <input hidden 
               type="file"
               #walletFileInput
               (change)="keystoreFileChange($event)"/>
      </div>
    </div>
    <!--<div  fxLayout="row"
          class="divider-container">
      <div fxFlex="">
        <mat-divider></mat-divider>
      </div>
      <div fxFlex="64px">
        <div class="or">
          <span class="mat-subheading-1">OR</span>
        </div>
      </div>
      <div fxFlex="">
        <mat-divider></mat-divider>
      </div>
    </div>
    <div class="new-wallet">
      <span class="mat-body-1">Create a new wallet for your account.</span>
      <div class="link-container">
        <a  mat-raised-button=""
            color="accent">
          <span>New wallet</span>
        </a>
      </div>
    </div>-->
    <mat-divider></mat-divider>
  `,
  styles: [`
    .divider-container {
      height: 64px;
    }

    .divider-container mat-divider {
      margin-top: 32px;
    }
    
    .divider-container .or {
      height: 64px;
      text-align: center;
    }

    .divider-container .or span {
      line-height: 64px;
      vertical-align: middle;
    }

    .load-wallet, .new-wallet {
      padding: 24px;
    }
    
    .load-wallet .input-container,
    .new-wallet .link-container {
      padding: 12px 0;
    }
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
