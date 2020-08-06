const state = {
  sex_json: {
    0: { sex: "男", value: 0 },
    1: { sex: "女", value: 1 }
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
