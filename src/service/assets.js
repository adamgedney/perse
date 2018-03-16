import { Observable, Subject } from "rxjs";
import 'rxjs/add/observable/from';

import Rx from "rxjs";
import { interval } from 'rxjs/observable/interval';

import Promise from 'bluebird';
const coinmarketcap = require("coinmarketcap");

export default class Assets {
  constructor() {
    this.supportedAssets = ['bitcoin', 'ethereum','litecoin'];
    // this.supportedAssets = ['bitcoin', 'ethereum', 'ripple','litecoin','tron', 'bitcoin-cash', 'stellar','cardano','eos','nem','nucleus-vision'];
    // this.supportedAssets = ['bitcoin'];
  }

  getAssetsList = assetId => {
    if(assetId){
      return this.getAssetById(assetId)
    }
    
    return Observable
      .from(this.supportedAssets)
      .concatMap(asset => {// concat map operator waits for inner observable to complete, then returns the mutated data up
        return Observable.fromPromise(coinmarketcap.tickerByAsset(asset))
      })
  }
      

  getAssetById = (assetId) => Observable
    .fromPromise(
      coinmarketcap.tickerByAsset(assetId)
    )

  // Get new data every n seconds and convert to stream
  // getAssetsList = () =>  {
  //   const self = this;
  //   var subject = new Subject()

  //   return Observable
  //     .interval(3000)
  //     .subscribe(()=>{
  //       this.next(Observable.fromPromise(
  //         Promise.all(
  //           self.supportedAssets
  //             .map(asset => coinmarketcap.tickerByAsset(asset))
  //         )
  //     ));
  //     })
      

    // Observable.create(function(observer) {
    //   setInterval(function(){
    //     Promise.all(
    //       self.supportedAssets
    //         .map(asset => coinmarketcap.tickerByAsset(asset))
    //     )
    //     .then(observer.next);
    // },30000);
  // });
// }

  getSupportedAssets = () => this.supportedAssets
}