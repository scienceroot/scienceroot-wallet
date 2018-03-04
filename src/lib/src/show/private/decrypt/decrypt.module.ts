import {NgModule} from "@angular/core";
import {ScrWalletPrivateDecryptComponent} from "./decrypt.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
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
