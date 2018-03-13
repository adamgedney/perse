const state = {
  assets: []
}

const mutations = {
  UPDATE_ASSETS(state, asset) {
    state.assets = asset;
  },
  UPDATE_ASSET(state, asset) {
    const assets = state.asset || [];

    state.assets = assets.length === 0 ? [asset] : assets.map(a => a.id === asset.id ? asset : a);
  }
}

const actions = {
  updateAssets({ commit }, assets) {
    commit('UPDATE_ASSETS', assets)
  },
  updateAsset({ commit }, asset) {
    commit('UPDATE_ASSET', asset)
  }
}

// getters are functions
const getters = {
  assets: state => state.assets,
  assetById: state => assetId => state.assets.filter(asset => asset.id === assetId)[0]
}

export default {
  state,
  mutations,
  actions,
  getters
}
