import {NgModule} from '@angular/core';
import {ScrWalletCoreModule} from '../core/core.module';
import {ScrWalletNewComponent} from './new.component';
import {MatButtonModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrWalletNewCreateModule} from './create/create.module';
import {ScrWalletNewStoreModule} from './store/store.module';
import {ScrLoadingModule} from '@scienceroot/design';

export * from './new.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    ScrLoadingModule,
    ScrWalletCoreModule,
    ScrWalletNewCreateModule,
    ScrWalletNewStoreModule
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
