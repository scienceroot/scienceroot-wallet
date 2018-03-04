import {NgModule} from "@angular/core";
import {ScrWalletShowComponent} from "./show.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatInputModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ScrWalletTransactionModule} from "./transaction/transaction.module";
import {ScrWalletCoreModule} from "../core/core.module";
import {ScrWalletShowBalanceModule} from "./balance/balance.module";

export * from './show.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    ScrWalletCoreModule,
    ScrWalletShowBalanceModule,
    ScrWalletTransactionModule
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
