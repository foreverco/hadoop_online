import { RECORD_USERTYPES } from "./mutations-type";
import { reqUserType } from "@/api/login";
const state = {
  userTypes: []
};
const getters = {
  userTypes: state => state.userTypes
};

const mutations = {
  // 记录用户信息
  [RECORD_USERTYPES](state, userTypes) {
    state.userTypes = userTypes;
  }
};
const actions = {
  //获取用户类型列表
  getUserTypes({ commit }) {
    reqUserType().then(res => {
      console.log(res);
      commit("RECORD_USERTYPES", res.data.data);
    });
  }
};

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
};
