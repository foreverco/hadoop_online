import service from "@/util/request";
/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data) {
  console.log(data);
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/login/token",
    params: data
  });
}

// 用户信息
export function userInfo(parmas) {
  console.log(parmas);
  return service.request({
    method: "get",
    url: "/auth/login/token",
    parmas
  });
}
