<template>
<div class="landing">
  <div class="backButton" v-if="!showPKForm" v-on:click="togglePkForm"></div>
  
  <form class="pk__generate" v-if="showPKForm">
    <h3>Generate private keys from passphrase</h3>
    <el-input type="text" placeholder="passphrase" :value="keys.pk.passphrase" @input="updatePassphraseInStore"></el-input>
    <el-button type="success" plain v-on:click="generateKeys">Generate Private Keys</el-button>
  </form>

  <div class="pk__show" v-if="!showPKForm">
    <div class="pk__wrapper">
      <h1>Write these down!</h1>
      <h3>These are your important. If you lose these your money will be lost forever.</h3>
      <p>This is your passphrase:</p>
      <p>
        <span>{{ keys.pk.passphrase }}</span>
        <span title="Copy to clipboard" class="copyButton" v-on:click="copyToClipboard(keys.pk.passphrase)"></span>
        </p>
      <hr>

      <p>This is your private key:</p>
      <p>
        <span>{{ keys.pk.hex }}</span>
        <span title="Copy to clipboard" class="copyButton" v-on:click="copyToClipboard(keys.pk.hex)"></span>
      </p>
    </div>
    <div class="pk__wrapper">
    <el-checkbox v-model="copyCheck">Yes, I safely copied &amp; stored my 12 word Mneumonic and my private keys</el-checkbox>
    <router-link :to="{ name: 'assets'}">
      <el-button type="success" plain v-if="copyCheck" v-on:click="this.togglePkForm">
        Take me to my wallets
      </el-button>
     </router-link>

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import copy from "copy-to-clipboard";
import AddressService from "../../service/address";
const addressService = new AddressService();

export default {
  name: "landing-page",
  data() {
    return {
      copyCheck: false
    };
  },
  computed: mapGetters({
    keys: "keys",
    showPKForm: "showPKForm"
  }),
  methods: Object.assign(
    {},
    mapActions(["updateKeys", "togglePkForm", "updatePassphrase"]),
    {
      copyToClipboard(text) {
        copy(text, {
          debug: true,
          message: "Press #{key} to copy"
        });
        alert("Copied!");
      },
      generateKeys() {
        let genKeys = {
          pk: addressService.makePrivateKeyFromPhrase(this.keys.pk.passphrase),
          
        };

        addressService.makePublicAddresses()
        .subscribe(assets =>{
          genKeys = Object.assign({},{pk:genKeys.pk}, {...assets});
          this.updateKeys(genKeys);

          console.log("BTC Public Address: ", genKeys.bitcoin);
          console.log("Private Key:  ", genKeys.pk);
    
          // Hide the passphrase form and show the results
          this.togglePkForm();
        });        
      },
      updatePassphraseInStore(e) {
        this.updatePassphrase(e.target.value);
      }
    }
  ),
  created: function() {

  }
};
</script>

<style lang="scss" scoped>
.landing {
  // padding-left: $sidebar-width;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center; 

  button {
    width: 100%;
    margin-top: 9px;
  }

  h3, h2, h1 {
    text-align: center;
  }
}

.pk {
  &__generate {
    // max-width: 90%;
    width: 66%;
    margin: 0 auto; 

    input {
      display: block;
      border-radius: 0;
      margin-bottom: 9px;
      width: 100%;
      height: 33px;
    }
  }

  &__wrapper {
    background: rgba($bg-alt, 0.8);
    padding: 18px;
    border-radius: 6px;
    margin: 18px 0;

    &:last-of-type {
      height: 119px;
    }
  }

  &__show {
    max-width: 80%;
    margin: 0 auto;

    p {
      color: lighten(#363636, 50%);
      line-height: 1.5;
      margin: 0;

      span {
        color: white;
      }
    }
  }
}
</style>
