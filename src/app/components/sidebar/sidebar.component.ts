import { Component, OnInit } from '@angular/core';

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

  coins: any = coins;

  ngOnInit() {
  }

  onAssetClick(asset){
    console.log(asset);
  }

}
