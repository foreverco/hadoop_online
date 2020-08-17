import service from "@/util/request";

/* 获取市场资讯列表 */
export function reqpolicyNews(params) {
  return service.request({
    method: "get",
    url: "/view/policyNews/newsList",
    params
  });
}

/* 获取热文榜单列表 */
export function reqhotList() {
  return service.request({
    method: "get",
    url: "/view/policyNews/policyHitsNum"
  });
}

/* 获取新闻详情 */
export function reqpolicyNewsMsg(params) {
  return service.request({
    method: "get",
    url: "/view/policyNews/policyListbyId",
    params
  });
}
