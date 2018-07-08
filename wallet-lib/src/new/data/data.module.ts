import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {ClipboardModule} from 'ngx-clipboard';
import {ScrWalletCreateDataComponent} from './data.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ClipboardModule
  ],
  declarations: [
    ScrWalletCreateDataComponent
  ],
  exports: [
    ScrWalletCreateDataComponent
  ],
  providers: []
})
export class ScrWalletCreateDataModule {

  constructor() {

  }
}
