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
    hidden: true
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
              title: "区域种植规划 ",
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
              title: "资源地图",
              icon: "navmenu"
            }
          }
        ]
      },
      {
        path: "/plantingvideo",
        name: "ExpertVideo",
        class_true: false,
        component: () => import("@/views/Planting/index.vue"),
        hidden: false,
        meta: {
          title: "种植指导",
          icon: "navmenu"
        },
        children: [
          {
            path: "/plantingvideo/index",
            name: "ExpertVideo1",
            class_true: false,
            component: () =>
              import("@/views/Planting/components/ExpertVideo/index.vue"),
            hidden: false,
            meta: {
              title: "专家教学视频",
              icon: "navmenu"
            },
            children: [
              // {
              //   path: "/plantingvideo",
              //   redirect: "/plantingvideo/expertVideo"
              // },
              {
                path: "/plantingvideo/index",
                name: "ExpertVideo",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Planting/components/ExpertVideo/component/videolist.vue"
                  ),
                hidden: true,
                meta: {
                  title: "专家教学视频",
                  icon: "navmenu"
                }
              },
              {
                path: "/plantingvideo/video",
                name: "Planting2",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Planting/components/ExpertVideo/component/videoMsg.vue"
                  ),
                hidden: true,
                meta: {
                  title: "视频详情",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/plantingvideo/norm",
            name: "NormVideo",
            class_true: false,
            component: () => import("@/views/Planting/components/norm.vue"),
            hidden: false,
            meta: {
              title: "标准化种植规范",
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
              title: "产地价格",
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
              title: "市场价格",
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
          // {
          //   path: "/OTC1",
          //   redirect: "/OTC1/index",
          //   hidden: true
          // },
          {
            path: "/OTC1/index",
            name: "OTC1",
            class_true: false,
            component: () => import("@/views/OTC/components/OTC1/index.vue"),
            hidden: false,
            meta: {
              title: "供应信息",
              icon: "navmenu"
            },
            children: [
              {
                path: "/OTC1/index",
                name: "OTC1",
                class_true: false,
                component: () =>
                  import("@/views/OTC/components/OTC1/component/list.vue"),
                hidden: false,
                meta: {
                  title: "供应信息",
                  icon: "navmenu"
                }
              },
              {
                path: "/OTC1/applyMsg",
                name: "OTC1",
                class_true: false,
                component: () =>
                  import("@/views/OTC/components/OTC1/component/applyMsg.vue"),
                hidden: false,
                meta: {
                  title: "供应详情",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/OTC2/index",
            name: "OTC2",
            class_true: false,
            component: () => import("@/views/OTC/components/OTC2/index.vue"),
            hidden: false,
            meta: {
              title: "求购信息",
              icon: "navmenu"
            },
            children: [
              {
                path: "/OTC2/index",
                name: "OTC2",
                class_true: false,
                component: () =>
                  import("@/views/OTC/components/OTC2/component/list.vue"),
                hidden: false,
                meta: {
                  title: "求购信息",
                  icon: "navmenu"
                }
              },
              {
                path: "/OTC2/buymsg",
                name: "OTC1",
                class_true: false,
                component: () =>
                  import("@/views/OTC/components/OTC2/component/buymsg.vue"),
                hidden: false,
                meta: {
                  title: "求购详情",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/company/index",
            name: "Company",
            class_true: false,
            component: () => import("@/views/OTC/components/Company/index.vue"),
            hidden: false,
            meta: {
              title: "企业信息",
              icon: "navmenu"
            },
            children: [
              {
                path: "/company/index",
                name: "Company",
                class_true: false,
                component: () =>
                  import("@/views/OTC/components/Company/component/list.vue"),
                hidden: false,
                meta: {
                  title: "企业信息",
                  icon: "navmenu"
                }
              },
              {
                path: "/company/companyMsg",
                name: "CompanyMsg",
                class_true: false,
                component: () =>
                  import(
                    "@/views/OTC/components/Company/component/companyMsg.vue"
                  ),
                hidden: false,
                meta: {
                  title: "企业详情",
                  icon: "navmenu"
                }
              }
            ]
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
              title: "产地资讯",
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
                  title: "产地资讯",
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
            path: "/marketInfo1",
            name: "MarketInfoIndex",
            class_true: false,
            component: () => import("@/views/Benefit/components/MarketInfo1"),
            hidden: false,
            meta: {
              title: "政策资讯",
              icon: "navmenu"
            },
            children: [
              {
                path: "/marketInfo1",
                redirect: "/marketInfo1/marketList",
                hidden: true
              },
              {
                path: "/marketInfo1/marketList",
                name: "MarketInfo1",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo1/components/MarketList"
                  ),
                hidden: false,
                meta: {
                  title: "政策资讯",
                  icon: "navmenu"
                }
              },
              {
                path: "/marketInfo1/marketMsg",
                name: "marketMsg",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo1/components/marketMsg"
                  ),
                hidden: false,
                meta: {
                  title: "政策资讯详情",
                  icon: "navmenu"
                }
              }
            ]
          },
          {
            path: "/marketInfo2",
            name: "MarketInfoIndex",
            class_true: false,
            component: () => import("@/views/Benefit/components/MarketInfo2"),
            hidden: false,
            meta: {
              title: "行业资讯",
              icon: "navmenu"
            },
            children: [
              {
                path: "/marketInfo2",
                redirect: "/marketInfo2/marketList",
                hidden: true
              },
              {
                path: "/marketInfo2/marketList",
                name: "MarketInfo1",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo2/components/MarketList"
                  ),
                hidden: false,
                meta: {
                  title: "行业资讯",
                  icon: "navmenu"
                }
              },
              {
                path: "/marketInfo2/marketMsg",
                name: "marketMsg",
                class_true: false,
                component: () =>
                  import(
                    "@/views/Benefit/components/MarketInfo2/components/marketMsg"
                  ),
                hidden: false,
                meta: {
                  title: "行业资讯详情",
                  icon: "navmenu"
                }
              }
            ]
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
            path: "/personal/notes",
            name: "Notes",
            class_true: false,
            component: () => import("@/views/Personal/Notes"),
            hidden: false,
            meta: {
              title: "个人记录",
              icon: "navmenu"
            },
            children: [
              {
                path: "/personal/notes",
                redirect: "/personal/notes/browse",
                hidden: true
              },
              {
                path: "/personal/notes/browse",
                name: "Notes",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Notes/components/Browse.vue"),
                hidden: false,
                meta: {
                  title: "浏览记录",
                  icon: "navmenu"
                }
              },
              {
                path: "/personal/notes/favorite",
                name: "Notes",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Notes/components/Favorite.vue"),
                hidden: false,
                meta: {
                  title: "收藏夹",
                  icon: "navmenu"
                }
              }
            ]
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
                path: "/personal/survey",
                redirect: "/personal/survey/list"
              },
              {
                path: "/personal/survey/list",
                name: "Survey",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Survey/components/list.vue"),
                hidden: false,
                meta: {
                  title: "调查列表",
                  icon: "navmenu"
                }
              },
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
            },
            children: [
              {
                path: "/personal/saveCenter",
                redirect: "/personal/saveCenter/changePhone"
              },
              {
                path: "/personal/saveCenter/changePhone",
                name: "SaveCenter",
                class_true: false,
                component: () =>
                  import("@/views/Personal/SaveCenter/components/ChangePhone"),
                hidden: false,
                meta: {
                  title: "修改手机号",
                  icon: "navmenu"
                }
              },
              {
                path: "/personal/saveCenter/changePass",
                name: "SaveCenter",
                class_true: false,
                component: () =>
                  import("@/views/Personal/SaveCenter/components/ChangePass"),
                hidden: false,
                meta: {
                  title: "修改密码",
                  icon: "navmenu"
                }
              }
            ]
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
                name: "Supply",
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
                name: "Supply",
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
          },

          {
            path: "/personal/buy",
            name: "Buy",
            class_true: false,
            component: () => import("@/views/Personal/Buy"),
            hidden: false,
            meta: {
              title: "我的求购",
              icon: "navmenu"
            },
            children: [
              {
                path: "/personal/buy",
                redirect: "/personal/buy/tableView",
                hidden: true
              },
              {
                path: "/personal/buy/tableView",
                name: "Buy",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Buy/components/tableTree"),
                hidden: false,
                meta: {
                  // title: "我的供应",
                  icon: "navmenu"
                }
              },
              {
                path: "/personal/buy/addbuy",
                name: "Buy",
                class_true: false,
                component: () =>
                  import("@/views/Personal/Buy/components/addBuy"),
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
