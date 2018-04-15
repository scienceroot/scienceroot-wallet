import {Injectable} from '@angular/core';
import {create, TESTNET_CONFIG} from 'waves-api'
import {SCR_WAVES_CONFIG} from '../../index';

@Injectable()
export class ScrWavesApiService {

  private readonly _wavesApi: any;

  constructor() {
    this._wavesApi = create(SCR_WAVES_CONFIG);
  }

  get wavesApi(): any {
    return this._wavesApi;
  }
}
