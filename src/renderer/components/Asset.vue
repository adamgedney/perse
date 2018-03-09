<template>
<div>
  <router-link :to="{ name: 'assets'}"><div class="backButton"></div></router-link>
  <div class="asset">
    <div class="asset__header">
      <div class="asset__headerRow">
        <div>
          <img :src="`static/assetLogos/${asset.symbol.toLowerCase()}.png`" :alt="asset.symbol" />
          <h1>{{asset.name}}</h1>
          <p>{{asset.addressData.final_balance_btc}} btc</p>
        </div>
        <div>
          <h2>{{asset.addressData.current_price_usd}}</h2>
        </div>
      </div>
      <div class="asset__headerRow">
        <h3>Your Bitcoin public wallet address</h3>
        <h4>(Use this address to receive btc from senders)</h4>
        <p>{{asset.addressData.address}}
          <span title="Copy to clipboard" class="copyButton" v-on:click="copyToClipboard(asset.addressData.address)"></span>
        </p>
      </div>
    </div>
    <div class="asset__send">
      <form class="asset__form">
        <h3>Send {{asset.symbol}}</h3>
        <el-input type="number" placeholder="Amount to send (in btc)" v-model="sendAmount"></el-input>
        <el-input type="text" placeholder="BTC send to address" v-model="recipientAddress"></el-input>
        <el-button type="success" plain v-on:click="sendAsset">Send {{asset.name}}</el-button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import copy from "copy-to-clipboard";
import AddressService from "../../service/address";
const addressService = new AddressService();

export default {
  name: "asset",
  data: function() {
    return {
      assetId: this.$route.params.id,
      asset: this.$store.getters.assetById(this.$route.params.id),
      recipientAddress: "12tzR61QgEF7Cok2wSzMS5nySTx2dePE9k",//exodus wallet
      sendAmount: 0.0002
    };
  },
  methods: {
    copyToClipboard(text) {
      copy(text, {
        debug: true,
        message: "Press #{key} to copy"
      });

      alert("Copied!");
    },
    sendAsset() {
      if (!addressService.isValidAddress(this.recipientAddress, this.asset.symbol)) {
        alert(`${this.asset.symbol} address is invalid. Please double check your send to address.`);
      } else {
        // alert(`Send ${this.sendAmount}${this.asset.symbol.toLowerCase()} to ${this.recipientAddress}?`);

        addressService.sendTx(
          this.$store.getters.keys.pk.wif,
          this.asset.addressData.address,
          this.recipientAddress,
          this.sendAmount, 
          this.asset.id
        )
        .subscribe(res => { 
          console.log('SEND TX RES', res);
        });

      }
    }
  },
  created: function() {
    
  }
};
</script>

<style lang="scss">
.asset {
  padding: 36px;

  &__header {
    text-align: center;
    border-bottom: 1px solid $border;
    padding-bottom: 18px;

    &Row {
      &:first-of-type {
        display: flex;
        justify-content: space-between;

        > div {
          width: 50%;

          &:last-of-type {
            align-self: center;
          }
        }
      }

      &:last-of-type {
        background: $bg-secondary;
        border-radius: 6px;
        display: inline-block;
        padding: 9px 36px 18px 36px;
        width: 66%;
        margin-top: 18px;

        h3,
        h4,
        p {
          margin: 0;
          color: $text-secondary;
        }
        h3 {
          font-size: 21px;
        }
        h4 {
          font-size: 12px;
        }
        p {
          background: $bg-alt;
          padding: 9px 18px;
          border-radius: 6px;
          display: inline-block;
          margin-top: 18px;
        }
      }
    }

    h2 {
      background: $bg-alt;
      border-radius: 3px;
      display: inline-block;
      padding: 9px 18px;
      margin-bottom: 0;
    }

    p {
      color: $text-secondary;
      margin: 0;
    }

    img {
      max-width: 48px;
    }

    h1 {
      font-size: 24px;
      color: $text-secondary;
      // margin-bottom: 0;
    }
  }

  &__send {
    max-width: 66%;
    margin: 36px auto 0;

    .el-button {
      width: 100%;
    }
  }

  input {
    margin-bottom: 9px;
  }
}
</style>
