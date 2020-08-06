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
    url: "/auth/login/sms",
    baseURL: Config.proxy.new,
    params: data
  });
}
// 注册
export function Register(data) {
  return service.request({
    method: "post",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    url: "/auth/login/view/register",
    baseURL: Config.proxy.new,
    data: data
  });
}

// 登录
export function Login(data) {
  return service.request({
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "/auth/login/view/token",
    baseURL: Config.proxy.new,
    params: data
  });
}

/* 获取用户类型 */
export function reqUserType() {
  return service.request({
    method: "get",
    url: "/auth/role/common/getRoles",
    baseURL: Config.proxy.new
  });
}

/* 获取用户详细信息 */
export function reqallInfo() {
  return service.request({
    method: "get",
    url: "/auth/user/allInfo",
    baseURL: Config.proxy.new
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
    params: data,
    baseURL: Config.proxy.new
  });
}
