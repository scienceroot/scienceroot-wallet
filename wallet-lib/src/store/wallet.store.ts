import {ScrWalletStoreConfig} from './wallet-store-config.model';

export class ScrWalletStore {

  public static publicAddressByUserId(userId: string): string {
    console.log('DEPRECATED');
    const config = ScrWalletStoreConfig.fetch();

    return `${config.base}/${userId}/${config.publicAddress}`;
  }
}
