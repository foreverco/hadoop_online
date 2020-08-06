<template>
  <div class="home lvallcontainer">
    <div class="swiperBox lvallcontainer">
      <!-- 轮播图 -->
      <SwiperVue
        :imgList="swiperList1"
        :swiperConfig="swiperConfig"
      ></SwiperVue>
    </div>
    <!-- 政策资讯 登陆 -->
    <div class="InfoLogin lvcontainer">
      <div class="Information">
        <Title titleTxt="政策资讯"></Title>
        <div class="InformationContent">
          <div class="InfoswiperBox">
            <!-- 轮播图 -->
            <SwiperVue
              :imgList="swiperList2"
              :swiperConfig="swiperConfig"
            ></SwiperVue>
          </div>
          <div class="InfoTab">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="市场资讯" name="first">
                <ul>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                  <li>
                    <span>●</span>
                    <span>[市场]</span>
                    <span>京蒙扶贫路上盛开的“金莲花”：特色产业扶贫见成效</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="产地资讯" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="政策法规" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="InforightBox">
        <div class="homeloginBox">
          <ul class="loginTop">
            <li>
              <img src="../../assets/logo.png" alt="" />
            </li>
            <li>
              <p>
                <span>hi </span>
                <span v-if="!userMsg"> 游客 45586</span>
                <span v-else>
                  {{ (userMsg.info && userMsg.info.nickname) || "admin" }}</span
                >
              </p>
              <p v-if="!userMsg">
                登陆/注册获取更多体验
              </p>
              <p v-else>
                欢迎来到蒙中药材网
              </p>
            </li>
            <li>
              <el-button v-if="!userMsg" type="success">登陆/注册</el-button>
              <el-button v-else type="danger">退出</el-button>
            </li>
          </ul>
          <div class="loginBtn">
            <el-button type="info" :disabled="true">发布供应信息</el-button>
            <el-button type="info">发布求购信息</el-button>
          </div>
        </div>
        <div class="placeBox">
          <Title titleTxt="区域规划"></Title>
          <div class="placeMap">
            <AmapVue
              ref="amap"
              :options="options_map"
              @callback="callbackComponent"
            ></AmapVue>
          </div>
        </div>
      </div>
    </div>
    <!-- 人气品种 -->
    <div class="priceBox lvcontainer">
      <div class="priceLeft">
        <div class="tabList">
          <ul>
            <li
              v-for="(item, index) in priceTypeList"
              :key="index"
              :class="{ priceTypeActive: priceTypeActive == index }"
              @click="changepriceType(index)"
            >
              {{ item.name }}
            </li>
          </ul>
          <p>更多 > ></p>
        </div>
        <div class="priceTable">
          <TableVue :config="tableConfig">
            <!-- <template v-slot:image="slotData">
            <el-avatar :src="slotData.data.photo"></el-avatar>
          </template>
          <template v-slot:status="slotData">
            <el-switch
              v-model="slotData.data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template> -->
            <template v-slot:opration="slotData">
              <i class="el-icon-s-data iconName"></i>
              <span v-if="false">{{ slotData }}</span>
              <!-- <el-button type="primary" icon="el-icon-s-data"></el-button> -->
            </template>
          </TableVue>
        </div>
      </div>
      <div class="priceRight">
        <Title titleTxt="人气品种"></Title>
        <ul class="typeList">
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
          <li>
            <i class="el-icon-star-off"></i>
            <span>123</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热点专题 -->
    <div class="lvcontainer hotMsg">
      <div class="hotTitle">
        热点专题
      </div>
      <div class="hotSwiper">
        <!-- 轮播图 -->
        <SwiperVue
          :imgList="hotswiperList"
          :swiperConfig="hotswiperConfig"
        ></SwiperVue>
      </div>
    </div>

    <!-- 今日供求 -->
    <div class="needBox lvcontainer">
      <div class="needLeft">
        <Title titleTxt="今日供求"></Title>
        <div class="tableBox">
          <TableVue :config="tableConfig">
            <!-- <template v-slot:image="slotData">
            <el-avatar :src="slotData.data.photo"></el-avatar>
          </template>
          <template v-slot:status="slotData">
            <el-switch
              v-model="slotData.data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template> -->
            <template v-slot:opration="slotData">
              <el-button @click="find(slotData.data)">查看</el-button>
            </template>
          </TableVue>
        </div>
        <div class="btnBox">
          <el-button>发布供应信息</el-button>
        </div>
      </div>
      <div class="needRight">
        <Title titleTxt="今日求购"></Title>
        <div class="tableBox">
          <TableVue :config="tableConfig1">
            <!-- <template v-slot:image="slotData">
            <el-avatar :src="slotData.data.photo"></el-avatar>
          </template>
          <template v-slot:status="slotData">
            <el-switch
              v-model="slotData.data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template> -->
            <template v-slot:opration="slotData">
              <el-button size="mini" @click="find(slotData.data)"
                >查看</el-button
              >
            </template>
          </TableVue>
        </div>
        <div class="btnBox">
          <el-button>发布供应信息</el-button>
        </div>
      </div>
    </div>
    <!-- 道地药材 -->
    <div class="drugBox lvcontainer">
      <Title titleTxt="道地药材"></Title>
      <div class="drugContent">
        <ul class="adressList">
          <li v-for="(item, index) in adressList" :key="index">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <ul class="imgList">
          <li v-for="(item, index) in drugList" :key="index">
            <img :src="item.imgUrl" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 视频专区 -->
    <div class="videoBox lvcontainer">
      <div class="videoList">
        <div class="videoListTop">
          视频专区
        </div>
        <div class="videoListBot">
          <div class="videoListBotTitle">
            <span>全部</span>
            <span>更多>></span>
          </div>
          <ul class="videoListBotCon">
            <li>黄芪</li>
            <li>防风</li>
            <li>麻黄</li>
            <li>柴胡</li>
            <li>柴胡</li>
            <li>红花</li>
            <li>白芍</li>
            <li>黄芪</li>
            <li>防风</li>
            <li>麻黄</li>
            <li>柴胡</li>
            <li>柴胡</li>
            <li>红花</li>
            <li>白芍</li>
            <li>防风</li>
            <li>麻黄</li>
            <li>柴胡</li>
            <li>柴胡</li>
          </ul>
        </div>
      </div>
      <div class="videoContent">
        <ul>
          <li v-for="(item, index) in videoList" :key="index">
            <img :src="item.imgUrl" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import AmapVue from "@/components/Amap";
import SwiperVue from "@/components/SwiperVue";
import TableVue from "@/components/TableData";
// import VideoVue from "../../components/video/video";
import { WOW } from "wowjs";
export default {
  name: "Home",
  components: {
    AmapVue,
    SwiperVue,
    TableVue
    // VideoVue
  },
  computed: {
    tokenMsg() {
      return this.$store.state.app.token;
    },
    isLogin() {
      return this.$store.state.app.isLogin;
    },
    userMsg() {
      console.log(typeof this.$store.state.app.userInfo);
      if (typeof this.$store.state.app.userInfo == "string") {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  watch: {
    userMsg(newVal) {
      console.log(newVal);
    }
  },
  data() {
    return {
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
        tHead: [
          { label: "品名", prop: "name" },
          { label: "规格", prop: "type", width: "50" },
          { label: "供应量", prop: "num" },
          { label: "产地", prop: "adress", width: "150" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration"
          }
          // {
          //   label: "类型",
          //   prop: "type",
          //   type: "function",
          //   callback: (row, prop) => {
          //     const sexItem = this.testJson[row[prop]];
          //     if (sexItem) {
          //       return sexItem.sex;
          //     }
          //   }
          // },
          // { label: "姓名", prop: "name" },
          // { label: "头像", prop: "photo", type: "slot", slotName: "image" },
          // { label: "地址", prop: "address" },
          // { label: "状态", prop: "status", type: "slot", slotName: "status" },
          // {
          //   label: "操作",
          //   type: "slot",
          //   slotName: "opration"
          // }
        ]
      },
      // 表格配置
      tableConfig1: {
        checkBox: false,
        headColor: "#FEEED7",
        tableHeight: "370px",
        hadBorder: false,
        tHead: [
          { label: "品名", prop: "name" },
          { label: "规格", prop: "type", width: "50" },
          { label: "供应量", prop: "num" },
          { label: "产地", prop: "adress", width: "150" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration"
          }
        ]
      },
      testArr: [
        { sex: "男", value: 0 },
        { sex: "女", value: 1 }
      ],
      testJson: this.$store.state.config.sex_json,
      // 轮播图
      swiperList1: [
        {
          imgUrl:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2365875079,1507384543&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3168202692,1753805141&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1758533318,3225512303&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2365875079,1507384543&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3168202692,1753805141&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1758533318,3225512303&fm=26&gp=0.jpg"
        }
      ],
      swiperConfig: {
        slidesPerView: 1
      },
      hotswiperConfig: {
        slidesPerView: 4,
        spaceBetween: 10
      },
      hotswiperList: [
        {
          imgUrl: require("@/assets/images/drugImg/s1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/s1.png")
        }
      ],
      swiperList2: [
        {
          imgUrl: require("@/assets/images/test1.png")
        },
        {
          imgUrl: require("@/assets/images/test1.png")
        }
      ],
      // 地图配置
      options_map: {
        mapLoad: true
      },
      lineconfig: {
        title: "收支情况",
        type: "line",
        keys: [
          {
            label: "收入",
            value: "sr",
            type: "line"
          },
          {
            label: "支出",
            value: "zc",
            type: "line"
          }
        ]
      },
      lineData: [
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-03",
          sr: 180,
          zc: 110
        },
        {
          date: "2020-04",
          sr: 190,
          zc: 160
        },
        {
          date: "2020-05",
          sr: 120,
          zc: 160
        }
      ],

      barconfig: {
        title: "收支情况",
        // type: "bar",
        keys: [
          {
            label: "收入",
            value: "sr",
            type: "bar"
          },
          {
            label: "支出",
            value: "zc",
            type: "bar"
          }
        ]
      },
      barData: [
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        }
      ],
      activeName: "first",
      /* 价格趋势 */
      priceTypeList: [
        { name: "今日价格", value: 0 },
        { name: "市场价格", value: 1 },
        { name: "产地价格", value: 2 },
        { name: "历史价格", value: 3 }
      ],
      priceTypeActive: 0,
      /* 道地药材 */
      adressList: [
        { name: "内蒙古" },
        { name: "安徽" },
        { name: "江苏" },
        { name: "黑龙江" },
        { name: "内蒙古" },
        { name: "安徽" },
        { name: "江苏" },
        { name: "黑龙江" },
        { name: "内蒙古" },
        { name: "安徽" },
        { name: "江苏" },
        { name: "黑龙江" },
        { name: "内蒙古" },
        { name: "安徽" },
        { name: "江苏" },
        { name: "黑龙江" },
        { name: "内蒙古" }
      ],
      /* 药材专区 */
      drugList: [
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug1.png")
        },
        {
          imgUrl: require("@/assets/images/drugImg/drug2.png")
        }
      ],
      /* 视频专区 */
      videoList: [
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        },
        {
          imgUrl: require("@/assets/images/videoImg/videoImg1.png")
        }
      ]
    };
  },
  mounted() {
    /* wowjs动画 */
    let wow = new WOW({
      boxClass: "wowcss",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: false
    });
    wow.init();
  },
  methods: {
    callbackComponent(params) {
      if (params.function) {
        this[params.function](params.data);
      }
    },
    mapLoad() {
      // console.log(123);
    },
    find(e) {
      console.log(e);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /* 修改价格类型 */
    changepriceType(e) {
      this.priceTypeActive = e;
    }
  }
};
</script>
<style lang="scss">
.home {
  .top {
    height: 100px;
  }
  /* 轮播图 */
  .swiperBox {
    // background: pink;
    // height: 800px;
    // position: relative;
  }
  /* 政策资讯 登陆 */
  .InfoLogin {
    height: 620px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .Information {
      background: $boxbg;
      padding: $boxpadding;
      width: 980px;
      .InformationContent {
        height: 460px;
        width: 100%;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .InfoswiperBox {
          // border: 1px solid red;
          width: 600px;
          // height: 100%;
        }
        .InfoTab {
          width: 320px;
          // border: 1px solid red;
          overflow: hidden;
          ul {
            // border: 1px solid blue;
            list-style: circle;
            margin: 0 20px 0 5px;
            li {
              list-style: circle;
              height: 40px;
              line-height: 40px;
              white-space: nowrap; /* 规定文本是否折行 */
              overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
              text-overflow: ellipsis;
              &:hover {
                cursor: pointer;
                span {
                  color: $maincolor;
                }
              }
              span {
                &:first-child {
                  color: $maincolor;
                }
                &:nth-child(2) {
                  margin: 0 2px 0 8px;
                }
              }
            }
          }
        }
      }
    }
    .InforightBox {
      width: 410px;
      display: flex;
      flex-flow: column;
      .homeloginBox {
        background: $boxbg;
        padding: $boxpadding;
        height: 308px;
        flex: 1;
        .loginTop {
          border-bottom: 1px solid #ccc;
          height: 130px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          li {
            &:first-child {
              width: 10%;
              img {
                width: 100%;
              }
            }
            p {
              height: 32px;
              line-height: 32px;
              color: $graycolor;
            }
          }
        }
        .loginBtn {
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          .el-button {
            padding: 15px 90px;
            font-size: 18px;
            margin-left: 0;
          }
        }
      }
      .placeBox {
        background: $boxbg;
        padding: $boxpadding;
        // border: 1px solid blue;
        height: 308px;
        margin-top: 10px;
        flex: 1;
        .placeMap {
          margin-top: 15px;
          height: 240px;
        }
      }
    }
  }
  /* 人气品种 */
  .priceBox {
    // border: 1px solid red;
    height: 610px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .priceLeft {
      width: 980px;
      padding: $boxpadding;
      background: $boxbg;
      .tabList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        ul {
          display: flex;
          li {
            width: 100px;
            border-right: 1px solid #ccc;
            text-align: center;
            &.priceTypeActive {
              color: $maincolor;
              font-weight: 600;
            }
            &:hover {
              cursor: pointer;
              color: $maincolor;
            }
            &:last-child {
              border-right: 0;
            }
          }
        }
        p {
          color: $maincolor;
        }
      }
      .priceTable {
        margin-top: 15px;
        // border: 1px solid red;
        height: 500px;
        overflow-y: hidden;
        .iconName {
          color: $sencondcolor;
          font-size: 18px;
        }
      }
    }
    .priceRight {
      width: 405px;
      padding: $boxpadding;
      background: $boxbg;
      .typeList {
        // border: 1px solid red;
        margin-top: 20px;
        height: 520px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        li {
          width: 94px;
          height: 100px;
          margin-top: 20px;
          // border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          &:hover {
            cursor: pointer;
            i {
              background: $maincolor;
              color: #ffffff;
              transform: scale(1.2);
            }
          }
          i {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e6f7e8;
            color: $maincolor;
            transition: ease-in-out 0.3s;
          }
          span {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  /* 热点专题 */
  .hotMsg {
    margin-top: 15px;
    height: 150px;
    background: $boxbg;
    padding: $boxpadding;
    display: flex;
    justify-content: space-between;
    .hotTitle {
      height: 120px;
      line-height: 60px;
      font-size: 42px;
      width: 120px;
      text-align: center;
      background: $sencondcolor;
      color: #fff;
    }
    .hotSwiper {
      // border: 1px solid red;
      width: 1200px;
    }
  }
  /* 今日供求 */
  .needBox {
    height: 680px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .needLeft {
      width: 690px;
      background: $boxbg;
      padding: $boxpadding;
      .tableBox {
        margin-top: 25px;
        height: 530px;
        overflow-y: hidden;
        .el-button {
          background: #ebf7ed;
          color: $maincolor;
          border: 1px solid $maincolor;
          padding: 4px 7px;
        }
      }
      .btnBox {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          background: $maincolor;
          border: 1px solid $maincolor;
          color: #ffffff;
          padding: 9px 90px;
          border-radius: 10px;
        }
      }
    }
    .needRight {
      width: 690px;
      background: $boxbg;
      padding: $boxpadding;
      .tableBox {
        margin-top: 25px;
        height: 530px;
        overflow-y: hidden;
        .el-button {
          background: #fef6eb;
          color: $sencondcolor;
          border: 1px solid $sencondcolor;
          padding: 4px 7px;
        }
      }
      .btnBox {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          background: $sencondcolor;
          border: 1px solid $sencondcolor;
          color: #ffffff;
          padding: 9px 90px;
          border-radius: 10px;
        }
      }
    }
  }
  /* 道地药材 */
  .drugBox {
    height: 560px;
    margin-top: 15px;
    background: $boxbg;
    padding: $boxpadding;
    .drugContent {
      // border: 1px solid red;
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .adressList {
        border-right: 1px solid #ccc;
        width: 475px;
        height: 480px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        li {
          background: #e7f6e9;
          border-radius: 5px;
          width: 135px;
          height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 15px;
          margin-bottom: 40px;
          i {
            color: $maincolor;
            margin-right: 5px;
            // margin-top: 1px;
            font-size: 20px;
          }
          span {
            font-size: 16px;
          }
        }
      }
      .imgList {
        // border: 1px solid blue;
        width: 855px;
        max-height: 480px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        li {
          width: 200px;
          height: 130px;
          margin-right: 17px;
          margin-bottom: 15px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
  /* 视频专区 */
  .videoBox {
    margin-top: 15px;
    background: $boxbg;
    padding: $boxpadding;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .videoList {
      width: 140px;
      height: 490px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .videoListTop {
        border: 3px solid $sencondcolor;
        color: $sencondcolor;
        width: 120px;
        height: 120px;
        line-height: 60px;
        font-size: 40px;
        text-align: center;
      }
      .videoListBot {
        height: 330px;
        margin-top: 20px;
        width: 100%;
        .videoListBotTitle {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          span {
            &:first-child {
              color: $maincolor;
            }
          }
        }
        .videoListBotCon {
          display: flex;
          justify-content: flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            margin: 10px 5px;
            color: #777;
            &:hover {
              color: $maincolor;
              cursor: pointer;
            }
          }
        }
      }
    }
    .videoContent {
      // border: 1px solid red;
      width: 1220px;
      height: 490px;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        li {
          width: 290px;
          height: 200px;
          position: relative;
          overflow: hidden;
          margin-right: 18px;
          margin-bottom: 18px;
          // border: 1px solid red;
          img {
            width: 100%;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
          &:hover {
            p {
              top: 0;
            }
          }
          p {
            position: absolute;
            bottom: 0;
            background: #000000;
            color: #fff;
            padding-left: 10px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            letter-spacing: 5px;
            transition: ease-in-out 0.5s;
          }
        }
      }
    }
  }
  .amapVue {
    height: 500px;
  }
  .echartsBox {
    height: 500px;
  }
}
</style>
