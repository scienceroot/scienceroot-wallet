import {NgModule} from "@angular/core";
import {ScrWalletCoreModule} from "../core/core.module";
import {ScrWalletNewComponent} from "./new.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatInputModule} from "@angular/material";
import {CommonModule} from "@angular/common";

export * from './new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ScrWalletCoreModule
  ],
  declarations: [
    ScrWalletNewComponent
  ],
  exports: [
    ScrWalletNewComponent
  ],
  providers: []
})
export class ScrWalletNewModule {

}
