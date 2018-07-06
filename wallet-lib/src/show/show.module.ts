import {NgModule} from '@angular/core';
import {ScrWalletShowComponent} from './show.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrWalletCoreModule} from '../core/core.module';
import {ScrWalletShowBalanceModule} from './balance/balance.module';
import {ScrWalletPrivateModule} from './private/private.module';
import {ScrWalletShowTransactionsModule} from './transactions/transactions.module';

export * from './show.component';
export * from './balance/balance.module';
export * from './transactions/transactions.module';
export * from './private/private.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    ScrWalletCoreModule,
    ScrWalletShowBalanceModule,
    ScrWalletShowTransactionsModule,
    ScrWalletPrivateModule
  ],
  declarations: [
    ScrWalletShowComponent
  ],
  exports: [
    ScrWalletShowComponent
  ],
  providers: []
})
export class ScrWalletShowModule {

}
