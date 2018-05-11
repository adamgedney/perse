import CoinKey from 'coinkey';
import { Observable } from "rxjs";
import blockexplorer from 'blockchain.info/blockexplorer';
import pushtx from 'blockchain.info/pushtx';
import { convert } from '../../utils';
import bitcoin from 'bitcoinjs-lib';

import chainso from 'node-chainso';
// import using testnet 3 network
// var pushtx = require('blockchain.info/pushtx').usingNetwork(3)

export default class Litecoin {
  address;

  constructor(){
    this.walletFee = 10500; // .05cents was the cost to send $18 from coinbase to this wallet
    this.defaultMinerFee = 70000;
    this.currentRelayFee = 50000;//satoshis : https://bitcointalk.org/index.php?topic=579460.0
  }

  //https://github.com/cryptocoinjs/coinkey#publicaddress
  makeKeys(privateKeyHex) {
    return this.address = new CoinKey(
      new Buffer(privateKeyHex, 'hex'),
      {private: 0xB0, public: 0x30}
    ).publicAddress;
  }

  getAddress = () => this.address

  /**
   * https://chain.so/api
   */
  getAddressBalance = (keys) => {
    return Observable.fromPromise(
      new Promise((resolve,reject)=>{
        chainso.getBalance (chainso.networks.litecoin, keys.litecoin.address, 3, (err, res) => {  
          resolve({ 
            address: res.address,
            ...res, 
            balance: res.confirmed_balance*1
          });
        })
      })
    );
  }

  getAddressTxs = (address, limit) => 
    Observable.fromPromise(blockexplorer.getAddress(address, {limit}))

    /**
     * 
    */
  _createTransactionHex(wif, addressData, toAddress, amount, previousTxHex, lastTxOutputIndex, minerFee = this.defaultMinerFee, relayFee = this.currentRelayFee){
    var txb = new bitcoin.TransactionBuilder();
    const amt = convert.btcToSatoshi(amount);
    const walletFee = this.walletFee;
    const fees = minerFee + relayFee + walletFee;
    const amtToSend = amt - fees;
    const amountToKeep = addressData.final_balance - amtToSend;

    const debugTransaction = true;
    if(debugTransaction){
      console.log('sender balance (satoshi|btc|$): ',addressData.final_balance,convert.satoshiToBtc(addressData.final_balance),'$'+(9300*convert.satoshiToBtc(addressData.final_balance)));
      console.log('-')
      console.log('requested to send (satoshi|btc|$): ',convert.btcToSatoshi(amount), amount, '$'+(9300*amount));
      console.log('-----------------------------------------');
      console.log('Difference: ',(addressData.final_balance-convert.btcToSatoshi(amount)),convert.satoshiToBtc((addressData.final_balance-convert.btcToSatoshi(amount))), '$'+(9300*convert.satoshiToBtc((addressData.final_balance-convert.btcToSatoshi(amount)))));
      console.log('');
      console.log('');
      
      console.log('minerFee (satoshi|btc|$): ',minerFee, convert.satoshiToBtc(minerFee),'$'+(9300*convert.satoshiToBtc(minerFee)));
      console.log('relayFee (satoshi|btc|$): ',relayFee,convert.satoshiToBtc(relayFee),'$'+(9300*convert.satoshiToBtc(relayFee)));
      console.log('minerFee + relayFee (satoshi|btc|$): ',minerFee+relayFee,convert.satoshiToBtc(minerFee+relayFee),'$'+(9300*convert.satoshiToBtc(minerFee+relayFee)));
      console.log('');
      console.log('');
      
      console.log('amtToSend (request send amt - (miner + relay fee) (satoshi|btc|$): ',amtToSend,convert.satoshiToBtc(amtToSend),'$'+(9300*convert.satoshiToBtc(amtToSend)));
      console.log('amountToKeep(diff between sender balance and amt to send) (satoshi|btc|$): ',amountToKeep,convert.satoshiToBtc(amountToKeep),'$'+(9300*convert.satoshiToBtc(amountToKeep)));
      console.log('Diff between amountToKeep and amount to send: ',amountToKeep-amtToSend,convert.satoshiToBtc(amountToKeep-amtToSend),'$'+(9300*convert.satoshiToBtc(amountToKeep-amtToSend)));
    }

    if(amt <= fees){
      alert(`Minimum send value not met. Please send greater than ${convert.satoshiToBtc(fees)} to cover miner fees.`);
    }

    // Input is the previous transaction hash
    txb.addInput(previousTxHex, lastTxOutputIndex); // Alice's previous transaction output, has 15000 satoshis
    txb.addOutput(toAddress, amtToSend);
    txb.addOutput('12tzR61QgEF7Cok2wSzMS5nySTx2dePE9k', walletFee);// e wallet
    txb.addOutput(addressData.address, amountToKeep-fees); // Change tx to self : addressData.final_balance (sender's current balance)

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
  sendTx = (keys,addressData, toAddress, amount) => 
    this.getAddressTxs(addressData.address, 1)
      .map(txData => 
        this._sendTxHex(
          this._createTransactionHex(
            keys.pk.wif,
            addressData, 
            toAddress, 
            amount,
            txData.txs[0].hash,
            txData.txs[0].out[0].n,
          )
        )
      );
}