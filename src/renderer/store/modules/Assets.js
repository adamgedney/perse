import _ from 'underscore';
const state = {
  assets: []
}

const mutations = {
  UPDATE_ASSETS(state, asset) {
    state.assets = asset;
  },
  UPDATE_ASSET(state, asset) {
    if(!!_.findWhere(state.assets,{id:asset.id})){
      state.assets = state.assets
        .map(a => a.id === asset.id ? asset : a);
    }else{
      state.assets.push(asset);
    }

    state.assets.sort((a, b) => a.rank - b.rank);
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
