import useOpenableDynamicComponents from "./useOpenableDynamicComponents"

const { state, actions, mutations } = useOpenableDynamicComponents()


export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}