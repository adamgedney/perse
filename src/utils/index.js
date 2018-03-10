
export const convert = {
  satoshiToBtc : (satoshi) => satoshi / 100000000,

  btcToSatoshi : (btc) => Math.ceil(btc * 100000000),

  toDollarDecimals(dollarVal) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(dollarVal)
  },

  toCurrentUSDFromAssetBalance(assetBalance, assetObj) {
    return convert.toDollarDecimals(assetObj.price_usd * assetBalance);
  }
}
