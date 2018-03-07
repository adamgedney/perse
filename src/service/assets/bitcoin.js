import CoinKey from 'coinkey';
import { Observable } from "rxjs";
import blockexplorer from 'blockchain.info/blockexplorer';
import { convert } from '../../utils';

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
    return Observable.fromPromise(
      blockexplorer.getBalance(keys.btc)
        .then(address => {
          const key = Object.keys(address)[0];
          const data = { ...address[key] };

          return Promise.resolve({
            address: key,
            ...data,
            final_balance_btc: convert.satoshiToBtc(data.final_balance)
          });
        })
    );
  }
}