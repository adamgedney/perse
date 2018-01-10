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
  private privateKey;
  private btcAddress;

  constructor() { }

  makeBTCAddress() {
    this.btcAddress = this._makeBTCAddressFromPK(this.privateKey);

    return new BehaviorSubject<any>({
      password: this.password,
      btc: {
        privateKey: this.privateKey,
        address: this.btcAddress
      }
    }).asObservable();
  }

  makePrivateKey(password) {
    const privateKeyHex = Crypto.SHA256(Crypto.util.hexToBytes(Crypto.SHA256(password)))
    const privateKeyBytes = Crypto.util.hexToBytes(privateKeyHex)

    this.privateKey = {
      privateKeyHex,
      privateKeyBytes
    };

    return this.privateKey;
  }

  _makeBTCAddressFromPK({ privateKeyBytes }) {
    let eckey = new Bitcoin.ECKey(privateKeyBytes);
    eckey.compressed = true;

    return eckey.getBitcoinAddress().toString()
  }

  getAddress(type = 'btc') {
    return this[`${type}Address`];
  }
}
