import CoinKey from 'coinkey';
// import Wallet from 'ethereumjs-wallet';

export default class Ethereum {
  address;
  publicKey;

  //http://cryptocoinjs.com/guide/getting-started/#creating-a-coinkey-from-a-private-key
  makeKeys(privateKeyHex) {
    // const wallet = Wallet.fromPrivateKey(privateKeyHex);

    // this.publicKey = wallet.getPublicKeyString();
    // this.address = wallet.getAddressString();

    return {
      publicKey: this.publicKey,
      address: this.address
    };
  }

  getAddress = () => this.address
  getPublicKey = () => this.publicKey
}