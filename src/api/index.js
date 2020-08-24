import service from "@/util/request";

/* 获取药材品类 */
export function reqDruglist(params) {
  return service.request({
    url: "/view/medince/getMedinces",
    method: "get",
    params
  });
}
