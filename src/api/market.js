import service from "@/util/request";
/* 获取存在市场价格的药材 */
export function reqmarketDrugList(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getMarketPriceMedicines",
    params
  });
}
/**
 *  获取综合排行榜涨/跌排名-列表页面
 * params:
 *  type:
 *    1:涨
 *    0：跌
 *  */

export function reqmarketRank(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getRank",
    params
  });
}

/* 根据药材id获取产地查询条件 */
export function reqgetOrigin(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getOriginConditions",
    params
  });
}

/* 根据药材id、产地获取规格查询条件 */
export function reqgetSpecification(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getSpecificationConditions",
    params
  });
}

/* 根据药材id、产地、规格获取对应的市场查询条件 */
export function reqgetMarkets(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getMarketsByCondition",
    params
  });
}

/* 某一药材某规格某市场价格统计信息 */
export function reqmarketPrice(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/marketPriceTj",
    params
  });
}

/* 某种药材某种规格某产地最新市场价格信息 */
export function reqgetLatestPrice(params) {
  return service.request({
    method: "get",
    url: "/view/marketPrice/getLatestPrice",
    params
  });
}
