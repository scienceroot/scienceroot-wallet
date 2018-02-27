import {NgModule} from "@angular/core";
import {ScrWalletCoreModule} from "../core/core.module";
import {ScrWalletNewComponent} from "./new.component";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatIconModule, MatInputModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";

export * from './new.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
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
