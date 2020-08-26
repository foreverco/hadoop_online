import service from "@/util/request";

/* 获取药材列表 */
export function reqAllDrug(params) {
  return service.request({
    url: "/view/t-medince/selectPureList",
    method: "get",
    params
  });
}

/* 获取药材详情 */
export function reqDrugMsg(params) {
  return service.request({
    url: "/view/t-medince/selectPureById",
    method: "get",
    params
  });
}
