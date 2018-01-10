import { Injectable } from '@angular/core';
import { AddressService } from './address.service';
var Buffer = require('buffer/').Buffer;
window.Buffer = Buffer;

// const bitcore = require('bitcore-lib');
import * as bitcore from 'bitcore-lib';

@Injectable()
export class BitcoinService { 
  private _btcAddress;

  constructor(private _address: AddressService) {
    this._btcAddress = _address.getAddress('btc');
  }

  send(SenderPrivateKey, SenderAddress, ReceiverAddress, Amount) {
    // console.log(bitcore);
    // SenderPrivateKey = new bitcore.PrivateKey(SenderPrivateKey, 'testnet');
    // ReceiverAddress = new bitcore.Address(ReceiverAddress, 'testnet');
    // SenderAddress = SenderPrivateKey.toAddress();
    // console.log(SenderPrivateKey);
    // console.log(SenderAddress);
    // console.log(ReceiverAddress);

    // insight.getUnspentUtxos(SenderAddress, function (err, utxos) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     var tx = bitcore.Transaction();
    //     tx.from(utxos);
    //     tx.to(ReceiverAddress, 500000);
    //     tx.change(SenderAddress);
    //     tx.sign(SenderPrivateKey);
    //     tx.serialize();

    //     insight.broadcast(tx.toString(), function (err, txId) {
    //       if (err) {
    //         console.log('Error!:' + err);
    //       } else {
    //         console.log('Successfully sent: ' + txId);
    //       }
    //     });

    //   }
    // });
  }

}
