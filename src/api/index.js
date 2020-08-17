import service from "@/util/request";

/* 添加/编辑收货地址 */
export function reqDruglist(data) {
  return service.request({
    url: "/view/medince/getSupplySummaryInfos",
    method: "get",
    data
  });
}
