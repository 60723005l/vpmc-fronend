

const state = () => ({
  activate: false,
})

// actions


// mutations
const mutations = {
  toggle (state) {
    state.activate = !state.activate
  },
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations
}