import {NgModule} from "@angular/core";
import {ScrLoadingModule} from '@scienceroot/design';
import {ScrWalletTransactionComponent} from "./transaction.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import {ScrWalletCoreModule} from "../../../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    ScrLoadingModule,
    ScrWalletCoreModule
  ],
  declarations: [
    ScrWalletTransactionComponent
  ],
  exports: [
    ScrWalletTransactionComponent
  ],
  providers: []
})
export class ScrWalletTransactionModule {

}
