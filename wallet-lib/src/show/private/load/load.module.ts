import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatDividerModule} from '@angular/material';
import {ScrWalletPrivateLoadComponent} from './load.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [
    ScrWalletPrivateLoadComponent
  ],
  exports: [
    ScrWalletPrivateLoadComponent
  ],
  providers: []
})
export class ScrWalletPrivateLoadModule {

}
