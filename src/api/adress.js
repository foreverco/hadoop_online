import service from "@/util/request";

/* 添加/编辑收货地址 */
export function reqaddAdress(data) {
  return service.request({
    url: "/view/address/member/addAddress",
    method: "post",
    data
  });
}

/* 删除收货地址 */
export function reqdelAdress(data) {
  return service.request({
    url: "/view/address/member/delAddress",
    method: "DELETE",
    data
  });
}

/* 设置默认地址 */
export function reqdefaultAdress(params) {
  return service.request({
    url: "/view/address/member/setDefaultAddress",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    params
  });
}
