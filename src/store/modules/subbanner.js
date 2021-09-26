

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
    let { key, value, payload } = component
    state.components[component.key] = { key, value, payload }
  },
  removeComponent (state, key) {
    delete state.components[key]
  },
  setActivate (state, key) {
    if( state.components[key] === undefined ) throw new Error(`key: ${state.components[key]} is not inside components`)
    state.current = state.components[key]
  },
  open (state, bool) {
    state.open = bool
  },
  toogle (state) {
    state.open = !tate.open
  },
  /**
   * 
   * @param {*} state 
   * @param {{key: string, payload: {}}} payload 
   */
  setPayload (state, options ) {
    let { key, payload } = options
    if( state.components[key] === undefined ) throw new Error(`key: ${state.components[key]} is not inside components`)
    let components = state.components[key]
    components.payload = {...payload}

  }
}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}