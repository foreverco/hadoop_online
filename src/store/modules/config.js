const state = {
  sex_json: {
    1: { sex: "男", value: 1 },
    0: { sex: "女", value: 0 }
  },
  autonymType: 0
};
const mutations = {
  updateautonymType(state, type) {
    state.autonymType = type;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
