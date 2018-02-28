import CoinKey from 'coinkey';

export default class Bitcoin {
  btcAddress;

  //http://cryptocoinjs.com/guide/getting-started/#creating-a-coinkey-from-a-private-key
  makeAddress(privateKeyHex) {
    return this.btcAddress = new CoinKey(
      new Buffer(privateKeyHex, 'hex')
    ).publicAddress;
  }

  getAddress = () => this.btcAddress
}