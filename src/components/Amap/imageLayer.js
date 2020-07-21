export function getImageLayer(imageLayer) {
  // 创建图片图层
  imageLayer = new AMap.ImageLayer({
    url:
      "http://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg",
    bounds: new AMap.Bounds([116.327911, 39.939229], [116.342659, 39.946275]),
    zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
  });
  return imageLayer;
}
