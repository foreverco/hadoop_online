import { RECORD_USERINFO } from "./mutations-type";
import { setStore } from "@/util/storage";
const state = {
  login: false, // 是否登录
  userInfo: null // 用户信息
};
const getters = {};

const mutations = {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore("userInfo", info);
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
