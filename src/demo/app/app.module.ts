import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ScrWalletStoreConfig} from "wallet";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  ScrAuthenticationLoginComponent, ScrAuthenticationModule, ScrAuthenticationStoreConfig,
  ScrSecureHttpClientModule
} from "@scienceroot/security";
import {ScrWalletDemoModule} from "./wallet/wallet.module";
import {ScrWalletNewDemoModule} from "./new/new.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
      { path: 'login', component: ScrAuthenticationLoginComponent }
    ]),
    ScrAuthenticationModule,
    ScrSecureHttpClientModule,
    ScrWalletDemoModule,
    ScrWalletNewDemoModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  private host: string = 'https://api.scienceroots.com';
  //private host: string = 'http://localhost:8080';

  constructor() {
    new ScrAuthenticationStoreConfig(
      'scrAuthToken',
      `${this.host}/register`,
      `${this.host}/login`,
      `${this.host}/token`,
    ).save();

    new ScrWalletStoreConfig(
      `${this.host}/users`,
      'publickey'
    ).save();
  }
}

