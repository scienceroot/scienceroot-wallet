import {NgModule} from '@angular/core';
import {ClipboardModule} from 'ngx-clipboard';
import {ScrWalletNewStoreComponent} from './store.component';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ClipboardModule
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
