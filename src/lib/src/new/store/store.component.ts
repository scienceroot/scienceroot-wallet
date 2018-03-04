import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'scr-wallet-new-store',
  template: `
    <h1>Save your Keystore File</h1>
    <div>
      <p class="mat-title">
        Do not lose it! It cannot be recovered if you lose it.
      </p>
      <p class="mat-title">
        Do not share it!
      </p>
    </div>
    <div  class="wallet--store"
          fxLayout="row"
          fxLayoutGap="24px">
      <div fxFlex="100px">
        <a  mat-raised-button=""
            color="accent"
            [href]="pkFileURI"
            download="scr_private_key.json">
          Download
        </a>
      </div>
      <div fxFlex="100px">
        <button mat-raised-button=""
                (click)="onWalletCreationFinished.emit(true)">
          Continue
        </button>
      </div>
    </div>
  `,
  styles: [`
  
  `]
})
export class ScrWalletNewStoreComponent implements OnChanges {

  @Input() wallet: any;

  @Output() onWalletCreationFinished: EventEmitter<any> = new EventEmitter();

  public pkFileURI: SafeUrl;

  private _pkFile: string;
  private _pkFilePrefix: string = 'data:text/json;charset=UTF-8,';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: any): void {
    if(changes.wallet) {
      this.onWalletChange(changes.wallet);
    }
  }

  private onWalletChange(change: SimpleChange) {
    if(!!change.currentValue) {
      console.log(change.currentValue)
      this._pkFile = encodeURIComponent(JSON.stringify(change.currentValue));
      this.pkFileURI = this.sanitizer.bypassSecurityTrustUrl(this._pkFilePrefix + this._pkFile);
    }
  }
}
