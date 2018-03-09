import CoinKey from 'coinkey';
import { Observable } from "rxjs";
import blockexplorer from 'blockchain.info/blockexplorer';
import pushtx from 'blockchain.info/pushtx';
import { convert } from '../../utils';
import bitcoin from 'bitcoinjs-lib';
// import using testnet 3 network
// var pushtx = require('blockchain.info/pushtx').usingNetwork(3)

export default class Bitcoin {
  address;

  constructor(){
    this.defaultMinerFee = 3000;
  }

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

  getAddressTxs = (address, limit) => 
    Observable.fromPromise(blockexplorer.getAddress(address, {limit}))

  _createTransactionHex(wif, fromAddress, toAddress, amount, previousTxHex, minerFee = this.defaultMinerFee){
    var txb = new bitcoin.TransactionBuilder();

    // Input is the previous transaction hash
    txb.addInput(previousTxHex, 0); // Alice's previous transaction output, has 15000 satoshis
    txb.addOutput(toAddress, amount + minerFee);
    txb.sign(0, bitcoin.ECPair.fromWIF(wif));// Wif of the sender

    // prepare for broadcast to the Bitcoin network
    return txb.build().toHex();
  }

  _sendTxHex = transaction => Observable.fromPromise(pushtx.pushtx(transaction))
  // _sendTxHex = transaction => Observable.fromPromise(
  //   new Promise((resolve,reject)=>{
  //     console.log('transaction',transaction); 
  //     resolve({transaction});
  //   })
  // )

  // Public api for creating and sending a bitcoin tx
  sendTx = (wif,fromAddress, toAddress, amount) => {
    return this.getAddressTxs(fromAddress, 1)
      .map(txData => 
        this._sendTxHex(
          this._createTransactionHex(
            wif,
            fromAddress, 
            toAddress, 
            convert.btcToSatoshi(amount),
            txData.txs[0].hash, 
          )
        )
      );
  }
}