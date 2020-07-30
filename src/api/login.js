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

// 登录
export function Login(data) {
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/login/token",
    params: data
  });
}

/* 获取用户详细信息 */
export function reqallInfo() {
  return service.request({
    method: "get",
    url: "/auth/user/allInfo"
  });
}

/* 登出 */
export function LogOut(data) {
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/logout/token",
    params: data
  });
}
