import "../lib/cryptojs";
import "../lib/cryptojs.sha256";
import "../lib/cryptojs.ripemd160";
import CoinKey from 'coinkey';

export default class PrivateKey {
  instance;

  /** 12 word phrase */
  passphrase;

  /** pk generated from passphrase */
  privateKey;

  constructor() {
    if (!this.instance) { this.instance = this; }
    return this.instance;
  }

  getInstance = () => this.instance

  makePrivateKey(passphrase) {
    this.passphrase = passphrase;

    const hex = Crypto.SHA256(Crypto.SHA256(passphrase));
    const bytes = Crypto.util.hexToBytes(hex);
    const buffer = new Buffer(hex, 'hex');

    this.privateKey = {
      passphrase,
      hex,
      bytes,
      wif: new CoinKey(buffer).privateWif
    };

    return this.privateKey;
  }

  getPrivatekey = () => this.privateKey
}