import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  passphrase = "reply jest will rest adjacent born update leave red window shoe";
  address;

  constructor(private _addressService: AddressService) { }

  ngOnInit() {
  }

  submitPassphrase(){
    console.log(this.passphrase);
    //Make the private keys
    this.address = this._addressService.makePrivateKey(this.passphrase);
    console.log(this.address)
  }

}
