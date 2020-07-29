import service from "@/util/request";
/**
 * 获取用户角色
 */

/**
 * 获取验证码
 */
export function getCode(data) {
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://sms.dun.163.com/v2/sendsms",
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
