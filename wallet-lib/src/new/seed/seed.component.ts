import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IWavesAPI} from '@waves/waves-api';
import {ScrWallet} from '../../core/wallet.model';
import {ScrWavesApiService} from '../../core/waves-provider.service';

@Component({
  selector: 'scr-wallet-new-seed',
  template: `
    <div>
      <span class="mat-title">Add existing Account</span>
    </div>
    <div class="form">
      <div fxLayout="row"
           fxLayoutGap="24px">
        <div fxFlex="">
          <mat-form-field>
            <input matInput=""
                   [formControl]="seedFormControl"
                   placeholder="Your seed">
          </mat-form-field>
        </div>
        <div fxFlex="90px">
          <button mat-raised-button=""
                  color="accent"
                  (click)="create()">
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form {
      padding: 24px;  
    }
    
    mat-form-field, mat-form-field input {
      width: 100%;
    }
  `]
})
export class ScrWalletNewSeedComponent implements OnInit {

  @Output() walletCreate: EventEmitter<ScrWallet> = new EventEmitter();

  public seedFormControl: FormControl = new FormControl();

  private _seed: any;
  private _wavesApi: IWavesAPI;

  constructor(
    private _wavesApiProvider: ScrWavesApiService
  ) {
    this._wavesApi = this._wavesApiProvider.wavesApi;
    this.seedFormControl.valueChanges.subscribe(seed => this._seed = seed);
  }

  ngOnInit(): void {

  }

  public create() {
    this._seed = this._wavesApi.Seed.fromExistingPhrase(this._seed);

    const wallet = new ScrWallet(this._seed);

    this.walletCreate.emit(wallet);
  }
}
