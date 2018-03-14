import { Observable } from "rxjs";
import { convert } from '../../utils';
import ethereum from 'ethereumjs-wallet';
// import EthereumTx from 'ethereumjs-tx';
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
   */
  _createTransactionHex(keys, addressData, toAddress, amount){
    const txCount = self.web3.eth.getTransactionCount(addressData.ethereum.address);
    console.log(keys, addressData, toAddress, amount, txCount);

    // const tx = new EthereumTx(
    //   {
    //     nonce: '0x00',
    //     gasPrice: '0x09184e72a000', 
    //     gasLimit: '0x3000',
    //     to: toAddress, 
    //     value: '0x00', 
    //     data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    //     // EIP 155 chainId - mainnet: 1, ropsten: 3
    //     chainId: 1
    //   }
    // );

    // tx.sign(privateKey);

    // const serializedTx = tx.serialize();
    // const rawTx = '0x' + serializedTx.toString('hex');

    return '';
  }

  // _sendTxHex = transaction => Observable.fromPromise(pushtx.pushtx(transaction))
  // _sendTxHex = transaction => Observable.fromPromise(
  //   new Promise((resolve,reject)=>{
  //     console.log('transaction',transaction); 
  //     resolve({transaction});
  //   })
  // )

  // Public api for creating and sending a tx
  sendTx = (keys, addressData, toAddress, amount) => 
    this._createTransactionHex(keys, addressData, toAddress, amount)
  
}