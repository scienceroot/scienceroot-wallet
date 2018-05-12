import {NgModule} from '@angular/core';
import {ScrWalletNewCreateComponent} from './create.component';
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    ScrWalletNewCreateComponent
  ],
  exports: [
    ScrWalletNewCreateComponent
  ],
  providers: []
})
export class ScrWalletNewCreateModule {

}
