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
        <h3>Send BTC</h3>
        <el-input type="number" placeholder="Amount to send (in btc)" v-model="sendAmount"></el-input>
        <el-input type="text" placeholder="BTC send to address" v-model="recipientAddress"></el-input>
        <el-button type="success" plain v-on:click="sendBitcoin">Send Bitcoin</el-button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import copy from "copy-to-clipboard";

export default {
  name: "asset",
  data: function() {
    return {
      assetId: this.$route.params.id,
      asset: this.$store.getters.assetById(this.$route.params.id),
      recipientAddress: "",
      sendAmount: 0
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
    sendBitcoin() {
      alert(`Send ${this.sendAmount} to ${this.recipientAddress}`);
    }
  },
  created: function() {
    console.log(
      "ROUTE:",
      this.$route.params.id,
      this.$store.getters.assetById(this.assetId),
      this.asset
    );
  }
};
</script>

<style lang="scss">
.asset {
  padding: 36px;

  &__header {
    text-align: center;
    border-bottom: 1px solid $border;
    padding-bottom: 36px;

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
        margin-top: 36px;

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
}
</style>
