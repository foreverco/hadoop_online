import service from "@/util/request";

/* 分页获取供应列表 */
export function reqapplyLisst(data) {
  return service.request({
    url: "/view/supply/queryRecentList",
    method: "get",
    data
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

/* 分页添加 */
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
