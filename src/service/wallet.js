import { Observable } from "rxjs";
import Promise from 'bluebird';
import AssetsService from "./assets";
const assetsService = new AssetsService();
import BitcoinService from "./assets/bitcoin";
const bitcoinService = new BitcoinService();

export default class Wallet {
  constructor() {
    this.assets = [];

    // Fetch the supported assets and their data
    // assetsService.getAssetsList()
    //   .subscribe(assets => {
    //     self.assets = assets;
    //   })
  }

  getWalletAssets = (keys) => {

    // @todo: merge the assets list with a list of user balances from the blockchain.
    // start with eth.
    // bitcoinService.getAddressBalance(keys)
    //   .subscribe(balance => {
    //     console.log("BALANCE ", balance);
    //   }); 
    // assetsService.getAssetsList()
    //   .flatMap(asset => {
    //     //asset.id
    //     // return bitcoinService.getAddressBalance(keys);
    //   })
    //   .subscribe(val => {
    //     val.subscribe(v => {
    //       console.log('VAL2 ', v);
    //     })
    //   })

    bitcoinService.getAddressBalance(keys)
      .subscribe(res => {
        console.log("Balances", res, keys);
      });


    // .subscribe(assets => {
    //   self.assets = assets;
    // })

    // console.log(this.assets);
    return assetsService.getAssetsList();
    //bitcoinService.getAddressBalance(keys);
  }

  // getUserBalances = () => Observable.fromPromise(
  //   // Promise.all(
  //   //   this.supportedAssets
  //   //     .map(asset => coinmarketcap.tickerByAsset(asset)
  // )
  // ))
}