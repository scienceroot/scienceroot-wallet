import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ScrWalletStore} from '../store/wallet.store';

@Injectable()
export class ScrWalletService {

  constructor(private httpClient: HttpClient) {
  }

  public setPublicAddress(userId: string, publicKey: string): Promise<any> {
    const url = ScrWalletStore.publicAddressByUserId(userId);

    return this.httpClient.post(url, publicKey).toPromise();
  }
}
