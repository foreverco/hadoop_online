// import router from "./index";
// import store from "@/store";
// import {
//   getStore
// } from "@/util/storage";
// import {
//   userInfo
// } from "@/api/userInfo";

// router.beforeEach((to, from, next) => {
//   let params = {
//     token: getStore("token")
//   };
//   // console.log(to);
//   // console.log(from);
//   // console.log(next);
//   // console.log(router.options.routes[1].children);
//   const whiteList = router.options.routes[1].children.map(item => item.path);
//   // console.log(whiteList.indexOf(to.path));
//   userInfo(params)
//     .then(res => {
//       // console.log(res);
//       if (res.result.state !== 1) {
//         // 没登录
//         if (whiteList.indexOf(to.path) !== -1) {
//           // 白名单
//           next();
//         } else {
//           next("/login");
//         }
//       } else {
//         store.commit("app/RECORD_USERINFO", {
//           info: res.result
//         });
//         if (to.path === "/login") {
//           //  跳转到
//           next({
//             path: "/"
//           });
//         }
//         next();
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       next();
//     });
// });