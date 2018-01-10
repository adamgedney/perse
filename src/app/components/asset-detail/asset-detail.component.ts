import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AddressService } from '../../services/address.service';
import { BitcoinService } from '../../services/bitcoin.service';

const coinmarketcap = require('coinmarketcap');


@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
})
export class AssetDetailComponent implements OnInit {
  assetId = '';
  asset = {};
  address = {};
  private _btcService;

  constructor(
    private route: ActivatedRoute, 
    private _bitcoinService: BitcoinService, 
    private _address: AddressService) {
    const self = this;
    this._btcService = _bitcoinService;

    this.route.params.subscribe(params => {
      self.assetId = params.assetName;

      coinmarketcap.tickerByAsset(self.assetId)
        .then(coin => {
          self.asset = coin;
          // console.log('COIN', coin)
        });
    });
    //@todo add form field for pasting in password on home screen
    // const password = "reply jest will rest adjacent born update leave red window shoe";

    this._address.makeBTCAddress().subscribe(res => {
      // console.log('BTC ADDRESS', res);
      return this.address = res;
    });
  }

  ngOnInit() {
    // console.log('ASSET DETAILS', this);
  }

  colorIndicateMovement(value="") {
    const isNegative = value.indexOf('-') > -1;

    if (isNegative) {
      return `asset-detail--negative`;
    } else {
      return `asset-detail--positive`;
    }
  }

  transact(asset){
    console.log('TRANSACT CLICKED', asset.toLowerCase());
  }

}
