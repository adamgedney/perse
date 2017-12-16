import { Component, OnInit } from '@angular/core';
const CoinMarketCap = require('node-coinmarketcap');
var options = {
  events: true, // Enable event system
  refresh: 3, // Refresh time in seconds (Default: 60)
  convert: "USD" // Convert price to different currencies. (Default USD)
}
const coinmarketcap = new CoinMarketCap(options);

// coinmarketcap.get("bitcoin", coin => {
//   console.log(coin.price_usd); // Prints the price in USD of BTC at the moment.
// });

// coinmarketcap.on("BTC", (coin) => {
//   console.log(coin, Math.random());
// });

const coins = [
  {
    name: 'bitcoin',
    logo: './assets/bitcoin.svg'
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  assetList: any = [];

  ngOnInit() {
    const self = this;

    coinmarketcap.multi(coins => {
      self.assetList = coins
      .getTop(10)
      .sort((a,b) =>  a.rank - b.rank);
    });
  }

  onAssetClick(asset) {
    console.log(asset);
  }

}