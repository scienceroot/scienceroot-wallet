import {NgModule} from '@angular/core';
import {ScrWalletNewStoreComponent} from './store.component';
import {MatButtonModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  declarations: [
    ScrWalletNewStoreComponent
  ],
  exports: [
    ScrWalletNewStoreComponent
  ],
  providers: []
})
export class ScrWalletNewStoreModule {

}
