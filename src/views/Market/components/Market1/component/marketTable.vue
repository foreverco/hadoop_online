<template>
  <div class="lvcontainer marketBox">
    <div class="leftBox">
      <div class="checkBox">
        <div class="zmBox">
          <p>品种:</p>
          <ul>
            <li
              v-for="(item, index) in zmList"
              :key="index"
              @click="getOneZm(item.name)"
              :class="{ isactive: item.name == oneZm }"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="zmBox" v-if="oneZm">
          <p></p>
          <ul>
            <li
              v-for="(item, index) in zmList"
              :key="index"
              @click="getTwoZm(item.name)"
              :class="{ isactive: oneZm + item.name == twoZm }"
            >
              {{ oneZm + item.name }}
            </li>
          </ul>
        </div>
        <div class="zmBox" v-if="oneZm || twoZm">
          <p></p>
          <ul>
            <template v-if="zmDrugList && zmDrugList.length > 0">
              <li
                v-for="(item, index) in zmDrugList"
                :key="index"
                @click="checkDrug(item)"
                :class="{ isactive: checkName == item.medinceName }"
              >
                {{ item.medinceName }}
              </li>
            </template>
            <template v-else>
              <li>
                暂无此类药材
              </li>
            </template>
          </ul>
        </div>

        <div class="btnBox">
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
        </div>
        <div class="isselBox">
          <p>已选:</p>
          <ul>
            <li v-if="areaactive">
              <span>品种</span>
              <span>|</span>
              <span>{{ checkName }}</span>
              <span>|</span>
              <i class="el-icon-close" @click="areaactive"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="tableBox">
        <TableVue ref="marketTable" :config="tableConfig">
          <template v-slot:opration="slotData">
            <i
              class="el-icon-s-data iconName tableIcon"
              @click="gotoMarketMsg(slotData.data)"
            ></i>
            <span v-if="false">{{ slotData }}</span>
          </template>
        </TableVue>
      </div>
    </div>
    <div class="rightBox">
      <div class="topBox">
        <Title
          titleTxt="综合100月涨幅榜（蒙中道地药材榜）"
          :btnShow="false"
        ></Title>
        <div class="table">
          <TableVue :config="uptableConfig"> </TableVue>
        </div>
      </div>
      <div class="midBox">
        <Title
          titleTxt="综合100月跌幅榜（蒙中道地药材榜）"
          :btnShow="false"
        ></Title>
        <div class="table">
          <TableVue :config="lowtableConfig">
            <template v-slot:opration="slotData">
              <i class="el-icon-s-data iconName"></i>
              <span v-if="false">{{ slotData }}</span>
            </template>
          </TableVue>
        </div>
      </div>
      <div class="botBox">
        <Title titleTxt="市场咨询" :btnShow="false"></Title>
        <ul>
          <li>毫州市场黄芪行情有所反弹</li>
          <li>内蒙古地道药材价格平稳，持续销量中</li>
          <li>安国市场熟地黄货源批量走动 行情平稳</li>
          <li>安国市场蛇床子货源按需走销中</li>
          <li>安国市场野菊花货源正常购销 行情保持平稳</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TableVue from "@/components/TableData";
import { reqmarketDrugList } from "@/api/market";
export default {
  name: "MarketTable",
  components: {
    TableVue
  },
  // computed: {
  //   checkName() {
  //     this.drugList.filter(item => {
  //       return item.id == this.drugMsg;
  //     })[0];
  //   }
  // },
  data() {
    return {
      areaActive: true,
      drugList: [],
      drugMsg: "",
      checkName: "",
      zmList: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
        { name: "H" },
        { name: "I" },
        { name: "J" },
        { name: "K" },
        { name: "L" },
        { name: "M" },
        { name: "N" },
        { name: "O" },
        { name: "P" },
        { name: "Q" },
        { name: "R" },
        { name: "S" },
        { name: "T" },
        { name: "U" },
        { name: "V" },
        { name: "W" },
        { name: "X" },
        { name: "Y" },
        { name: "Z" }
      ],
      oneZm: "",
      twoZm: "",
      zmDrugList: [],
      areaactive: false,
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: true,
        pagePosition: "center",
        pageLayout: "prev,pager,next",
        tableHeight: "370",
        headColor: "#D8EFDA",
        url: "marketList",
        data: {
          page: 1,
          pageSize: 10
        },
        tHead: [
          { label: "品名", prop: "medicineName", width: "55" },
          { label: "规格", prop: "specification" },
          { label: "产地", prop: "origin", width: "60" },
          { label: "亳州", prop: "bz", width: "61" },
          { label: "安国", prop: "ag", width: "61" },
          { label: "成都", prop: "cd", width: "61" },
          { label: "玉林", prop: "yl", width: "61" },
          { label: "廉桥", prop: "lq", width: "61" },
          { label: "普宁", prop: "pn", width: "61" },
          {
            label: "走势图",
            type: "slot",
            slotName: "opration",
            width: "61"
          }
        ]
      },
      uptableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
        url: "marketRankList",
        data: {
          type: "1"
        },
        tHead: [
          { label: "品名", prop: "medicineName", width: "55" },
          // { label: "规格", prop: "specification" },
          { label: "产地", prop: "origin", width: "55" },
          { label: "市场", prop: "marketName", width: "61" },
          { label: "价格", prop: "price", width: "61" },
          { label: "涨跌幅", prop: "amplitude", width: "61" }
        ]
      },
      lowtableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
        url: "marketRankList",
        data: {
          type: "0"
        },
        tHead: [
          { label: "品名", prop: "medicineName", width: "55" },
          // { label: "规格", prop: "specification" },
          { label: "产地", prop: "origin", width: "55" },
          { label: "市场", prop: "marketName", width: "55" },
          { label: "价格", prop: "price", width: "61" },
          { label: "涨跌幅", prop: "amplitude" }
        ]
      }
    };
  },
  created() {
    this.getMarketDrugs();
  },
  methods: {
    /* 获取存在市场价格的药材 */
    getMarketDrugs() {
      reqmarketDrugList().then(res => {
        console.log(res);
        this.drugList = res.data.data;
      });
    },
    getzmDrugList(p) {
      let drugZm = {};
      if (p) {
        drugZm.letter = p;
      }
      reqmarketDrugList(drugZm).then(res => {
        console.log(res);
        this.zmDrugList = res.data.data;
      });
    },
    changedrugName(e) {
      console.log(e);
    },

    getOneZm(e) {
      this.twoZm = "";
      this.oneZm = e;
      this.getzmDrugList(this.oneZm);
    },
    getTwoZm(e) {
      this.twoZm = this.oneZm + e;
      console.log(this.twoZm);
      this.getzmDrugList(this.twoZm);
    },
    checkDrug(e) {
      console.log(e);
      this.checkName = e.medinceName;
      this.areaactive = true;
      let marketParams = {};
      marketParams.medicineId = e.id;
      this.$refs.marketTable.requestData(marketParams);
    },
    searchDrug() {
      console.log(this.drugMsg);
      this.oneZm = "";
      this.twoZm = "";
      let marketParams = {};
      marketParams.medicineId = this.drugMsg;
      this.areaactive = true;
      this.checkName = this.drugList.find(item => {
        return item.id == this.drugMsg;
      }).medinceName;
      this.$refs.marketTable.requestData(marketParams);
    },
    /* 跳转详情页 */
    gotoMarketMsg(e) {
      console.log(e);
      this.$store.commit("loadmarketParams", e);
      this.$router.push({
        path: "/Market1/msg"
        // query: e
      });
    },
    changeareaactive(e) {
      this.areaactive = e;
    }
  }
};
</script>
<style lang="scss">
.marketBox {
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
<style lang="scss" scoped>
.marketBox {
  display: flex;
  justify-content: space-between;
  .leftBox {
    background: $boxbg;
    padding: $boxpadding;
    width: 924px;
    .checkBox {
      border: 1px solid rgba(200, 200, 200, 1);
      border-top: 5px solid rgba(57, 181, 75, 1);
      padding: 20px;
      .isactive {
        color: $maincolor;
      }
      .zmBox {
        display: flex;
        justify-content: flex-start;
        margin: 10px 0;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.11);

        p {
          width: 65px !important;
        }
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            margin: 0 8px;
            margin-bottom: 5px;
            &:hover {
              cursor: pointer;
              color: $maincolor;
            }
          }
        }
      }
      .h40 {
        height: 40px;
        transition: ease-in-out 1.5s;
      }

      .btnBox {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 25px;
        p {
          width: 65px;
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
      }
      .isselBox {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        p {
          width: 65px;
        }
        ul {
          li {
            border: 1px solid $maincolor;
            // padding: 2px 5px;
            height: 25px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            span {
              margin: 0 5px;
              color: $maincolor;
              font-size: 14px;
            }
            i {
              font-size: 14px;
              margin-right: 3px;
              margin-top: 3px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .tableBox {
      margin-top: 30px;
      .tableIcon {
        color: $sencondcolor;
        font-size: 15px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .rightBox {
    .topBox {
      background: $boxbg;
      padding: $boxpadding;
      width: 450px;
      height: 340px;
      .table {
        margin-top: 20px;
        height: 260px;
        overflow: hidden;
        .el-table__header tr,
        .el-table__header th {
          padding: 0;
          height: 20px !important;
        }
        .el-table__body tr,
        .el-table__body td {
          padding: 0;
          height: 20px !important;
        }
      }
    }
    .midBox {
      background: $boxbg;
      padding: $boxpadding;
      width: 450px;
      height: 340px;
      margin: 30px 0;
      .table {
        margin-top: 20px;
        height: 260px;
        overflow: hidden;
      }
    }
    .botBox {
      background: $boxbg;
      padding: $boxpadding;
      width: 450px;
      // height: 340px;
      ul {
        margin-top: 20px;
        li {
          height: 40px;
        }
      }
    }
  }
}
</style>
