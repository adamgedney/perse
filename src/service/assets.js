import { Observable } from "rxjs";
import Promise from 'bluebird';
const coinmarketcap = require("coinmarketcap");

export default class Assets {
  constructor() {
    this.supportedAssets = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'tron'];
  }

  getAssetsList = () => Observable.fromPromise(
    Promise.all(
      this.supportedAssets
        .map(asset => coinmarketcap.tickerByAsset(asset)
        )
    ))
}