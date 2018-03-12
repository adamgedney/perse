import { Observable } from "rxjs";
import 'rxjs/add/observable/of';

import Promise from 'bluebird';
import { convert } from '../utils';
import _ from 'underscore';

import AssetsService from "./assets";
const assetsService = new AssetsService();

// import BitcoinService from "./assets/bitcoin";
// import EthereumService from "./assets/ethereum";

import assetServices from './assetServices';

export default class Wallet {
  constructor() {
    this.assets = [];
    this.assetServices = _.mapObject(assetServices, (CurrentService,key) => new CurrentService());
    // this.bitcoinService = new BitcoinService();
    // this.ethereumService = new EthereumService();

    // Fetch the supported assets and their data
    // assetsService.getAssetsList()
    //   .subscribe(assets => {
    //     self.assets = assets;
    //   })
  }

  // getWalletAssets = (keys) => {
  //   return assetsService.getAssetsList()
  //     .withLatestFrom(bitcoinService.getAddressBalance(keys), (assetList,addressBalanceData) => {
  //       return assetList.map(asset => {
  
  //         // @todo make this dynamic once we have another asset balance stream
  //         if (asset.id === 'bitcoin') {
  //           addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
  //           asset['addressData'] = addressBalanceData;
  //         }else{
  //           asset['addressData'] = {};
  //         }

  //         return asset;
  //       });
  //   });
  // }
  getWalletAssets = (keys) => {
    return assetsService.getAssetsList()
      .map(a => { return a.map(asset => {
        console.log(asset,this.assetServices[`${asset.id}Service`]);

        return Observable.of(asset).withLatestFrom(this.assetServices[`${asset.id}Service`].getAddressBalance(keys), (assetList,addressBalanceData) => {

          // @todo make this dynamic once we have another asset balance stream
          if (asset.id === 'bitcoin') {
            addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
            asset['addressData'] = addressBalanceData;
          }else{
            asset['addressData'] = {};
          }

          return asset;
        
      })
      });
    });
  }

  getWalletAssetById = (keys, assetId) => {
    return assetsService.getAssetById(assetId)
      .withLatestFrom(this.assetServices[`${assetId}Service`].getAddressBalance(keys), (asset,addressBalanceData) => {
  
          // @todo make this dynamic once we have another asset balance stream
          if (asset.id === 'bitcoin') {
            addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
            asset['addressData'] = addressBalanceData;
          }else{
            asset['addressData'] = {};
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