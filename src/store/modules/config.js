import { RECORD_DRUGLIST } from "./mutations-type";
import { reqDruglist } from "@/api/index";
const state = {
  // 性别
  sex_json: {
    1: { label: "男", value: 1 },
    0: { label: "女", value: 0 }
  },
  // 重量单位
  weight_json: {
    0: { label: "/公斤", value: 0 },
    1: { label: "/斤", value: 1 }
  },
  // 认证类型
  autonymType: 0,
  // 药材库
  drugList: [],
  status: 0,
  notesStatus: 0
};
const getters = {
  drugList: state => state.drugList
};
const mutations = {
  // 认证类型
  updateautonymType(state, type) {
    state.autonymType = type;
  },
  // 我的供应类型
  updateApplyType(state, type) {
    state.status = type;
  },
  // 个人纪录类型
  updatenotesStatus(state, type) {
    state.notesStatus = type;
  },
  RECORD_DRUGLIST(state, drug) {
    state.drugList = drug;
  }
};
const actions = {
  async getDruglist({ commit }) {
    const res = await reqDruglist();
    let druglist = JSON.parse(JSON.stringify(res.data.data));
    druglist.forEach(item => {
      item.value = item.id;
      item.label = item.medinceName;
      console.log(druglist);
    });
    commit(RECORD_DRUGLIST, druglist);
  }
};
export default {
  // namespaced: true,
  state,
  mutations,
  getters,
  actions
};
