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
  declarations: [],
  exports: [],
  providers: []
})
export class ScrWalletNewDemoModule {

}
