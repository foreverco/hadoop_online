let marker = null;
/* 设置点覆盖物 */
export function amapSetMarker(lgla, map) {
  if (marker) {
    map.remove(marker);
    marker = null;
  }
  marker = new AMap.Marker({
    position: [lgla.lg, lgla.la]
  });
  console.log("marker");
  map.add(marker);
  map.setFitView();
}
/* 清除点覆盖物 */
export function amapClearMarker(map) {
  if (marker) {
    map.remove(marker);
    marker = null;
  }
}

/* 设置圆覆盖物 */
// let circle = null;
// export function amapSetCircle(lgla, map) {
//   if (circle) {
//     map.remove(circle);
//     circle = null;
//   }
//   circle = new AMap.Circle({
//     center: new AMap.LngLat(lgla.lg, lgla.la),
//     radius: 1000, // 圆半径
//     fillColor: "red", // 圆形填充颜色
//     strokeColor: "#fff", // 描边颜色
//     strokeWeight: 2 // 描边宽度
//   });
//   console.log("circle");
//   map.add(circle);
// }

/* 设置圆覆盖物 */
// let mouseTool = null;
// export function amapSetCircle(map) {
//   if (mouseTool) {
//     map.add(mouseTool);
//     mouseTool = null;
//   }
//   let mouseTool = new AMap.MouseTool(map);
//   mouseTool.circle({
//     strokeColor: "#1791fc",
//     strokeOpacity: 1,
//     strokeWeight: 6,
//     strokeOpacity: 0.2,
//     fillColor: "#1791fc10",
//     fillOpacity: 0.4,
//     strokeStyle: "solid"
//     // 线样式还支持 'dashed'
//     // strokeDasharray: [30,10],
//   });
//   console.log("mouseTool");
//   mouseTool.on("draw", function(event) {
//     // event.obj 为绘制出来的覆盖物对象
//     // log.info("覆盖物对象绘制完成");
//   });
// }
