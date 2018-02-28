<template>
<div>
  <sidebar></sidebar>
  <div class="asset">
    {{assetId}}
  </div>
</div>
</template>

<script>
import Sidebar from "./Sidebar";

export default {
  name: "asset",
  components: [Sidebar],
  data: function() {
    return {
      assetId: this.$route.params.id
    };
  },
  methods: {},
  created: function() {
    console.log("ROUTE:", this.$route.params.id);
  }
};
</script>

<style lang="scss">
.asset {
  padding-left: $sidebar-width;
}
</style>
