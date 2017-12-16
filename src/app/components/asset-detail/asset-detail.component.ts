import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
const CoinMarketCap = require('node-coinmarketcap');
const coinmarketcap = new CoinMarketCap();


@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  assetId = '';
  asset = {};

  constructor(private route: ActivatedRoute) {
    const self = this;

    this.route.params.subscribe(params => {
      self.assetId = params.assetName;

      coinmarketcap.get(self.assetId, coin => {
        self.asset = coin;
        console.log('COIN',coin)
      });
    });
  }

  ngOnInit() {
    console.log('ASSET DETAILS', this);
  }

  colorIndicateMovement(value){
    const isNegative = value.indexOf('-') > -1;

    if(isNegative){
      return `asset-detail--negative`;
    }else{
      return `asset-detail--positive`;
    }
  }

}
