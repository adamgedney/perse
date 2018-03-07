const state = {
  assets: []
}

const mutations = {
  UPDATE_ASSETS(state, assets) {
    state.assets = assets;
  }
}

const actions = {
  updateAssets({ commit }, assets) {
    commit('UPDATE_ASSETS', assets)
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
