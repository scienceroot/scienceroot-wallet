import {Web3ProviderService} from "./web3-provider.service";

export class ScrWeb3Container {
  protected _web3: any;

  constructor(
    private _web3Provider: Web3ProviderService
  ) {
    this._web3 = this._web3Provider.get();
  }
}

export class ScrWallet extends ScrWeb3Container{

  constructor(
    public publicAddress: string,
    _web3Provider: Web3ProviderService
  ) {
    super(_web3Provider);
  }

  public getBalance(): Promise<number> {
    return this._web3.eth.getBalance(this.publicAddress);
  }
}
