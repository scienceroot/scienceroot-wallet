import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrWalletNewDemoComponent} from "./new.component";
import {ScrWalletNewModule} from "wallet";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'new', component: ScrWalletNewDemoComponent }
    ]),
    ScrWalletNewModule
  ],
  declarations: [
    ScrWalletNewDemoComponent
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ScrWalletNewDemoModule {

}
