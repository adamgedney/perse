import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import bitcoin from 'bitcoinjs-lib';
// import CoinKey from 'coinkey';

import '../lib/cryptojs';
import '../lib/cryptojs.sha256';
import '../lib/cryptojs.ripemd160';
import '../lib/securerandom';
import '../lib/biginteger';
import '../lib/ellipticcurve';
import '../lib/bitcoinjs-lib';
import '../lib/bitcoinjs-lib.util';
import '../lib/bitcoinjs-lib.eckey';
import '../lib/bitcoinjs-lib.base58';
import '../lib/bitcoinjs-lib.address';

@Injectable()
export class AddressService {
  private password;
  private btcPrivateKey;
  private btcAddress;

  constructor() { }

  makeBTCAddress(password) {
    this.password = password;
    this.btcPrivateKey = this._makeBTCPrivateKey(this.password);
    this.btcAddress = this._makeBTCAddressFromPK(this.btcPrivateKey);

    return new BehaviorSubject<any>({
      password: this.password,
      btc: {
        privateKey: this.btcPrivateKey,
        address: this.btcAddress
      }
    }).asObservable();
  }

  _makeBTCPrivateKey(password) {
    const privateKeyHex = Crypto.SHA256(Crypto.util.hexToBytes(Crypto.SHA256(password)))
    const privateKeyBytes = Crypto.util.hexToBytes(privateKeyHex)

    return {
      privateKeyHex,
      privateKeyBytes
    }
  }

  _makeBTCAddressFromPK({ privateKeyBytes }) {
    let eckey = new Bitcoin.ECKey(privateKeyBytes);
    eckey.compressed = true;

    return eckey.getBitcoinAddress().toString()
  }

}
