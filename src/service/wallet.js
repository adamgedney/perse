import { Observable } from "rxjs";
import Promise from 'bluebird';
import { convert } from '../utils';

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
    return bitcoinService.getAddressBalance(keys)
      .withLatestFrom(assetsService.getAssetsList(), (addressBalanceData, assetList) => {
        return assetList.map(asset => {

          // @todo make this dynamic once we have another asset balance stream
          if (asset.id === 'bitcoin') {
            addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.final_balance_btc, asset);
            asset['addressData'] = addressBalanceData;
          }

          return asset;
        });
      });
  }

  getWalletAssetById = (keys, assetId) => {
    return bitcoinService.getAddressBalance(keys)
      .withLatestFrom(assetsService.getAssetById(assetId), (addressBalanceData, asset) => {
  
          // @todo make this dynamic once we have another asset balance stream
          if (asset.id === 'bitcoin') {
            addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.final_balance_btc, asset);
            asset['addressData'] = addressBalanceData;
          }

          return asset;
      });
  }

  

  // getUserBalances = () => Observable.fromPromise(
  //   // Promise.all(
  //   //   this.supportedAssets
  //   //     .map(asset => coinmarketcap.tickerByAsset(asset)
  // )
  // ))
}