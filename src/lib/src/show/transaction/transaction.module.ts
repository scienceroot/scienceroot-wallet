import {NgModule} from "@angular/core";
import {ScrWalletTransactionComponent} from "./transaction.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule
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
