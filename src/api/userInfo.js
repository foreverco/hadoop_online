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
