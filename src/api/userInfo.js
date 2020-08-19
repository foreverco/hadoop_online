import service from "@/util/request";
/**
 * 获取用户角色
 */

/**
 * 登录
 */
// export function Login(data) {
//   console.log(data);
//   return service.request({
//     method: "post",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     url: "/auth/login/token",
//     params: data
//   });
// }

// // 用户信息
// export function userInfo(parmas) {
//   console.log(parmas);
//   return service.request({
//     method: "get",
//     url: "/auth/login/token",
//     parmas
//   });
// }

// 修改个人信息
export function edituserInfo(data) {
  return service.request({
    method: "put",
    url: "/auth/member/member/changeInfo",
    data
  });
}

// 查看是否认证
export function checkauthentic(params) {
  return service.request({
    method: "get",
    url: "/auth/member/member/getAutonymInfo",
    params
  });
}

// 认证信息提交
export function editauthentic(data) {
  return service.request({
    method: "POST",
    url: "/auth/member/member/authentic",
    data
  });
}
/* 获取供应类型 */
export function reqgetsupplyType() {
  return service.request({
    method: "get",
    url: "/view/supply/member/getSupplySummaryInfos"
  });
}

/* 添加我的供应信息 */
export function reqAddsupply(data) {
  return service.request({
    method: "POST",
    url: "/view/supply/member/pulishSupply",
    data
  });
}

/* 供应下拉列表 */
export function reqsupplyTypeList(params) {
  return service.request({
    method: "get",
    url: "/view/medince/getDictionaryItems",
    params
  });
}

/* 删除我的供应 */
export function reqdelsupply(data) {
  return service.request({
    method: "post",
    url: "/view/supply/member/delSupply",
    data
  });
}

/* 下架我的供应 */

export function requndersupply(data) {
  return service.request({
    method: "post",
    url: "/view/supply/member/batchOff",
    data
  });
}
