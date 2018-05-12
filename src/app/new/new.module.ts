import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ScrAuthenticationGuard} from '@scienceroot/security';
import {ScrActiveUserModule} from '@scienceroot/user';
import {ScrWalletNewDemoComponent} from './new.component';
import {ScrWalletNewModule} from '@scienceroot/wallet';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'new', component: ScrWalletNewDemoComponent, canActivate: [ScrAuthenticationGuard] }
    ]),
    ScrActiveUserModule,
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
