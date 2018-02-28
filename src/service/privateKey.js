import "../lib/cryptojs";
import "../lib/cryptojs.sha256";
import "../lib/cryptojs.ripemd160";
import CoinKey from 'coinkey';

export default class PrivateKey {
  /** 12 word phrase */
  passphrase;

  /** pk generated from passphrase */
  privateKey;

  makePrivateKey(passphrase) {
    this.passphrase = passphrase;

    const privateKeyHex = Crypto.SHA256(Crypto.SHA256(passphrase));
    const privateKeyBytes = Crypto.util.hexToBytes(privateKeyHex);
    const buffer = new Buffer(privateKeyHex, 'hex');

    this.privateKey = {
      passphrase,
      privateKeyHex,
      privateKeyBytes,
      privateWif: new CoinKey(buffer).privateWif
    };

    return this.privateKey;
  }

  getPrivatekey = () => this.privateKey
}