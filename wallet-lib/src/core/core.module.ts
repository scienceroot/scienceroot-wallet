import {NgModule} from '@angular/core';
import {ScrWavesApiService} from './waves-provider.service';

export * from './wallet.model';
export * from './wallet.const';
export * from './waves-provider.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ScrWavesApiService
  ]
})
export class ScrWalletCoreModule {

}
