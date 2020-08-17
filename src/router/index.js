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
              title: "专家教学视频",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/warningModle",
        name: "WarningModle",
        class_true: false,
        component: () => import("@/views/WarningModle"),
        hidden: false,
        meta: {
          title: "植保监测",
          icon: "WarningModle"
        }
      },
      {
        path: "/review",
        name: "Review",
        class_true: false,
        component: () => import("@/views/Review"),
        hidden: false,
        meta: {
          title: "追溯源管理",
          icon: "Review"
        }
      },
      {
        path: "/market",
        name: "Market",
        class_true: false,
        component: () => import("@/views/Market"),
        hidden: false,
        meta: {
          title: "市场分析",
          icon: "navmenu"
        },
        children: [
          {
            path: "/Market1",
            name: "Market1",
            class_true: false,
            component: () => import("@/views/Market/components/Market1.vue"),
            hidden: false,
            meta: {
              title: "市场分析1",
              icon: "navmenu"
            }
          },
          {
            path: "/market2",
            name: "Market2",
            class_true: false,
            component: () => import("@/views/Market/components/Market2.vue"),
            hidden: false,
            meta: {
              title: "市场分析2",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/OTC1",
        name: "OTC",
        class_true: false,
        component: () => import("@/views/OTC"),
        hidden: false,
        meta: {
          title: "交易平台",
          icon: "navmenu"
        },
        children: [
          {
            path: "/OTC1",
            name: "OTC1",
            class_true: false,
            component: () => import("@/views/OTC/components/OTC1.vue"),
            hidden: false,
            meta: {
              title: "交易平台1",
              icon: "navmenu"
            }
          },
          {
            path: "/OTC2",
            name: "OTC2",
            class_true: false,
            component: () => import("@/views/OTC/components/OTC2.vue"),
            hidden: false,
            meta: {
              title: "交易平台2",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/drug",
        name: "Drug",
        class_true: false,
        component: () => import("@/views/Drug"),
        hidden: false,
        childrenhide: true,
        meta: {
          title: "道地药材",
          icon: "navmenu"
        },
        children: [
          {
            path: "/drug",
            redirect: "/drug/index",
            hidden: true
          },
          {
            path: "/drug/index",
            name: "DrugIndex",
            class_true: false,
            component: () => import("@/views/Drug/components/drugIndex"),
            hidden: false,
            meta: {
              title: "道地药材",
              icon: "navmenu"
            }
          },
          {
            path: "/drug/drugMsg",
            name: "DrugMsg",
            class_true: false,
            component: () => import("@/views/Drug/components/drugMsg"),
            hidden: false,
            meta: {
              title: "道地药材详情",
              icon: "navmenu"
            }
          },
          {
            path: "/drug/drugMapping",
            name: "drugMapping",
            class_true: false,
            component: () => import("@/views/Drug/components/drugMapping"),
            hidden: false,
            meta: {
              title: "知识图谱",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/benefit",
        name: "Benefit",
        class_true: false,
        component: () => import("@/views/Benefit"),
        hidden: false,
        meta: {
          title: "政策资讯",
          icon: "navmenu"
        },
        children: [
          {
            path: "/marketInfo",
            name: "MarketInfoIndex",
            class_true: false,
            component: () => import("@/views/Benefit/components/MarketInfo"),
            hidden: false,
            meta: {
              title: "市场资讯",
              icon: "navmenu"
            },

            children: [
              {
                path: "/marketInfo",
                // redirect: "/marketInfo/marketMsg",
                redirect: "/marketInfo/marketList",
                hidden: true
              },
              {
                path: "/marketInfo/marketList",
                name: "MarketInfo",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo/components/MarketList"
                  ),
                hidden: false,
                meta: {
                  title: "市场资讯",
                  icon: "navmenu"
                }
              },
              {
                path: "/marketInfo/marketMsg",
                name: "marketMsg",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo/components/marketMsg"
                  ),
                hidden: false,
                meta: {
                  title: "市场资讯详情",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/benefit1",
            name: "Benefit1",
            class_true: false,
            component: () => import("@/views/Benefit/components/Benefit1.vue"),
            hidden: false,
            meta: {
              title: "政策资讯1",
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
              title: "政策资讯2",
              icon: "navmenu"
            }
          }
        ]
      },
      /* 个人中心 */
      // {
      //   path: "/personal",
      //   redirect: "/personal/center",
      //   hidden: true
      // },
      {
        path: "/personal",
        name: "Personal",
        redirect: "/personal/center",
        class_true: false,
        component: () => import("@/views/Personal"),
        hidden: true,
        meta: {
          title: "个人中心",
          icon: "navmenu"
        },
        children: [
          {
            path: "/personal/center",
            name: "PerCenter",
            class_true: false,
            component: () => import("@/views/Personal/Center"),
            hidden: false,
            meta: {
              title: "个人信息",
              icon: "navmenu"
            }
          },
          {
            path: "/personal/certify",
            name: "Certify",
            class_true: false,
            component: () => import("@/views/Personal/Certify"),
            hidden: false,
            meta: {
              title: "实名认证",
              icon: "navmenu"
            }
          },
          {
            path: "/personal/survey",
            name: "Survey",
            class_true: false,
            component: () => import("@/views/Personal/Survey"),
            hidden: false,
            meta: {
              title: "用户调查",
              icon: "navmenu"
            },
            children: [
              {
                path: "/personal/survey/add",
                name: "Survey",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Survey/components/add.vue"),
                hidden: false,
                meta: {
                  title: "新建",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/personal/saveCenter",
            name: "SaveCenter",
            class_true: false,
            component: () => import("@/views/Personal/SaveCenter"),
            hidden: false,
            meta: {
              title: "安全中心",
              icon: "navmenu"
            }
          },
          {
            path: "/personal/adress",
            name: "Adress",
            class_true: false,
            component: () => import("@/views/Personal/Adress"),
            hidden: false,
            meta: {
              title: "我的地址",
              icon: "navmenu"
            },
            children: [
              {
                path: "/personal/adress",
                redirect: "/personal/adress/list",
                hidden: true
              },
              {
                path: "/personal/adress/list",
                name: "Adress",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Adress/components/list"),
                hidden: false,
                meta: {
                  title: "收货地址",
                  icon: "navmenu"
                }
              },
              {
                path: "/personal/adress/add",
                name: "Adress",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Adress/components/add"),
                hidden: false,
                meta: {
                  title: "新建收货地址",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/personal/supply",
            name: "Supply",
            class_true: false,
            component: () => import("@/views/Personal/Supply"),
            hidden: false,
            meta: {
              title: "我的供应",
              icon: "navmenu"
            },
            children: [
              {
                path: "/personal/supply",
                redirect: "/personal/supply/tableView",
                hidden: true
              },
              {
                path: "/personal/supply/tableView",
                name: "SupplyTable",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Supply/components/tableTree"),
                hidden: false,
                meta: {
                  // title: "我的供应",
                  icon: "navmenu"
                }
              },
              {
                path: "/personal/supply/addsupply",
                name: "SupplyAdd",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Supply/components/addSupply"),
                hidden: false,
                meta: {
                  title: "发布供应",
                  icon: "navmenu"
                }
              }
            ]
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
