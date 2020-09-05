<template>
  <div class="marketMsgBox lvcontainer">
    <ul class="checkBox">
      <li>
        <p>搜索:</p>
        <div class="headSearch">
          <el-select
            v-model="drugMsg"
            placeholder="请选择"
            filterable
            @change="changedrugName"
          >
            <el-option
              v-for="i in drugList"
              :key="i.id"
              :label="i.medinceName"
              :value="i.id"
            >
            </el-option>
          </el-select>
          <el-button type="success" @click="searchDrug">搜索</el-button>
        </div>
      </li>
      <li>
        <p>产地:</p>
        <ul>
          <li
            v-for="(item, index) in originList"
            :key="index"
            :class="{ isActive: initMsg.origin == item.origin }"
            @click="changeOrigin(item.origin)"
          >
            {{ item.origin }}
          </li>
        </ul>
      </li>
      <li>
        <p>规格:</p>
        <ul>
          <li
            v-for="(item, index) in specificationList"
            :key="index"
            :class="{ isActive: initMsg.specification == item.specification }"
            @click="changespecification(item.specification)"
          >
            {{ item.specification }}
          </li>
        </ul>
      </li>
      <li>
        <p>市场:</p>
        <ul>
          <!-- <li
            v-for="(item, index) in marketsList"
            :key="index"
            :class="{ isActive: initMsg.initMarket.value == item.value }"
          >
            {{ item.lable }}
          </li> -->
          <li
            v-for="(item, index) in marketsList"
            :key="index"
            :class="{
              isActive: checkObj.value == item.value
            }"
            @click="changeMarket(item)"
          >
            {{ item.lable }}
          </li>
        </ul>
      </li>
      <li>
        <p>已选:</p>
        <ul>
          <li>
            <span>品种</span>
            <span>|</span>
            <span>{{ initMsg.medicineName }}</span>
          </li>
          <li>
            <span>产地</span>
            <span>|</span>
            <span>{{ initMsg.origin }}</span>
          </li>
          <li>
            <span>规格</span>
            <span>|</span>
            <span>{{ initMsg.specification }}</span>
          </li>
          <li>
            <span>市场</span>
            <span>|</span>
            <span>{{ checkObj.lable }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div style="margin:30px 0">
      <Title titleTxt="价格趋势" :btnShow="false"></Title>
    </div>
    <div class="marketPriceBox">
      <div class="left">
        <LineEchartsVue
          :result="lineData"
          :lineconfig="lineconfig"
          @echartsClick="aaa"
        ></LineEchartsVue>
      </div>
      <div class="right">
        <ul class="top">
          <li>
            <span>今日价格:</span>
            <span>{{ todayMsg[todayMsg.marketType] }}</span>
            <span>(元/千克)</span>
          </li>
          <li>
            <span>较上周:</span>
            <span>{{ todayMsg.weekRate }}%</span>
          </li>
          <li>
            <span>较上月:</span>
            <span>{{ todayMsg.monthRate }}%</span>
          </li>
          <li>
            <span>更新日期:</span>
            <span>{{ todayMsg.tjdate }}</span>
          </li>
          <li>
            <span>采集市场:</span>
            <span>{{ todayMsg.marketType }}</span>
          </li>
        </ul>
        <ul class="bot">
          <li>
            <span>市场价格比较</span>
          </li>
          <li>
            <span>市场</span>
            <span>价格(元/千克)</span>
          </li>
          <li>
            <span>亳州药市</span>
            <span>{{ todayMsg.bz }}</span>
          </li>
          <li>
            <span>安国药市</span>
            <span>{{ todayMsg.ag }}</span>
          </li>
          <li>
            <span>玉林药市</span>
            <span>{{ todayMsg.yl }}</span>
          </li>
          <li>
            <span>廉桥药市</span>
            <span>{{ todayMsg.lq }}</span>
          </li>
          <li>
            <span>普宁药市</span>
            <span>{{ todayMsg.pn }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <div style="margin:20px 0">
        <Title titleTxt="毫州药市" :btnShow="false"></Title>
      </div>
      <div class="tableBox">
        <TableVue ref="marketTable" :config="tableConfig"> </TableVue>
      </div>
    </div>
    <div>
      <div style="margin:20px 0">
        <Title titleTxt="相关资讯"></Title>
      </div>
      <div>
        <NewsListVue :records="records" @getNewsid="gotoNewsMsg"></NewsListVue>
      </div>
    </div>
  </div>
</template>

<script>
import TableVue from "@/components/TableData";
import NewsListVue from "@/components/NewsList";
import {
  reqmarketDrugList,
  reqgetOrigin,
  reqgetSpecification,
  reqgetMarkets,
  reqmarketPrice,
  reqgetLatestPrice
} from "@/api/market";
import { getMarketParams } from "@/util/storage";
export default {
  name: "marketMsg",
  components: {
    TableVue,
    NewsListVue
  },
  data() {
    return {
      // 初始化数据
      initMsg: {
        medicineId: "",
        origin: "",
        specification: "",
        marketCheck: {
          lable: "",
          value: ""
        }
      },
      drugMsg: "",
      checkObj: {
        lable: "",
        value: ""
      },
      todayMsg: {},
      chartsDateType: 1,
      /* 药材列表 */
      drugList: [],
      /* 产地列表 */
      originList: [],
      /* 规格列表 */
      specificationList: [],
      /* 市场列表 */
      marketsList: [],
      /* echarts */
      lineconfig: {
        title: "1",
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
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: false,
        pagePosition: "center",
        pageLayout: "prev,pager,next",
        tableHeight: "370",
        headColor: "#D8EFDA",
        url: "marketList",
        data: {
          page: 1,
          pageSize: 5
        },
        tHead: [
          { label: "品名", prop: "medicineName" },
          { label: "规格", prop: "specification" },
          { label: "产地", prop: "origin" },
          { label: "亳州", prop: "bz" },
          { label: "安国", prop: "ag" },
          { label: "成都", prop: "cd" },
          { label: "玉林", prop: "yl" },
          { label: "廉桥", prop: "lq" },
          { label: "普宁", prop: "pn" },
          {
            label: "走势图",
            type: "slot",
            slotName: "opration",
            width: "61"
          }
        ]
      },
      records: [
        {
          id: "001",
          imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
          title: "黄芪",
          context: "黄芪黄芪黄芪黄芪黄芪",
          releaseTime: "2020-08-20",
          labelList: [
            {
              labelName: "黄芪"
            }
          ]
        },
        {
          id: "001",
          imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
          title: "黄芪",
          context: "黄芪黄芪黄芪黄芪黄芪",
          releaseTime: "2020-08-20",
          labelList: [
            {
              labelName: "黄芪"
            }
          ]
        },
        {
          id: "001",
          imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
          title: "黄芪",
          context: "黄芪黄芪黄芪黄芪黄芪",
          releaseTime: "2020-08-20",
          labelList: [
            {
              labelName: "黄芪"
            }
          ]
        }
      ]
    };
  },
  created() {
    // this.initMsg = this.$route.query;
    console.log(this.$store.state.config.marketParams);
    console.log(getMarketParams());
    this.initMsg = JSON.parse(getMarketParams());
    /* 初始化数据 */
    this.initData(this.initMsg);
  },
  methods: {
    initData(e) {
      this.getMarketDrugs();
      this.getOrigin(e);
    },
    /* 获取存在市场价格的药材 */
    getMarketDrugs() {
      reqmarketDrugList().then(res => {
        console.log(res);
        this.drugList = res.data.data;
        this.drugMsg = this.initMsg.medicineId;
      });
    },
    /* 根据药材id获取产地查询条件 */
    getOrigin(e) {
      let originParams = {};
      originParams.medicineId = e.medicineId;
      reqgetOrigin(originParams).then(res => {
        // console.log(res);
        this.originList = res.data.data;
        if (!this.initMsg.origin) {
          this.initMsg.origin = this.originList[0].origin;
        }
        this.getSpecification(this.initMsg);
      });
    },
    /* 根据药材id、产地获取规格查询条件 */
    getSpecification(e) {
      let specificationParams = {};
      specificationParams.medicineId = e.medicineId;
      specificationParams.origin = e.origin;
      // console.log(specificationParams);
      reqgetSpecification(specificationParams).then(res => {
        // console.log(res);
        this.specificationList = res.data.data;
        if (!this.initMsg.specification) {
          this.initMsg.specification = this.specificationList[0].specification;
        }
        // console.log(this.specificationList);
        // console.log(this.initMsg);
        this.getMarkets(this.initMsg);
      });
    },
    /* 根据药材id、产地、规格获取对应的市场查询条件 */
    getMarkets(e) {
      let marketsParams = {};
      marketsParams.medicineId = e.medicineId;
      marketsParams.origin = e.origin;
      marketsParams.specification = e.specification;
      // console.log(marketsParams);
      reqgetMarkets(marketsParams).then(res => {
        // console.log(res);
        this.marketsList = res.data.data;
        if (!this.initMsg.initMarket) {
          this.checkObj = JSON.parse(JSON.stringify(this.marketsList[0]));
        } else {
          console.log(this.marketsList);
          let obj = this.marketsList.find(item => {
            return item.value == this.initMsg.initMarket;
          });
          this.checkObj = JSON.parse(JSON.stringify(obj));
        }
        // this.initMsg.initMarket = this.marketsList.filter(item => {
        //   return this.initMsg[item.value];
        // })[0];
        // console.log(this.initMsg.initMarket);
        this.initMsg.initMarket = JSON.parse(
          JSON.stringify(this.checkObj.value)
        );
        // console.log(this.initMsg);
        if (this.initMsg.initMarket) {
          this.getmarketPrice(this.initMsg);
          this.getLatestPrice(this.initMsg);
          this.$store.commit("loadmarketParams", this.initMsg);
        }
      });
    },
    changedrugName(e) {
      console.log(e);
    },
    // 切换药材
    searchDrug() {
      // console.log(this.drugMsg);
      this.initMsg = {};
      this.initMsg.medicineId = this.drugMsg;
      // this.initMsg.medicineName = this.drugMsg;
      this.initMsg.medicineName = this.drugList.find(item => {
        return item.id == this.drugMsg;
      }).medinceName;
      this.initData(this.initMsg);
    },
    // 切换地点
    changeOrigin(e) {
      // console.log(e);
      this.initMsg.origin = e;
      this.initMsg.specification = "";
      // console.log(this.initMsg);
      this.getOrigin(this.initMsg);
    },
    // 切换规格
    changespecification(e) {
      this.initMsg.specification = e;
      // console.log(this.initMsg.specification);
      this.getMarkets(this.initMsg);
    },
    // 切换市场
    changeMarket(e) {
      // this.initMsg.marketCheck = e;
      this.checkObj.lable = e.lable;
      this.checkObj.value = e.value;
      // console.log(this.checkObj);
      this.initMsg.initMarket = JSON.parse(JSON.stringify(this.checkObj.value));
      this.getmarketPrice(this.initMsg);
      this.getLatestPrice(this.initMsg);
      this.$store.commit("loadmarketParams", this.initMsg);
    },
    // 获取价格信息
    getmarketPrice(p) {
      let priceParams = {};
      priceParams.medicineId = p.medicineId;
      priceParams.origin = p.origin;
      priceParams.specification = p.specification;
      priceParams.marketType = p.initMarket;
      priceParams.tjType = this.chartsDateType;
      console.log(priceParams);
      reqmarketPrice(priceParams).then(res => {
        console.log(res);
        let echartsMsg = res.data.data[0];
        // this.lineconfig.title = res.data.data[0].medicineName;
        this.lineconfig.title = `${echartsMsg.medicineName}:${echartsMsg.specification}`;
        this.lineconfig.keys = [];
        let obj = {};
        obj.label = `${echartsMsg.medicineName}价格`;
        obj.value = "price";
        obj.type = "line";
        this.lineconfig.keys.push(obj);
        this.lineData = res.data.data;
      });
    },
    getLatestPrice(p) {
      let latestPriceParams = {};
      latestPriceParams.marketType = p.initMarket;
      latestPriceParams.medicineId = p.medicineId;
      latestPriceParams.origin = p.origin;
      latestPriceParams.specification = p.specification;
      reqgetLatestPrice(latestPriceParams).then(res => {
        console.log(res.data.data[0]);
        this.todayMsg = res.data.data[0];
        console.log(this.todayMsg);
      });
    },
    /* echarts点击事件 */
    aaa(e) {
      console.log(e);
    },
    /* 跳转新闻详情 */
    gotoNewsMsg(e) {
      alert(e);
    }
  }
  // watch: {
  //   initMsg: {
  //     handler(newVal) {
  //       console.log(newVal);
  //       this.$store.commit("loadmarketParams", newVal);
  //     },
  //     deep: true
  //     // immediate: true
  //   }
  // }
};
</script>
<style lang="scss">
.marketMsgBox {
  .headSearch {
    .el-input {
      .el-input__inner {
        height: 40px;
        background: rgba(241, 241, 241, 1);
        border: 1px solid rgba(241, 241, 241, 1);
        border-radius: 5px 0 0 5px;
        outline: 0;
      }
    }
  }
  .rightBox {
    .table {
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 45px !important;
      }
      .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 45px !important;
      }
    }
  }
}
</style>
<style scoped lang="scss">
.marketMsgBox {
  background: $boxbg;
  padding: $boxpadding;
  .checkBox {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid $maincolor;
    padding: $boxpadding;
    > li {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &:last-child {
        li {
          border: 1px solid $maincolor;
          border-radius: 3px;
          padding: 3px 5px;
          span {
            display: inline-block;
            color: $maincolor;
            &:nth-child(2) {
              padding: 0 5px;
            }
          }
        }
      }
      // border: 1px solid red;
      > p {
        width: 80px;
      }
      .headSearch {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-input {
          border-radius: 5px 0 0 5px;
          width: 200px;
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
          line-height: 0px;
        }
      }
      ul {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        .isActive {
          color: $maincolor;
        }
        li {
          padding: 10px 0;
          margin-right: 25px;
          // margin: 0 8px;
          // margin-bottom: 5px;
          &:hover {
            cursor: pointer;
            color: $maincolor;
          }
        }
      }
    }
  }
  .marketPriceBox {
    display: flex;
    justify-content: space-between;
    height: 582px;
    .left {
      width: 983px;
      border: 1px solid #cccccc;
    }
    .right {
      width: 350px;
      border: 1px solid #cccccc;
      padding: $boxpadding;
      ul {
        li {
          height: 43px;
          line-height: 43px;
          span {
            color: #666;
          }
          &:first-child {
            margin: 10px 0;
            span {
              font-size: 16px;
              font-weight: 600;
              &:first-child {
                color: $maincolor;
                width: 80px;
              }
              &:nth-child(2) {
                color: #f61f24;
                font-size: 18px;
              }
            }
          }
          span {
            display: inline-block;
            &:first-child {
              width: 80px;
            }
          }
        }
        &:last-child {
          li {
            span {
              &:first-child {
                width: 120px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
