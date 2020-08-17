<template>
  <div class="drugMsgBox lvcontainer">
    <div class="leftBox">
      <Title
        titleTxt="详情页"
        btnMsg="查看知识图谱"
        @titleClick="gotodrugPic"
      ></Title>
      <div class="msgBox">
        <div class="drugNameBox">
          <div>
            <img src="@/assets/images/test/ddyc/黄芪.png" alt="" />
          </div>
          <ul>
            <li>
              <span>品名:</span>
              <span>黄芪</span>
            </li>
            <li>
              <span>别名:</span>
              <span>棉芪，黄耆，独椹，蜀脂，百本，百药棉，黄参，血参</span>
            </li>
            <li>
              <span>产新时间:</span>
              <span>六月、七月</span>
            </li>
            <li>
              <span>产区分布:</span>
              <span>华北、东北、内蒙古和西北，主产于山西、黑龙江</span>
            </li>
            <li>
              <span>种植基地:</span>
              <span>内蒙古化德县某某种植基地、内蒙古化德县某某种植基地</span>
            </li>
          </ul>
        </div>
        <div class="drugPriceBox">
          <DrugPriceVue></DrugPriceVue>
        </div>
        <div class="drugNewsBox">
          <DrugNewsVue></DrugNewsVue>
        </div>
      </div>
    </div>
    <div class="rightBox">
      <div class="topBox">
        <Title titleTxt="供应" :btnShow="false"></Title>
        <div class="tableBox">
          <TableVue :config="tableConfig">
            <template v-slot:opration="slotData">
              <el-button size="mini" @click="aa(slotData)">查看</el-button>
            </template>
          </TableVue>
        </div>
      </div>
      <div class="botBox">
        <Title titleTxt="求购" :btnShow="false"></Title>
        <div class="tableBox">
          <TableVue :config="tableConfig">
            <template v-slot:opration="slotData">
              <el-button size="mini" @click="aa(slotData)">查看</el-button>
            </template>
          </TableVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DrugPriceVue from "./drugMsgCom/DrugPrice";
import DrugNewsVue from "./drugMsgCom/DrugNews";
import TableVue from "@/components/TableData";
export default {
  name: "drugMsg",
  components: {
    DrugPriceVue,
    DrugNewsVue,
    TableVue
  },
  data() {
    return {
      msg: "",
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
        tHead: [
          { label: "品名", prop: "name", width: "40" },
          { label: "规格", prop: "type", width: "40" },
          { label: "供应量", prop: "num", width: "60" },
          { label: "产地", prop: "adress", width: "90" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration"
          }
        ]
      }
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.getdrugMsg(this.$route.query.id);
  },
  methods: {
    // 获取id
    getdrugMsg(e) {
      this.msg = e;
    },
    // 跳转至知识图谱
    gotodrugPic() {
      // alert(123);
      this.$router.push({
        path: "/drug/drugMapping",
        query: {
          id: this.msg
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.drugMsgBox {
  display: flex;
  justify-content: space-between;
  .leftBox {
    width: 924px;
    // height: 1234px;
    padding: $boxpadding;
    background: $boxbg;
    .msgBox {
      .drugNameBox {
        border-top: 1px solid rgba(0, 0, 0, 0.11);
        margin-top: 14px;
        padding: 18px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 262px;
          height: 179px;
        }
        ul {
          margin-left: 25px;
          li {
            height: 25px;
            line-height: 25px;
            span {
              display: inline-block;
              color: #666666;
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
      .drugPriceBox {
        // border: 1px solid red;
      }
      .drugNewsBox {
      }
    }
  }
  .rightBox {
    width: 448px;
    .topBox {
      padding: $boxpadding;
      background: $boxbg;
      height: 382px;
      margin-bottom: 32px;
      .tableBox {
        height: 304px;
        margin-top: 20px;
        overflow: hidden;
      }
    }
    .botBox {
      padding: $boxpadding;
      background: $boxbg;
      height: 382px;
      .tableBox {
        height: 304px;
        margin-top: 20px;
        overflow: hidden;
      }
    }
  }
}
</style>
