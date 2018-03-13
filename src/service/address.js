import { Observable } from "rxjs";
import 'rxjs/add/observable/of';

import PrivateKeyService from './privateKey';
import AssetsService from './assets';
import walletAddressValidator from 'wallet-address-validator';
import _ from 'underscore';
import assetServices from './assetServices';

export default class Address {
  instance;

  /** Private key set w/ hex, wif, bytes, & passphrase */
  privateKey;

  /** public keys & addresses for the supported assets */
  assets = {};

  privateKeyService;

  constructor() {
    this.assetsService = new AssetsService();
    this.privateKeyService = new PrivateKeyService();
    this.assetsServices = _.mapObject(assetServices, (CurrentService,key) => new CurrentService());

    // Singleton
    if (!this.instance) { this.instance = this; }
    return this.instance;
  }

  getInstance = () => this.instance

  makePrivateKeyFromPhrase(passphrase) {
    return this.privateKey = this.privateKeyService.makePrivateKey(passphrase);
  }

  makePublicAddresses() {
    return this.assetsService.getAssetsList()
      .map(asset => ({
            id: asset.id,
            address: this.assetsServices[`${asset.id}Service`]
              ? this.assetsServices[`${asset.id}Service`]
                .makeKeys(this.privateKey.hex)
              : false
          })
      )
  }
  
  getPrivateKey = () => this.privateKey

  isValidAddress = (address, assetSymbol) => walletAddressValidator.validate(address, assetSymbol)

  //@todo move to another service. Tx service?
  sendTx = (wif,addressData, toAddress, amount, assetId) => 
    this[`${assetId}Service`]
      .sendTx(wif, addressData, toAddress, amount)

}