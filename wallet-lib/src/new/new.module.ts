import {NgModule} from '@angular/core';
import {ScrWalletCoreModule} from '../core/core.module';
import {ScrWalletCreateDataModule} from './data/data.module';
import {ScrWalletNewComponent} from './new.component';
import {MatButtonModule, MatDividerModule, MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrWalletNewCreateModule} from './create/create.module';
import {ScrWalletNewSeedModule} from './seed/seed.module';
import {ScrWalletNewStoreModule} from './store/store.module';
import {ScrLoadingModule} from '@scienceroot/design';

export * from './new.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ScrLoadingModule,
    ScrWalletCoreModule,
    ScrWalletNewCreateModule,
    ScrWalletNewStoreModule,
    ScrWalletNewSeedModule,
    ScrWalletCreateDataModule
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
