import { Observable } from "rxjs";
import { convert } from '../../utils';
import ethereum from 'ethereumjs-wallet';
import { INFURA_MAIN_NETWORK_URL } from '../../utils/constants';
import Web3 from 'web3';

export default class Ethereum {
  address;

  constructor(){
    this.walletFee = 10500; // ~$1 @ btc $9500
    this.defaultMinerFee = 70000;
    this.currentRelayFee = 50000;//satoshis : https://bitcointalk.org/index.php?topic=579460.0
    this.web3;

    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_MAIN_NETWORK_URL));
    }
  }

  makeKeys(privateKeyHex) {
    const ethAddresses = new ethereum.fromPrivateKey(
      new Buffer(privateKeyHex, 'hex')
    );
    return this.address = ethAddresses.getAddressString();
  }

  getAddress = () => this.address
  isValidAddress = address => this.web3.isAddress(address)

  getAddressBalance = (keys) => {
    const self = this;
    return Observable.of(
      (function(){
        const balance = self.web3.eth.getBalance(keys.ethereum.address).toNumber();
        
        return { 
          address: keys.ethereum.address,
          balance: self.web3.fromWei(balance, "ether" )
        };
      })()
    );
  }

  // getAddressTxs = (address, limit) => 
  //   Observable.fromPromise(blockexplorer.getAddress(address, {limit}))

    /**
     * https://medium.com/@orweinberger/how-to-create-a-raw-transaction-using-bitcoinjs-lib-1347a502a3a
     * https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/transactions.js#L14
     * https://medium.com/@gcwelborn/crafting-a-blockchain-transaction-with-javascript-3946bda1df7b
     * Fees: https://bitcoin.stackexchange.com/questions/22068/how-do-i-find-out-the-miners-fee-for-my-transaction-using-blockchain-info-api
     * @param {*} wif 
     * @param {*} fromAddress 
     * @param {*} toAddress 
     * @param {*} amount 
     * @param {*} previousTxHex 
     * @param {*} vout_sz 
     * @param {*} minerFee 
     */
  _createTransactionHex(wif, addressData, toAddress, amount, previousTxHex, lastTxOutputIndex, minerFee = this.defaultMinerFee, relayFee = this.currentRelayFee){
    // var txb = new bitcoin.TransactionBuilder();
    // const amt = convert.btcToSatoshi(amount);
    // const walletFee = this.walletFee;
    // const fees = minerFee + relayFee + walletFee;
    // const amtToSend = amt - fees;
    // const amountToKeep = addressData.final_balance - amtToSend;

    // const debugTransaction = true;
    // if(debugTransaction){
    //   console.log('sender balance (satoshi|btc|$): ',addressData.final_balance,convert.satoshiToBtc(addressData.final_balance),'$'+(9300*convert.satoshiToBtc(addressData.final_balance)));
    //   console.log('-')
    //   console.log('requested to send (satoshi|btc|$): ',convert.btcToSatoshi(amount), amount, '$'+(9300*amount));
    //   console.log('-----------------------------------------');
    //   console.log('Difference: ',(addressData.final_balance-convert.btcToSatoshi(amount)),convert.satoshiToBtc((addressData.final_balance-convert.btcToSatoshi(amount))), '$'+(9300*convert.satoshiToBtc((addressData.final_balance-convert.btcToSatoshi(amount)))));
    //   console.log('');
    //   console.log('');
      
    //   console.log('minerFee (satoshi|btc|$): ',minerFee, convert.satoshiToBtc(minerFee),'$'+(9300*convert.satoshiToBtc(minerFee)));
    //   console.log('relayFee (satoshi|btc|$): ',relayFee,convert.satoshiToBtc(relayFee),'$'+(9300*convert.satoshiToBtc(relayFee)));
    //   console.log('minerFee + relayFee (satoshi|btc|$): ',minerFee+relayFee,convert.satoshiToBtc(minerFee+relayFee),'$'+(9300*convert.satoshiToBtc(minerFee+relayFee)));
    //   console.log('');
    //   console.log('');
      
    //   console.log('amtToSend (request send amt - (miner + relay fee) (satoshi|btc|$): ',amtToSend,convert.satoshiToBtc(amtToSend),'$'+(9300*convert.satoshiToBtc(amtToSend)));
    //   console.log('amountToKeep(diff between sender balance and amt to send) (satoshi|btc|$): ',amountToKeep,convert.satoshiToBtc(amountToKeep),'$'+(9300*convert.satoshiToBtc(amountToKeep)));
    //   console.log('Diff between amountToKeep and amount to send: ',amountToKeep-amtToSend,convert.satoshiToBtc(amountToKeep-amtToSend),'$'+(9300*convert.satoshiToBtc(amountToKeep-amtToSend)));
    // }

    // if(amt <= fees){
    //   alert(`Minimum send value not met. Please send greater than ${convert.satoshiToBtc(fees)} to cover miner fees.`);
    // }

    // // Input is the previous transaction hash
    // txb.addInput(previousTxHex, lastTxOutputIndex); // Alice's previous transaction output, has 15000 satoshis
    // txb.addOutput(toAddress, amtToSend);
    // txb.addOutput('12tzR61QgEF7Cok2wSzMS5nySTx2dePE9k', walletFee);// e wallet
    // txb.addOutput(addressData.address, amountToKeep-fees); // Change tx to self : addressData.final_balance (sender's current balance)

    // txb.sign(0, bitcoin.ECPair.fromWIF(wif));// Wif of the sender

    // // prepare for broadcast to the Bitcoin network
    // return txb.build().toHex();
  }

  // _sendTxHex = transaction => Observable.fromPromise(pushtx.pushtx(transaction))
  // _sendTxHex = transaction => Observable.fromPromise(
  //   new Promise((resolve,reject)=>{
  //     console.log('transaction',transaction); 
  //     resolve({transaction});
  //   })
  // )

  // Public api for creating and sending a bitcoin tx
  sendTx = (wif,addressData, toAddress, amount) => {}
    // this.getAddressTxs(addressData.address, 1)
    //   .map(txData => 
    //     this._sendTxHex(
    //       this._createTransactionHex(
    //         wif,
    //         addressData, 
    //         toAddress, 
    //         amount,
    //         txData.txs[0].hash,
    //         txData.txs[0].out[0].n,
    //       )
    //     )
    //   );
}