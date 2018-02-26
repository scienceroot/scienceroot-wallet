import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ScrWalletNewComponent} from "../new/new.component";
import {ScrWalletNewModule} from "../new/new.module";
import {ScrWalletShowComponent} from "../show/show.component";
import {ScrWalletShowModule} from "../show/show.module";

@NgModule({
  imports: [
    ScrWalletNewModule,
    ScrWalletShowModule,
    RouterModule.forChild([
      {
        path: 'wallet',
        children: [
          { path: 'new', component: ScrWalletNewComponent },
          { path: 'show', component: ScrWalletShowComponent }
        ]
      }
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ScrWalletRoutesModule {

}
