import service from "@/util/request";

/**
 * 供应相关
 *  */
/* 查看求购审核未通过原因 */
export function reqsupllyfailmsg(params) {
  return service.request({
    url: "/view/buying/member/viewAudit",
    method: "get",
    params
  });
}
/* 分页获取供应列表 */
export function reqapplyLisst(params) {
  return service.request({
    url: "/view/supply/queryRecentList",
    method: "get",
    params
  });
}
/* 根据id获取供应详情 */
export function reqapplymsg(params) {
  return service.request({
    url: "/view/supply/getDetail",
    method: "get",
    params
  });
}

/* 添加/取消收藏 */
export function reqfavotite(data) {
  return service.request({
    url: "/view/favorites/member/addFavorites",
    method: "post",
    data
  });
}

/* 分页收藏信息 */
export function reqfavotiteList(data) {
  return service.request({
    url: "/view/favorites/member/queryList",
    method: "get",
    data
  });
}

/* 添加浏览 */
export function reqaddBrowse(data) {
  return service.request({
    url: "/view/browse/member/addBrowse",
    method: "post",
    data
  });
}

/* 分页浏览信息 */
export function reqbrowseList(data) {
  return service.request({
    url: "/view/browse/member/queryList",
    method: "get",
    data
  });
}

/**
 * 求购相关
 *  */
/* 分页获取求购列表 */
export function reqbuyList(params) {
  return service.request({
    url: "/view/buying/queryRecentList",
    method: "get",
    params
  });
}
