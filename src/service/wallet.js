import { Observable } from "rxjs";
import Promise from 'bluebird';
import AssetsService from "./assets";
const assetsService = new AssetsService();

export default class Wallet {
  constructor() {
    this.assets = [];

    // Fetch the supported assets and their data
    assetsService.getAssetsList()
      .subscribe(assets => {
        self.assets = assets;
      })
  }

  getWalletAssets = () => {

    // @todo: merge the assets list with a list of user balances from the blockchain.
    // start with eth.

    return assetsService.getAssetsList()
    // .subscribe(assets => {
    //   self.assets = assets;
    // })

    // return Observable.of(this.assets);
  }

  // getUserBalances = () => Observable.fromPromise(
  //   // Promise.all(
  //   //   this.supportedAssets
  //   //     .map(asset => coinmarketcap.tickerByAsset(asset)
  // )
  // ))
}