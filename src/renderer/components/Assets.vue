<template>
<div>
    <div class="backButton" v-on:click="routeToHome"></div>

    <ul class="assetsList">
      <li v-for="asset in assets">
        <img :src="`static/assetLogos/${asset.symbol.toLowerCase()}.png`" :alt="asset.symbol" />
      </li> 
    </ul>
</div>
</template>

<script>
import WalletService from "../../service/wallet";
const walletService = new WalletService();

export default {
  name: "assets",
  data() {
    return {
      assets: []
    };
  },
  methods: {
    routeToHome() {
      this.$router.push("landing-page");
    }
  },
  created: function() {
    const self = this;

    walletService.getWalletAssets().subscribe(assets => {
      self.assets = assets;
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
    img {
      max-width: 48px;
    }
  }
}
</style>
