import service from "@/util/request";
import Config from "@/util/baseApi";
/**
 * 获取用户角色
 */

/**
 * 获取图片验证码
 */
export function getImgCode() {
  return service.request({
    method: "get",
    url: "/auth/captcha",
    baseURL: Config.proxy.new
  });
}

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

// 密码登录
export function Login(data) {
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/login/view/token",
    params: data,
    baseURL: Config.proxy.new
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
