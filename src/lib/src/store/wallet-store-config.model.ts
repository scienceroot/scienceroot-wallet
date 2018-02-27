export class ScrWalletStoreConfig {

  public static readonly storageKeys: any = {
    base: 'scr.wallet.base',
    publicAddress: 'scr.wallet.publicAddress',
  };

  public static fetch(): ScrWalletStoreConfig {
    let base = sessionStorage.getItem(ScrWalletStoreConfig.storageKeys.base) || '';
    let publicAddress = sessionStorage.getItem(ScrWalletStoreConfig.storageKeys.publicAddress) || '';

    return new ScrWalletStoreConfig(base, publicAddress);
  }

  constructor(
    public base: string,
    public publicAddress: string
  ) {

  }

  public save() {
    for(let key in ScrWalletStoreConfig.storageKeys) {
      sessionStorage.setItem(
        ScrWalletStoreConfig.storageKeys[key],
        this[key]
      );
    }
  }
}
