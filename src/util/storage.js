/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
const adminUserName = "username";

export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

// 设置用户信息
export function setUsermsg(usermsg) {
  // return Cookie.set(adminUserName, JSON.stringify(usermsg));
  // if (!name) return;
  if (typeof usermsg !== "string") {
    usermsg = JSON.stringify(usermsg);
  }
  window.localStorage.setItem(adminUserName, usermsg);
}
// 获取用户信息
export function getUsermsg() {
  // return Cookie.get(adminUserName);
  return window.localStorage.getItem(adminUserName);
}
// 移除用户信息
export function removeUsermsg() {
  // return Cookie.remove(adminUserName);
  window.localStorage.removeItem(adminUserName);
}
