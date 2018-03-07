import CoinKey from 'coinkey';
import { Observable } from "rxjs";
import blockexplorer from 'blockchain.info/blockexplorer';

export default class Bitcoin {
  address;

  //http://cryptocoinjs.com/guide/getting-started/#creating-a-coinkey-from-a-private-key
  makeKeys(privateKeyHex) {
    return this.address = new CoinKey(
      new Buffer(privateKeyHex, 'hex')
    ).publicAddress;
  }

  getAddress = () => this.address

  getAddressBalance = (keys) => {
    //.final_balance / 100000000
    return Observable.fromPromise(
      blockexplorer.getBalance(keys.btc)
    );
  }
}