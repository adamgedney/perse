<template>
<div class="sidebar">
  <ul class="sidebar__assets">
    <li v-for="coin in assetList">
        <router-link :to="{ name: 'asset', params: { id: coin.id }}">{{coin.symbol}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
import { Observable } from "rxjs";
const coinmarketcap = require("coinmarketcap");

export default {
  name: "sidebar",
  data: () => ({
    assetList: []
  }),
  methods: {
    clicked() {
      console.log("clicked");
    }
  },
  created: function() {
    const self = this;

    var result = Observable.fromPromise(
      coinmarketcap.ticker({
        limit: 15
      })
    );

    result.subscribe(assets => {
      self.assetList = assets.sort((a, b) => a.rank - b.rank);
    });
  }
};
</script>

<style lang="scss">
.sidebar {
  width: $sidebar-width;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: $bg-secondary;
  overflow: scroll;
  // padding-right: 17px;

  &__assets {
    padding: 6px;
    box-sizing: border-box;
    li {
      list-style-type: none;
      text-align: center;
      border-bottom: 1px solid $bg;
      padding: 6px;

      &:hover {
        opacity: 0.4;
      }

      a {
        color: lighten(#363636, 50%);
        font-size: 14px;
        text-decoration: none;
      }
    }

    img {
      max-width: 45px;
    }
  }
}
</style>
