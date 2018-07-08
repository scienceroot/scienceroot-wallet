import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ScrWalletStoreConfig} from '@scienceroot/wallet';
import {ScrWalletNewDemoModule} from './new/new.module';
import {ScrWalletDemoModule} from './wallet/wallet.module';


import {AppComponent} from './app.component';
import {
  ScrAuthenticationModule,
  ScrAuthenticationStoreConfig,
  ScrSecureHttpClientModule
} from '@scienceroot/security';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
    ]),
    FlexLayoutModule,
    ScrAuthenticationModule,
    ScrSecureHttpClientModule,
    ScrWalletDemoModule,
    ScrWalletNewDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    const host: string = 'https://api.scienceroots.com';

    new ScrAuthenticationStoreConfig(
      `${host}`,
      'scrAuthToken'
    ).save();

    new ScrWalletStoreConfig(
      `${host}/users`,
      'publickey'
    ).save();
  }
}
