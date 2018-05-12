import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrWalletPrivateDecryptComponent} from './decrypt.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatDividerModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [
    ScrWalletPrivateDecryptComponent
  ],
  exports: [
    ScrWalletPrivateDecryptComponent
  ],
  providers: []
})
export class ScrWalletPrivateDecryptModule {

}
