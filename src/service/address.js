import PrivateKeyService from './privateKey';
import BitcoinService from './bitcoin';

export default class Address {
  privateKey;

  constructor() {
    this.PrivateKeyService = new PrivateKeyService();
    this.BitcoinService = new BitcoinService();
  }

  makePrivateKeyFromPhrase(passphrase) {
    this.privateKey = this.PrivateKeyService.makePrivateKey(passphrase);
    return this.privateKey;
  }

  makePublicAddress(asset = "btc") {
    switch (asset) {
      case 'btc':
      default:
        return this.BitcoinService.makeAddress(this.privateKey.privateKeyHex);
    }
  }

  getPrivateKey = () => this.privateKey
}