import {NgModule} from "@angular/core";
import {ScrWalletPrivateDecryptModule} from "./decrypt/decrypt.module";
import {ScrWalletPrivateComponent} from "./private.component";
import {ScrWalletTransactionModule} from "./transaction/transaction.module";
import {ScrWalletPrivateLoadModule} from "./load/load.module";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    ScrWalletPrivateLoadModule,
    ScrWalletPrivateDecryptModule,
    ScrWalletTransactionModule
  ],
  declarations: [
    ScrWalletPrivateComponent
  ],
  exports: [
    ScrWalletPrivateComponent
  ],
  providers: []
})
export class ScrWalletPrivateModule {

}
