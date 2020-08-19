import service from "@/util/request";

/* 添加/编辑收货地址 */
export function reqaddAdress(data) {
  return service.request({
    url: "/view/address/member/addAddress",
    method: "post",
    data
  });
}
