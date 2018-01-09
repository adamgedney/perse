import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AddressService } from '../../services/address.service';

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

  constructor(
    private route: ActivatedRoute, 
    private _address: AddressService) {
    const self = this;

    this.route.params.subscribe(params => {
      self.assetId = params.assetName;

      coinmarketcap.tickerByAsset(self.assetId)
        .then(coin => {
          self.asset = coin;
          console.log('COIN', coin)
        });
    });
    //@todo add form field for pasting in password on home screen
    const password = "reply jest will rest adjacent born update leave red window shoe";

    this._address.makeBTCAddress(password).subscribe(res => {
      console.log('BTC ADDRESS', res);
      return this.address = res;
    });
  }

  ngOnInit() {
    console.log('ASSET DETAILS', this);
  }

  colorIndicateMovement(value) {
    const isNegative = value.indexOf('-') > -1;

    if (isNegative) {
      return `asset-detail--negative`;
    } else {
      return `asset-detail--positive`;
    }
  }

}
