import { RECORD_DRUGLIST } from "./mutations-type";
import { reqDruglist } from "@/api/index";
const state = {
  // 性别
  sex_json: {
    1: { label: "男", value: 1 },
    0: { label: "女", value: 0 }
  },
  // 认证类型
  autonymType: 0,
  // 药材库
  drugList: []
};
const mutations = {
  updateautonymType(state, type) {
    state.autonymType = type;
  },
  RECORD_DRUGLIST(state, drug) {
    state.drugList = drug;
  }
};
const actions = {
  getDruglist({ commit }) {
    reqDruglist().then(res => {
      console.log(res);
      commit("RECORD_DRUGLIST", res.data.data);
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
