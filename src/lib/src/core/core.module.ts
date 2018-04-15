import {NgModule} from "@angular/core";
import {ScrWavesApiService} from './waves-provider.service';
import {Web3ProviderService} from "./web3-provider.service";
import {ScrWalletService} from "./wallet.service";

export * from './wallet.model';
export * from './wallet.const';
export * from './waves-provider.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ScrWalletService,
    ScrWavesApiService,
    Web3ProviderService
  ]
})
export class ScrWalletCoreModule {

}
