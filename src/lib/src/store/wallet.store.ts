import {ScrWalletStoreConfig} from "./wallet-store-config.model";

export class ScrWalletStore {

  public static publicAddressByUserId(userId: string): string {
    let config = ScrWalletStoreConfig.fetch();

    return `${config.base}/${userId}/${config.publicAddress}`;
  }
}
