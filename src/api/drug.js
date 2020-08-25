import service from "@/util/request";

/* 获取药材列表 */
export function reqAllDrug(params) {
  return service.request({
    url: "/view/t-medince/selectPureList",
    method: "get",
    params
  });
}
