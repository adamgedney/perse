<template>
<div class="landing">
  <div class="backButton" v-on:click="togglePkForm"></div>
  <form class="pk__generate" v-if="showPKForm">
    <h2>Generate private keys from passphrase</h2>
    <input type="text" placeholder="passphrase" :value="keys.pk.passphrase" @input="updatePassphraseInStore"/>
    <input class="button" type="submit" value="Generate Private Keys" v-on:click="generateKeys"/>
  </form>

  <div class="pk__show" v-if="!showPKForm">
    <div class="pk__keyWrapper">
      <h2>This is your private key and your passphrase. If you lose these your money will be lost forever. Write these down!</h2>
      <p>This is your passphrase:</p>
      <p><span>{{ keys.pk.passphrase }}</span></p>
      <hr>

      <p>This is your private key:</p>
      <p><span>{{ keys.pk.privateKeyHex }}</span></p>
    </div>
    <div class="pk__keyWrapper">
    <p>This is your Bitcoin public adress. Use it to send Bitcoin to your wallet</p>
    <p><span>{{ keys.btc }}</span></p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddressService from "../../service/address";
const addressService = new AddressService();

export default {
  name: "landing-page",
  computed: mapGetters({
    keys: "keys",
    showPKForm: "showPKForm"
  }),
  methods: Object.assign(
    {},
    mapActions(["updateKeys", "togglePkForm", "updatePassphrase"]),
    {
      // methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      generateKeys() {
        console.log("KEYS", this.keys.pk.passphrase);
        const genKeys = {
          pk: addressService.makePrivateKeyFromPhrase(this.keys.pk.passphrase),
          btc: addressService.makePublicAddress()
        };

        this.updateKeys(genKeys);
        // this.$store.dispatch("UPDATE_KEYS", keys);

        console.log("BTC Public Address: ", genKeys.btc);
        console.log("Private Key:  ", genKeys.pk);
        console.log("Store:  ", this.keys.btc);

        // Hide the passphrase form and show the results
        this.togglePkForm();
      },
      updatePassphraseInStore(e) {
        console.log("PHRASE", e);
        this.updatePassphrase(e.target.value);
      }
    }
  ),
  created: function() {}
};
</script>

<style lang="scss" scoped>
.landing {
  // padding-left: $sidebar-width;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pk {
  &__generate {
    max-width: 80%;
    margin: 0 auto;

    input {
      display: block;
      border-radius: 0;
      margin-bottom: 9px;
      width: 100%;
      height: 33px;
    }
  }

  &__keyWrapper {
    background: lighten(#2b2b2b, 5%);
    padding: 18px;
    border-radius: 6px;
    margin: 18px 0;
  }

  &__show {
    max-width: 80%;
    margin: 0 auto;

    p {
      color: lighten(#363636, 50%);
      line-height: 2;

      span {
        color: white;
      }
    }
  }
}
</style>
