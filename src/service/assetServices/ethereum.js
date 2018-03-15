import { Observable } from "rxjs";
import { convert } from '../../utils';
import ethereum from 'ethereumjs-wallet';
import EthereumTx from 'ethereumjs-tx';
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

        // self.getAddressTxs()
        // .subscribe(t => {
        //   console.log('ETH getAddressTxs', t);
        // })

        return { 
          address: keys.ethereum.address,
          balance: self.web3.fromWei(balance, "ether" )
        };
      })()
    );
  }

  getAddressTxs = (address, limit) => {
    const self = this;
  
    // return Observable
    //   .interval(1)
    //   .map(i => self.web3.eth.getBlock(self.web3.eth.blockNumber - i))
  }

  /**
   * https://medium.com/blockchain-musings/how-to-create-raw-transactions-in-ethereum-part-1-1df91abdba7c
   * https://github.com/ethereumjs/ethereumjs-tx
   * https://tokenmarket.net/blog/creating-offline-ethereum-transactions-in-javascript/
   * https://ethereum.stackexchange.com/questions/25839/how-to-make-transactions-using-private-key-in-web3
   * https://medium.com/blockchain-education-network/use-ethereumjs-tx-and-web3-to-send-an-ether-transaction-using-your-terminal-45db2f76daaa
   * https://github.com/trufflesuite/ganache-cli/issues/344
   */
  _createTransactionHex(keys, addressData, toAddress, amount){
    const _gasPrice = this.web3.eth.gasPrice;// ~.05 cents
    const tx = new EthereumTx(
      {
        nonce: this.web3.eth.getTransactionCount(keys.ethereum.address),
        gasPrice: this.web3.toHex(_gasPrice), 
        gasLimit: this.web3.toHex(3000000),
        to: toAddress, 
        value: this.web3.toHex(this.web3.toWei(amount, "ether")), 
        chainId: 1
      }
    );

    tx.sign(new Buffer(keys.pk.hex,'hex'));
    const serializedTx = tx.serialize();

    return '0x' + serializedTx.toString('hex');
  }

  _sendTxHex = transaction => Observable.fromPromise(
    new Promise((resolve,reject)=>{
      resolve(this.web3.eth.sendRawTransaction(transaction));
    })
  )

  // Public api for creating and sending a tx
  sendTx = (keys, addressData, toAddress, amount) => 
    this._sendTxHex(
      this._createTransactionHex(keys, addressData, toAddress, amount)
    )
}