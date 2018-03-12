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
  }

  getWalletAssets = (keys) => {
    return assetsService.getAssetsList()
      .withLatestFrom(bitcoinService.getAddressBalance(keys), (assetList,addressBalanceData) => {
        return assetList.map(asset => {
  
          // @todo make this dynamic once we have another asset balance stream
          if (asset.id === 'bitcoin') {
            addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
            asset['addressData'] = addressBalanceData;
          }else{
            asset['addressData'] = {};
          }

          return asset;
        });
    });
  }
  // getWalletAssets = (keys) => {
    // return assetsService
    // .getAssetsList()
    //     .switchMap(assets => { 
    //       return assets
    //         .map(asset => this.assetServices[`${asset.id}Service`].getAddressBalance(keys)); 
    //     },(assetList,addressBalanceData)=>({assetList,addressBalanceData})) // create a new object, using the inner observable and the mapped one
    //       .map(({assetList,addressBalanceData}) =>{
    //         console.log('assetList,addressBalanceData',assetList,addressBalanceData);
    //         // if (asset.id === 'bitcoin') {
    //         //   addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
    //         //   asset['addressData'] = addressBalanceData;
    //         // }else{
    //         //   asset['addressData'] = {};
    //         // }

    //         return asset;
    //       });

        // return a.map(asset => {
          // return Observable.of(asset).withLatestFrom(this.assetServices[`${asset.id}Service`].getAddressBalance(keys), (assetList,addressBalanceData) => {

          //   // @todo make this dynamic once we have another asset balance stream
          //   if (asset.id === 'bitcoin') {
          //     addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
          //     asset['addressData'] = addressBalanceData;
          //   }else{
          //     asset['addressData'] = {};
          //   }

          //   return asset;
        // })
      // });
    // });
  // }

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