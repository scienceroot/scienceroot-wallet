import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ScrWalletNewStoreComponent} from './store.component';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
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
