<template>
<div>
  <router-link :to="{ name: 'landing-page'}">
    <div class="backButton"></div>
  </router-link>

    <ul class="assetsList">
      <li v-for="asset in assets" :title="asset.name">
        <router-link :to="{ name: 'asset', params: { id: asset.id }}">
          <img :src="`static/assetLogos/${asset.symbol.toLowerCase()}.png`" :alt="asset.symbol" />
          <div class="assetsList__values">
            <p>{{asset.addressData.current_price_usd || '$0'}}</p>
            <p>{{asset.addressData.balance || '0.00'}}</p>
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
  methods: Object.assign({}, mapActions(["updateAssets","updateAsset"]), {
  }),
  created: function() {
    // Get the generated pub/priv keys from the store to do a wallet lookup for the addresses
    walletService
      .getWalletAssets(this.$store.getters.keys)
      .subscribe(asset => {
        console.log('Assets.js', asset, this.$store.getters.keys)
        this.updateAsset(asset);
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
  flex-wrap: wrap;

  li {
    padding: 18px;
    width: 150px;
    background: rgba($bg,0.4);
    border-radius: 3px;
    text-align: center;
    cursor: pointer;

    a {
      text-decoration: none;
    }

    p {
      color: $text-tertiary;
      margin: 18px 0 0;
    }

    img {
      max-width: 48px;
    }

    & .assetsList__values :nth-child(2) {
      display: none;
    }

    &:hover {
      opacity: 0.7;

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
