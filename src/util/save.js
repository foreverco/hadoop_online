import Cookie from "js-cookie";

const adminToken = "toKen";
const adminUserName = "username";

// 设置token
export function setToken(token) {
  return Cookie.set(adminToken, token);
}
// 获取token
export function getToken() {
  return Cookie.get(adminToken);
}
// 移除token
export function removeToken() {
  return Cookie.remove(adminToken);
}
// 设置用户信息
export function setUsermsg(usermsg) {
  return Cookie.set(adminUserName, JSON.stringify(usermsg));
}
// 获取用户信息
export function getUsermsg() {
  return Cookie.get(adminUserName);
}
// 移除用户信息
export function removeUsermsg() {
  return Cookie.remove(adminUserName);
}
