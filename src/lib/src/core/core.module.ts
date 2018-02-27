import {NgModule} from "@angular/core";
import {Web3ProviderService} from "./web3-provider.service";
import {ScrWalletService} from "./wallet.service";

export * from './wallet.model';
export * from './wallet.const';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ScrWalletService,
    Web3ProviderService
  ]
})
export class ScrWalletCoreModule {

}
