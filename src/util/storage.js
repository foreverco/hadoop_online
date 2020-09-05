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
// 用户信息
const adminUserName = "username";
// 供应信息
const applyMsg = "applyMsg";

// 市场价格参数
const marketMsg = "marketParams";

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

// 设置供应信息
export function setApplyForm(applyForm) {
  if (typeof applyForm !== "string") {
    applyForm = JSON.stringify(applyForm);
  }
  window.localStorage.setItem(applyMsg, applyForm);
}

// 获取供应信息
export function getApplyForm() {
  return window.localStorage.getItem(applyMsg);
}
// 移除用户信息
export function removeApplyForm() {
  // return Cookie.remove(adminUserName);
  window.localStorage.removeItem(applyMsg);
}

// 设置市场价格参数
export function setMarketParams(marketParams) {
  if (typeof marketParams !== "string") {
    marketParams = JSON.stringify(marketParams);
  }
  window.localStorage.setItem(marketMsg, marketParams);
}
// 获取市场价格参数
export function getMarketParams() {
  return window.localStorage.getItem(marketMsg);
}
// 移除市场价格参数
export function removeMarketParams() {
  // return Cookie.remove(adminUserName);
  window.localStorage.removeItem(marketMsg);
}
