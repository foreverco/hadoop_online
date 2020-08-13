import { RECORD_USERINFO, RECORD_TOKEN } from "./mutations-type";
import { Login, reqallInfo, LogOut } from "@/api/login";
// import { setStore } from "@/util/storage";
import { setToken, removeToken } from "@/util/save";
// import { setToken, setUsermsg, removeToken, removeUsermsg } from "@/util/save";
import { setUsermsg, removeUsermsg } from "@/util/storage";
const state = {
  userInfo: null, // 用户信息
  isLogin: false,
  token: "",
  myChart: []
};
const getters = {
  token: state => state.token,
  myChart: state => state.myChart,
  userInfo: state => state.userInfo
};

const mutations = {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    setUsermsg(info);
  },
  // 记录token
  [RECORD_TOKEN](state, info) {
    state.token = info;
    setToken(info);
  }
};
const actions = {
  // 登录
  login({ commit }, loginParams) {
    return new Promise((resolve, reject) => {
      Login(loginParams)
        .then(res => {
          let token = `${res.data.data.token_type
            .charAt(0)
            .toUpperCase()}${res.data.data.token_type.slice(1)} ${
            res.data.data.access_token
          }`;
          commit("RECORD_TOKEN", token);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      reqallInfo()
        .then(res => {
          console.log(res);
          commit("RECORD_USERINFO", res.data.data);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //清空用户信息
  clearUserInfo({ commit }, logOutParams) {
    return new Promise((resolve, reject) => {
      LogOut(logOutParams)
        .then(res => {
          commit("RECORD_TOKEN", "");
          commit("RECORD_USERINFO", null);
          removeToken();
          removeUsermsg();
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
