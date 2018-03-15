import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import { mergeMap } from 'rxjs/operators';


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

  getWalletAssets = (keys, assetId) => {
    return assetsService.getAssetsList(assetId)
      .flatMap(asset => {
        asset['addressData'] = {};

        if(!this.assetServices[`${asset.id}Service`]){ 
          return Observable.of(asset);
        }

        return this.assetServices[`${asset.id}Service`].getAddressBalance(keys)
          .map(addressBalanceData => {
            
            if(addressBalanceData){
              addressBalanceData['current_price_usd'] = convert.toCurrentUSDFromAssetBalance(addressBalanceData.balance, asset);
              asset['addressData'] = addressBalanceData;
            }

            return asset;
          })
      })
  }
  
  getWalletAssetById = (keys, assetId) => 
    this.getWalletAssets(keys,assetId);

  

  // getUserBalances = () => Observable.fromPromise(
  //   // Promise.all(
  //   //   this.supportedAssets
  //   //     .map(asset => coinmarketcap.tickerByAsset(asset)
  // )
  // ))
}