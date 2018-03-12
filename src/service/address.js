import { Observable } from "rxjs";
import 'rxjs/add/observable/of';

import PrivateKeyService from './privateKey';
import AssetService from './assets';
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
    this.assetService = new AssetService();
    this.privateKeyService = new PrivateKeyService();
    this.assetServices = _.mapObject(assetServices, (CurrentService,key) => new CurrentService());

    // Singleton
    if (!this.instance) { this.instance = this; }
    return this.instance;
  }

  getInstance = () => this.instance

  makePrivateKeyFromPhrase(passphrase) {
    this.privateKey = this.privateKeyService.makePrivateKey(passphrase);
    return this.privateKey;
  }

  // makePublicAddress(assetSymbol = "bitcoin") {
  //   this.assets[assetSymbol] = this[`${assetSymbol}Service`]
  //     ? this[`${assetSymbol}Service`].makeKeys(this.privateKey.hex)
  //     : false;

  //   return this.assets[assetSymbol];
  // }

  makePublicAddresses() {
    return this.assetService 
      .getAssetsList()
      .map(assets => 
        this.assets = assets
          .reduce((acc, curr) =>  { 
            return Object.assign({},acc,
              {
                [curr.id]:this.assetServices[`${curr.id}Service`]
              ? this.assetServices[`${curr.id}Service`].makeKeys(this.privateKey.hex)
              : false
              }
            )
          },{})
      );
  }

  getPrivateKey = () => this.privateKey

  isValidAddress = (address, assetSymbol) => walletAddressValidator.validate(address, assetSymbol)

  //@todo move to another service. Tx service?
  sendTx = (wif,addressData, toAddress, amount, assetId) => 
    this[`${assetId}Service`]
      .sendTx(wif, addressData, toAddress, amount)

}