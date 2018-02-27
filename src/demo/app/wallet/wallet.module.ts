import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrWalletDemoComponent} from "./wallet.component";
import {ScrWalletShowModule} from "wallet";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'wallet', component: ScrWalletDemoComponent }
    ]),
    ScrWalletShowModule
  ],
  declarations: [
    ScrWalletDemoComponent
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ScrWalletDemoModule {

}
