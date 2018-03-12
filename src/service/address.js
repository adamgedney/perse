import PrivateKeyService from './privateKey';
import AssetService from './assets';
import BitcoinService from './assetServices/bitcoin';
import EthereumService from './assetServices/ethereum';
import walletAddressValidator from 'wallet-address-validator';

export default class Address {
  instance;

  /** Private key set w/ hex, wif, bytes, & passphrase */
  privateKey;

  /** public keys & addresses for the supported assets */
  assets = {};

  supportedAssets;
  privateKeyService;
  bitcoinService;
  ethereumService;

  constructor() {
    this.supportedAssets = new AssetService().getSupportedAssets();
    this.privateKeyService = new PrivateKeyService();
    this.bitcoinService = new BitcoinService();
    this.ethereumService = new EthereumService();

    // Singleton
    if (!this.instance) { this.instance = this; }
    return this.instance;
  }

  getInstance = () => this.instance

  makePrivateKeyFromPhrase(passphrase) {
    this.privateKey = this.privateKeyService.makePrivateKey(passphrase);
    return this.privateKey;
  }

  makePublicAddress(assetSymbol = "bitcoin") {
    // if (assetSymbol) {
    this.assets[assetSymbol] = this[`${assetSymbol}Service`]
      ? this[`${assetSymbol}Service`].makeKeys(this.privateKey.hex)
      : false;

    return this.assets[assetSymbol];
    // } else {
    //   return this.assets = this.supportedAssets.reduce((curr, acc) => {
    //     console.log('SA', curr, acc);
    //     return this[`${assetSymbol}Service`]
    //       ? acc[assetSymbol] = this[`${assetSymbol}Service`].makeKeys(this.privateKey.privateKeyHex)
    //       : acc;
    //   }, {});
    // }
  }

  getPrivateKey = () => this.privateKey

  isValidAddress = (address, assetSymbol) => walletAddressValidator.validate(address, assetSymbol)

  //@todo move to another service. Tx service?
  sendTx = (wif,addressData, toAddress, amount, assetId) => 
    this[`${assetId}Service`]
      .sendTx(wif, addressData, toAddress, amount)

}