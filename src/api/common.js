import service from "@/util/request";
import Config from "@/util/baseApi";
export function getCity(data = {}) {
  console.log(data);
  return service.request({
    method: "POST",
    url: "/cityPicker/",
    data,
    baseURL: Config.proxy.test
  });
}
