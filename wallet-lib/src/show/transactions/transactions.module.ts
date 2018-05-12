import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material';
import {ScrWalletCoreModule} from '../../core/core.module';
import {ScrWalletShowTransactionsComponent} from './transactions.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    ScrWalletCoreModule
  ],
  declarations: [
    ScrWalletShowTransactionsComponent
  ],
  exports: [
    ScrWalletShowTransactionsComponent
  ],
  providers: []
})
export class ScrWalletShowTransactionsModule {

}
