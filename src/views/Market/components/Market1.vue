<template>
  <div class="lvcontainer marketBox">
    <div class="leftBox">
      <div class="checkBox">
        <div class="zmBox">
          <p>品种:</p>
          <ul>
            <li v-for="(item, index) in zmList" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div class="areaBox" :class="{h40:areaActive}">
          <p>产地:</p>
          <ul>
            <li
              v-for="(item, index) in areaList"
              :key="index"
              :class="{isactive:areaactive==index}"
              @click="changeareaactive(index)"
            >{{item.area}}</li>
          </ul>
          <i
            :class="areaActive?'el-icon-caret-bottom':'el-icon-caret-top'"
            @click="areaActive=!areaActive"
          ></i>
        </div>
        <div class="btnBox">
          <p>搜索:</p>
          <div class="headSearch">
            <el-input v-model="drugName" placeholder="请输入关键字"></el-input>
            <el-button type="success">搜索</el-button>
          </div>
        </div>
        <div class="isselBox">
          <p>已选:</p>
          <ul>
            <li v-if="areaactive!=-1">
              <span>产地</span>
              <span>|</span>
              <span>{{areaCheck}}</span>
              <span>|</span>
              <i class="el-icon-close" @click="areaactive = -1"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="tableBox">
        <TableVue :config="tableConfig">
          <template v-slot:opration="slotData">
            <i class="el-icon-s-data iconName"></i>
            <span v-if="false">{{ slotData }}</span>
          </template>
        </TableVue>
      </div>
    </div>
    <div class="rightBox">
      <div class="topBox">
        <Title titleTxt="综合100月涨幅榜（蒙中道地药材榜）" :btnShow="false"></Title>
        <div class="table">
          <TableVue :config="tableConfig">
            <template v-slot:opration="slotData">
              <i class="el-icon-s-data iconName"></i>
              <span v-if="false">{{ slotData }}</span>
            </template>
          </TableVue>
        </div>
      </div>
      <div class="midBox">
        <Title titleTxt="综合100月跌幅榜（蒙中道地药材榜）" :btnShow="false"></Title>
        <div class="table">
          <TableVue :config="tableConfig">
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
export default {
  name: "Market1",
  components: {
    TableVue
  },
  computed: {
    areaCheck() {
      return this.areaList[this.areaactive].area;
    }
  },
  data() {
    return {
      areaActive: true,
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
      areaactive: -1,
      areaList: [
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" },
        { area: "内蒙古省" },
        { area: "辽宁省" },
        { area: "江苏省" },
        { area: "浙江省" },
        { area: "安徽省" },
        { area: "河北省" },
        { area: "河南省" },
        { area: "湖北省" },
        { area: "湖南省" },
        { area: "广东省" },
        { area: "广西省" },
        { area: "山东省" }
      ],
      drugName: "",
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: true,
        pagePosition: "center",
        pageLayout: "prev,pager,next",
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
        ]
      }
    };
  },
  methods: {
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
        height: 30px;
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
        margin-bottom: 25px;
        p {
          width: 45px !important;
        }
        ul {
          display: flex;
          justify-content: flex-start;
          li {
            margin: 0 10px;
          }
        }
      }
      .h40 {
        height: 40px;
        transition: ease-in-out 1.5s;
      }
      .areaBox {
        display: flex;
        justify-content: flex-start;
        // align-items: center;
        margin-bottom: 25px;
        overflow: hidden;
        position: relative;
        p {
          width: 80px !important;
          height: 40px;
          line-height: 40px;
          // border: 1px solid red;
        }
        i {
          height: 25px;
          line-height: 25px;
          width: 25px;
          position: absolute;
          top: 8px;
          // transform: translateY(-50%);
          right: 0;
          border: 1px solid rgba(186, 186, 186, 1);
          color: rgba(186, 186, 186, 1);
          text-align: center;
          &:hover {
            cursor: pointer;
          }
        }
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
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
      }
      .btnBox {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 25px;
        p {
          width: 45px;
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
            height: 30px;
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
          width: 45px;
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
