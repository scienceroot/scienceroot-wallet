export class ScrWallet {

  private _web3: any;

  constructor() {

    if(!this.connected()) {
      throw new Error('Wallet could not connect to node.')
    }

    this._web3.eth.getBalance(this._web3.eth.coinbase, (error: any, result: any) => {
      if(!!error) {
        console.error(error);
      } else {
        console.log(result.toNumber())
      }
    })
  }

  public getAccounts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._web3.eth.getAccounts((error: any, result: any) => {
        if(!!error) {
          reject(new Error('Error on getAccounts.'));
        } else {
          resolve(result);
        }
      });
    })
  }

  private connected(): boolean {
    return this._web3.isConnected();
  }
}
