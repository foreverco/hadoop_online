import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";

// import view from "./modules/view";
// import mgmt from "./modules/mgmt";

// import LayoutView from "../views/view/Layout/index.vue";
// import LayoutMgmt from "../views/mgmt/Layout/index.vue";

Vue.use(VueRouter);

let baseRoutes = [
  {
    path: "/",
    redirect: "/home",
    hiddem: true
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/login",
        name: "Login",
        hidden: true,
        component: () => import("@/views/Login"),
        meta: {
          title: "登录",
          icon: "navmenu"
        }
      },
      {
        path: "/register",
        name: "Register",
        hidden: true,
        component: () => import("../views/Register/index.vue"),
        meta: {
          title: "注册",
          icon: "navmenu"
        }
      },
      {
        path: "/home",
        name: "ViewHomeindex",
        class_true: false,
        component: () => import("@/views/Home"),
        hidden: false,
        meta: {
          title: "首页",
          icon: "navmenu"
        }
      },
      {
        path: "/areaPlan",
        name: "AreaPlan",
        class_true: false,
        component: () => import("@/views/AreaPlan"),
        hidden: false,
        meta: {
          title: "区域规划",
          icon: "navmenu"
        },
        children: [
          {
            path: "/areaPlan1",
            name: "AreaPlan1",
            class_true: false,
            component: () =>
              import("@/views/AreaPlan/components/AreaPlan1.vue"),
            hidden: false,
            meta: {
              title: "区域规划1",
              icon: "navmenu"
            }
          },
          {
            path: "/areaPlan2",
            name: "AreaPlan2",
            class_true: false,
            component: () =>
              import("@/views/AreaPlan/components/AreaPlan2.vue"),
            hidden: false,
            meta: {
              title: "区域规划2",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/planting",
        name: "Planting",
        class_true: false,
        component: () => import("@/views/Planting"),
        hidden: false,
        meta: {
          title: "种植指导",
          icon: "navmenu"
        },
        children: [
          {
            path: "/planting1",
            name: "Planting1",
            class_true: false,
            component: () =>
              import("../views/Planting/components/Planting1.vue"),
            hidden: false,
            meta: {
              title: "种植指导1",
              icon: "navmenu"
            }
          },
          {
            path: "/planting2",
            name: "Planting2",
            class_true: false,
            component: () =>
              import("@/views/Planting/components/Planting2.vue"),
            hidden: false,
            meta: {
              title: "种植指导2",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/insect",
        name: "Insect",
        class_true: false,
        component: () => import("@/views/Insect"),
        hidden: false,
        meta: {
          title: "虫情分析",
          icon: "navmenu"
        }
      },
      {
        path: "/benefit",
        name: "Benefit",
        class_true: false,
        component: () => import("@/views/Benefit"),
        hidden: false,
        meta: {
          title: "效益分析",
          icon: "navmenu"
        },
        children: [
          {
            path: "/benefit1",
            name: "Benefit1",
            class_true: false,
            component: () => import("@/views/Benefit/components/Benefit1.vue"),
            hidden: false,
            meta: {
              title: "效益分析1",
              icon: "navmenu"
            }
          },
          {
            path: "/benefit2",
            name: "Benefit2",
            class_true: false,
            component: () => import("@/views/Benefit/components/Benefit2.vue"),
            hidden: false,
            meta: {
              title: "效益分析2",
              icon: "navmenu"
            }
          }
        ]
      },
      // {
      //   path: "/soil",
      //   name: "Soil",
      //   class_true: false,
      //   component: () => import("@/views/Soil"),
      //   hidden: false,
      //   meta: {
      //     title: "土壤分析",
      //     icon: "navmenu"
      //   }
      // },
      // {
      //   path: "/plantSearch",
      //   name: "PlantSearch",
      //   class_true: false,
      //   component: () => import("@/views/PlantSearch"),
      //   hidden: false,
      //   meta: {
      //     title: "植物全息搜索",
      //     icon: "navmenu"
      //   }
      // },
      {
        path: "/404",
        name: "page404",
        hidden: true,
        class_true: false,
        component: () => import("@/views/page404/index.vue")
      }
    ]
  },

  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: baseRoutes
});
console.log(router);

export default router;
