<template>
<div>
    <div class="backButton" v-on:click="routeToHome"></div>

    <ul class="assetsList">
      <li v-for="asset in assets">
        <router-link :to="{ name: 'asset', params: { id: asset.id }}">
          <img :src="`static/assetLogos/${asset.symbol.toLowerCase()}.png`" :alt="asset.symbol" />
          <div class="assetsList__values">
            <p>{{asset.addressData.current_price_usd}}</p>
            <p>{{asset.addressData.final_balance_btc}}</p>
          </div>
        </router-link>
      </li> 
    </ul>
</div>
</template>

<script>
import WalletService from "../../service/wallet";
const walletService = new WalletService();
import { mapGetters, mapActions } from "vuex";

export default {
  name: "assets",
  data() {
    return {
      // assets: []
    };
  },
  computed: mapGetters({
    assets: "assets",
    assetById: "assetById"
  }),
  methods: Object.assign({}, mapActions(["updateAssets"]), {
    routeToHome() {
      this.$router.push("landing-page");
    }
  }),
  created: function() {
    // Get the generated pub/priv keys from the store to do a wallet lookup for the addresses
    walletService
      .getWalletAssets(this.$store.getters.keys)
      .subscribe(assets => {
        this.updateAssets(assets);

        console.log("Wallet Assets", assets);
      });
  }
};
</script>

<style lang="scss">
.assetsList {
  max-width: 80%;
  margin: 0 auto;
  padding-top: 36px;
  display: flex;
  justify-content: center;

  li {
    padding: 18px;
    width: 150px;
    background: $bg-alt;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;

    a {
      text-decoration: none;
    }

    p {
      color: $text-secondary;
      margin: 18px 0 0;
    }

    img {
      max-width: 48px;
    }

    & .assetsList__values :nth-child(2) {
      display: none;
    }

    &:hover {
      & .assetsList__values :nth-child(1) {
        display: none;
      }
      & .assetsList__values :nth-child(2) {
        display: block;
      }
    }
  }

  &__values {
    text-align: center;

    p::selection {
      background: transparent;
    }
  }
}
</style>
