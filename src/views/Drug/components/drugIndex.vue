<template>
  <div class="drugIndex lvallcontainer">
    <div class="swiperBox">
      <div class="smallSwiper lvcontainer">
        <!-- 轮播图 -->
        <SwiperVue
          :imgList="drugswiperList"
          :swiperConfig="drugswiperConfig"
        ></SwiperVue>
      </div>
    </div>
    <div class="drugcontent lvcontainer">
      <ul class="searchBox">
        <li>
          <span>搜索:</span>
          <div class="headSearch">
            <el-input v-model="drugKey" placeholder="请输入关键字"></el-input>
            <el-button @click="getDrugKeys" type="success">搜索</el-button>
          </div>
        </li>
        <li :class="{ h40: areaActive }">
          <span>区域:</span>
          <ul class="areaList">
            <li
              v-for="(item, index) in areaList"
              :key="index"
              :class="{ zmActive: zmActive.value == item.provinceId }"
              @click="changeareaactive(item)"
            >
              {{ item.province }}
            </li>
          </ul>
          <i
            :class="areaActive ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
            @click="areaActive = !areaActive"
          ></i>
        </li>
        <li>
          <span>产新:</span>
          <ul class="moonList">
            <li
              v-for="(item, index) in moonList"
              :key="index"
              :class="{ zmActive: zmActive.value == item.value }"
              @click="changemoonactive(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </li>
        <li>
          <span>拼音:</span>
          <ul class="zmList">
            <li
              v-for="(item, index) in zmList"
              :key="index"
              :class="{ zmActive: zmActive.value == item.value }"
              @click="getZm(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </li>
        <li v-if="twoZmShow">
          <span></span>
          <ul class="zmList">
            <li
              v-for="(item, index) in zmList"
              :key="index"
              :class="{ zmActive: zmActive.value == oneZm + item.label }"
              @click="gettwoZm(item)"
            >
              {{ `${oneZm}${item.label}` }}
            </li>
          </ul>
        </li>
        <li>
          <!-- {{ zmActive }} -->
          <el-button @click="delActive">取消筛选</el-button>
        </li>
      </ul>
      <div class="titleBox">
        <Title :titleTxt="`${zmActive.label}类`" :btnShow="false"></Title>
      </div>
      <div class="drugMsgBoxList">
        <ul>
          <li
            v-for="(item, index) in drugList"
            :key="index"
            @click="gotoDrugMsg(item.id)"
          >
            <div class="imgBox">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="conBox">
              <div class="nameBox">
                <span>{{ item.medinceName }}</span>
                <span>{{ item.anotherName }}</span>
              </div>
              <p>
                <span>别名:</span>
                <span>{{ item.chineseName }}</span>
              </p>
              <p>
                <span>产新时间:</span>
                <span v-for="(i, index) in item.months" :key="index">
                  {{ i }}</span
                >
              </p>
              <p>
                <span>主要产区:</span>
                <span v-for="(i, index) in item.places" :key="index">
                  {{ i }}
                </span>
              </p>
              <el-button type="success">查看更多</el-button>
            </div>
          </li>
        </ul>
        <!--   分页插件   -->
        <div style="text-align:center;margin-top:20px">
          <pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total"
            :size="size"
            :pageLayout="pageLayout"
            :current="current"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SwiperVue from "@/components/SwiperVue";
import pagination from "@/components/Pagination";
import { reqAdress } from "@/api/map";
import { reqAllDrug } from "@/api/drug";
export default {
  name: "drugIndex",
  components: {
    SwiperVue,
    pagination
  },
  watch: {
    zmActive: {
      handler(newVal) {
        console.log(newVal.value);
        this.moonList.some(item => {
          if (item.value == newVal.value) {
            alert(111);
            this.twoZmShow = false;
            this.drugKey = "";
            this.getDrugs(1, 9, { month: newVal.value });
          }
        });
        // this.zmList.some(item => {
        //   if (item.value == newVal.value || this.twoZmShow) {
        //     alert(222);
        //     this.twoZmShow = true;
        //     this.getDrugs(1, 9, { letter: newVal.value });
        //   }
        // });

        this.areaList.some(item => {
          if (item.provinceId == newVal.value) {
            alert(333);
            this.twoZmShow = false;
            this.drugKey = "";
            this.getDrugs(1, 9, { place: newVal.label });
          }
        });
      },
      deep: true
    }
  },
  data() {
    return {
      // records: [],
      // current: 1,
      // size: 4,
      // total: 10,
      // pages: 10,
      drugKey: "",
      oneZm: "",
      twoZm: "",
      twoZmShow: false,
      drugswiperConfig: {
        slidesPerView: 4,
        spaceBetween: 78,
        textShow: true,
        imgheight: "80%"
      },
      drugswiperList: [
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "黄芪",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/甘草.png"),
          title: "甘草",
          con: "清热解毒，润肺止咳，调和诸药性"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/枸杞.png"),
          title: "枸杞",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/苦豆子.png"),
          title: "苦豆子",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        }
      ],
      checkForm: {},
      areaList: [],
      areaActive: true,
      moonList: [
        { label: "一月", value: "1月" },
        { label: "二月", value: "2月" },
        { label: "三月", value: "3月" },
        { label: "四月", value: "4月" },
        { label: "五月", value: "5月" },
        { label: "六月", value: "6月" },
        { label: "七月", value: "7月" },
        { label: "八月", value: "8月" },
        { label: "九月", value: "9月" },
        { label: "十月", value: "10月" },
        { label: "十一月", value: "11月" },
        { label: "十二月", value: "12月" }
      ],
      zmActive: {
        label: "所有",
        value: ""
      },
      zmList: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
        { label: "G", value: "G" },
        { label: "H", value: "H" },
        { label: "I", value: "I" },
        { label: "J", value: "J" },
        { label: "K", value: "K" },
        { label: "L", value: "L" },
        { label: "M", value: "M" },
        { label: "N", value: "N" },
        { label: "O", value: "O" },
        { label: "P", value: "P" },
        { label: "Q", value: "Q" },
        { label: "R", value: "R" },
        { label: "S", value: "S" },
        { label: "T", value: "T" },
        { label: "U", value: "U" },
        { label: "V", value: "V" },
        { label: "W", value: "W" },
        { label: "X", value: "X" },
        { label: "Y", value: "Y" },
        { label: "Z", value: "Z" }
      ],
      records: [],
      current: 1,
      size: 6,
      total: 0,
      pages: 0,
      pageLayout: "prev, pager, next",
      drugList: [
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芩.png"),
          title: "黄芩",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "黄芪",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/霍山石斛.png"),
          title: "霍山石斛",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/苦豆子.png"),
          title: "苦豆子",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/枸杞.png"),
          title: "枸杞",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/甘草.png"),
          title: "甘草",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        }
      ]
    };
  },
  created() {
    this.getProvince();
    this.getDrugs();
  },
  methods: {
    //获取地址(省)
    getProvince() {
      let proParams = {
        type: "province",
        id: "001"
      };
      reqAdress(proParams).then(res => {
        this.areaList = res.data.data;
      });
    },
    delActive() {
      this.twoZmShow = false;
      this.zmActive = { label: "所有", value: "" };
      this.getDrugs(1, 9);
    },
    getDrugKeys() {
      alert(111);
      this.getDrugs(1, 9, { name: this.drugKey });
    },
    // 获取所有药材
    getDrugs(page, size, p) {
      let drugParams = {};
      if (page) {
        this.current = page;
      }
      if (size) {
        this.size = size;
      }
      if (p) {
        drugParams = p;
      }
      drugParams.page = this.current;
      drugParams.pageSize = this.size;
      reqAllDrug(drugParams).then(res => {
        this.drugList = res.data.data.records;
        this.drugList.forEach(item => {
          item.imgUrl = require("@/assets/images/test/ddyc/黑灵芝.png");
        });
        this.total = res.data.data.total;
        this.size = res.data.data.size;
      });
    },
    handleSizeChange(size) {
      this.getDrugs(1, size);
    },
    handleCurrentChange(page) {
      this.getDrugs(page);
    },
    changeareaactive(e) {
      e.label = e.province;
      e.value = e.provinceId;
      for (let key in this.zmActive) {
        this.zmActive[key] = e[key];
      }
      // this.zmActive = e.province;
    },
    changemoonactive(e) {
      for (let key in this.zmActive) {
        this.zmActive[key] = e[key];
      }
    },
    getZm(e) {
      console.log(e);
      this.oneZm = e.value;
      // this.zmActive = e;
      for (let key in this.zmActive) {
        this.zmActive[key] = e[key];
      }
      this.twoZmShow = true;
      this.drugKey = "";
      this.getDrugs(1, 9, { letter: e.value });
    },
    gettwoZm(e) {
      console.log(e);
      console.log(this.oneZm);
      // this.twoZm = this.oneZm + e.value;
      this.twoZm = this.oneZm + e.value;
      this.zmActive.label = this.oneZm + e.value;
      this.zmActive.value = this.oneZm + e.value;
      this.twoZmShow = true;
      this.drugKey = "";
      this.getDrugs(1, 9, { letter: this.twoZm });
    },
    // 跳转详情页
    gotoDrugMsg(id) {
      this.$router.push({
        path: "/drug/drugMsg",
        query: {
          id: id
        }
      });
    }
    // getDrugList(page, size, p) {
    //   console.log(page, size, p);
    // },
  }
};
</script>
<style lang="scss">
.drugcontent {
  .headSearch {
    .el-input {
      .el-input__inner {
        height: 40px;
        background: #ffffff;
        border: 1px solid $maincolor;
        border-radius: 5px 0 0 5px;
        outline: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.drugIndex {
  .swiperBox {
    height: 413px;
    background: url("../../../assets/images/test/ddyc/swiperbg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .drugcontent {
    // height: 2000px;
    margin-top: 32px;
    .searchBox {
      background: $boxbg;
      border-top: 3px solid $maincolor;
      .h40 {
        height: 55px;
        transition: ease-in-out 1.5s;
        display: flex;
        align-items: center;
      }
      .zmActive {
        color: $maincolor;
      }
      > li {
        padding: $boxpadding;
        min-height: 55px;
        border-bottom: 1px solid rgba(58, 181, 76, 0.1);
        display: flex;
        overflow: hidden;
        position: relative;
        // align-items: center;
        &:last-child {
          border-bottom: 0;
        }
        span {
          margin-right: 35px;
          color: #666666;
        }
        .headSearch {
          display: flex;
          justify-content: center;
          align-items: center;
          .el-input {
            border-radius: 5px 0 0 5px;
            width: 300px;
            outline: 0;
            .el-input__inner {
              height: 100px;
              background: #ffffff;
              outline: 0;
            }
          }
          .el-button {
            border-radius: 0 5px 5px 0;
            height: 40px;
            font-size: 16px;
            line-height: 10px;
          }
        }
        .areaList {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          width: 90%;
          li {
            margin: 0 10px;
            height: 40px;
            line-height: 40px;
            &:hover {
              cursor: pointer;
              color: $maincolor;
            }
          }
        }
        i {
          height: 25px;
          line-height: 25px;
          width: 25px;
          position: absolute;
          top: 15px;
          // transform: translateY(-50%);
          right: 10px;
          border: 1px solid rgba(186, 186, 186, 1);
          color: rgba(186, 186, 186, 1);
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
        .moonList {
          display: flex;
          > li {
            margin-right: 47px;
            &:hover {
              color: $maincolor;
              cursor: pointer;
            }
          }
        }
        .zmList {
          display: flex;

          > li {
            margin-right: 33px;
            &:hover {
              color: $maincolor;
              cursor: pointer;
            }
          }
        }
      }
    }
    .titleBox {
      margin: 30px 0;
    }
    .drugMsgBoxList {
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        > li {
          width: 445px;
          height: 460px;
          border: 1px solid rgba(58, 181, 76, 1);
          margin-right: 29px;
          margin-bottom: 29px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .imgBox {
            height: 272px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .conBox {
            height: 188px;
            background: #fff;
            padding: 20px;
            border-bottom: 1px solid $maincolor;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            position: relative;
            .el-button {
              position: absolute;
              width: 123px;
              height: 33px;
              line-height: 0;
              font-size: 18px;
              bottom: 21px;
              right: 26px;
            }
            .nameBox {
              span {
                &:first-child {
                  font-size: 24px;
                  font-family: Microsoft YaHei;
                  font-weight: 600;
                  color: $maincolor;
                  line-height: 27px;
                  margin-right: 10px;
                }
              }
            }
            p {
              span {
                display: inline-block;
                &:first-child {
                  width: 80px;
                  text-align: justify;
                  text-align-last: justify;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
