import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {ScrWalletNewSeedComponent} from './seed.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MatInputModule,
      MatButtonModule
    ],
    declarations: [
      ScrWalletNewSeedComponent
    ],
    exports: [
      ScrWalletNewSeedComponent
    ],
    providers: []
})
export class ScrWalletNewSeedModule {

    constructor() {

    }
}
