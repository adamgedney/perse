const state = {
  keys: { pk: { passphrase: "reply jest will rest adjacent born update leave red window shoe" } },
  showPKForm: true
}

const mutations = {
  UPDATE_KEYS(state, keys) {
    state.keys = keys;
  },
  UPDATE_KEY(state, key) {
    state.keys[key.id] = key;
  },
  TOGGLE_PK_FORM(state, val) {
    state.showPKForm = !state.showPKForm;
  },
  UPDATE_PASSPHRASE(state, passphrase) {
    state.keys.pk.passphrase = passphrase;
  }
}

const actions = {
  updateKeys({ commit }, keys) {
    commit('UPDATE_KEYS', keys)
  },
  updateKey({ commit }, key) {
    commit('UPDATE_KEY', key)
  },
  togglePkForm({ commit }) {
    commit('TOGGLE_PK_FORM')
  },
  updatePassphrase({ commit }, passphrase) {
    commit('UPDATE_PASSPHRASE', passphrase)
  }
}

// getters are functions
const getters = {
  keys: state => state.keys,
  showPKForm: state => state.showPKForm
}

export default {
  state,
  mutations,
  actions,
  getters
}
