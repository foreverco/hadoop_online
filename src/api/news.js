import service from "@/util/request";

/* 获取省市区 */
export function reqpolicyNews(params) {
  return service.request({
    method: "get",
    url: "/view/policyNews/newsList",
    params
  });
}
