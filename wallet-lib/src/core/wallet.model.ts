import {SCR_WALLET_STORAGE_KEY} from './wallet.const';

export class ScrWallet {

  private readonly _encrypted: any;
  private readonly _address: string;

  constructor(
    private _seed: any,
    private _password: string
  ) {
    this._encrypted = this._seed.encrypt(this._password);
    this._address = this._seed.address;
    this._store();
  }

  public getPublicKey(): string {
    return this._seed.keyPair.publicKey;
  }

  get seed(): any {
    return this._seed;
  }

  get address(): string {
    return this._address;
  }

  get encrypted(): any {
    return this._encrypted;
  }

  private _store() {
    const toStore = JSON.stringify({
      publicKey: this._seed.keyPair.publicKey,
      encrypted: this._encrypted
    });

    localStorage.setItem(SCR_WALLET_STORAGE_KEY, toStore);
  }
}
