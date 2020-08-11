import service from "@/util/request";
/* 获取省市区 */
export function reqAdress(params) {
  return service.request({
    method: "get",
    url: "/manager/areaMenu/common/list",
    params
  });
}
