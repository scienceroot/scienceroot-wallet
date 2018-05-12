export class ScrWalletStoreConfig {

  public static readonly storageKeys: any = {
    base: 'scr.wallet.base',
    publicAddress: 'scr.wallet.publicKey',
  };

  public static fetch(): ScrWalletStoreConfig {
    const base = sessionStorage.getItem(ScrWalletStoreConfig.storageKeys.base) || '';
    const publicAddress = sessionStorage.getItem(ScrWalletStoreConfig.storageKeys.publicAddress) || '';

    return new ScrWalletStoreConfig(base, publicAddress);
  }

  constructor(
    public base: string,
    public publicAddress: string
  ) {

  }

  public save() {
    for (const key in ScrWalletStoreConfig.storageKeys) {
      if (ScrWalletStoreConfig.storageKeys.hasOwnProperty(key)) {
        sessionStorage.setItem(
          ScrWalletStoreConfig.storageKeys[key],
          this[key]
        );
      }
    }
  }
}
