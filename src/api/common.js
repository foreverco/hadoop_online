import service from "@/util/request";
import requestUrl from "./requestUrl";
console.log(requestUrl);
export function getTableData(params) {
  console.log(params);
  return service.request({
    method: "get",
    url: requestUrl[params.url],
    params: params.data
  });
}
