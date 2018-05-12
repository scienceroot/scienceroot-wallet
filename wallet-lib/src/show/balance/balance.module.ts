import {NgModule} from '@angular/core';
import {ScrWalletShowBalanceComponent} from './balance.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    ScrWalletShowBalanceComponent
  ],
  exports: [
    ScrWalletShowBalanceComponent
  ],
  providers: []
})
export class ScrWalletShowBalanceModule {

}
