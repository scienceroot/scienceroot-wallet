import {Injectable} from "@angular/core";

declare const Web3: any;

@Injectable()
export class Web3ProviderService {

  private _web3: any;

  constructor() {
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://chain.scienceroots.com'));
  }

  public get(): any {
    return this._web3;
  }
}
