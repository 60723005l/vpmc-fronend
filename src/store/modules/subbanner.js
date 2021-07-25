

const state = () => ({
  open:false,
  current:{},
  components:{}
})

// actions
const actions = {
  activate ({ commit, state }, key ) 
  {
    try
    {
      commit('setActivate', key)
      return {...state.current}
    }
    catch( err )
    {
      throw err
    }

  }
}

// mutations
const mutations = {
  addComponent (state, component) {
    state.components[component.key] = component.value
  },
  removeComponent (state, key) {
    delete state.components[key]
  },
  setActivate (state, key) {
    if( state.components[key] === undefined ) throw new Error(`key: ${state.components[key]} is not inside components`)
    state.current = {value: state.components[key]}
  },
  open (state, bool) {
    state.open = bool
  },
  toogle (state) {
    state.open = !tate.open
  },
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}