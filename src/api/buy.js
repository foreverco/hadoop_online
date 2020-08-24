import service from "@/util/request";

/**
 * 求购相关
 *  */
/* 分页获取求购列表 */
export function reqbuyList(params) {
  return service.request({
    url: "/view/buying/queryRecentList",
    method: "get",
    params
  });
}

/* 发布求购信息 */
export function reqAddbuy(data) {
  return service.request({
    method: "POST",
    url: "/view/buying/member/pulishSupply",
    data
  });
}

/* 删除我的求购 */
export function reqdelbuy(data) {
  return service.request({
    method: "post",
    url: "/view/buying/member/delSupply",
    data
  });
}

/* 下架我的求购 */

export function requnderbuy(data) {
  return service.request({
    method: "post",
    url: "/view/buying/member/batchOff",
    data
  });
}

/* 根据id获取供应详情 */
export function reqbuymsg(params) {
  return service.request({
    url: "/view/buying/getDetail",
    method: "get",
    params
  });
}
/* 查看求购审核未通过原因 */
export function reqfailmsg(params) {
  return service.request({
    url: "/view/buying/member/viewAudit",
    method: "get",
    params
  });
}
