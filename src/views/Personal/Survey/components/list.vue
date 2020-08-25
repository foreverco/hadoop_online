<template>
  <div class="surverList">
    <div class="surveyTop">
      <div class="typeBox">
        用户身份:
        <span>种植户</span>
      </div>
      <div class="btnBox">
        <el-button type="success" icon="el-icon-plus" @click="addSurvey"
          >新建</el-button
        >
        <el-button type="success">一键导入</el-button>
      </div>
    </div>
    <div class="tableBox">
      <TableVue :config="tableConfig" ref="addressTable">
        <template v-slot:plantArea="scope">
          {{ `${scope.data.plantArea}亩` }}
        </template>
        <template v-slot:yieldMu="scope">
          {{ `${scope.data.yieldMu}公斤/亩` }}
        </template>
        <template v-slot:area="scope">
          {{ `${scope.data.countyName}/${scope.data.address}` }}
        </template>
        <template v-slot:opration="scope">
          <div class="btnBox">
            <span class="mainBtn" @click="editSurvey(scope.data)">编辑</span>
            <span class="mainBtn" @click="handelDelSurvey(scope.data)"
              >删除</span
            >
          </div>
        </template>
      </TableVue>
    </div>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
import { reqdelsurvery } from "@/api/userInfo";
export default {
  name: "LIST",
  components: {
    TableVue
  },
  data() {
    return {
      delId: "",
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: true,
        tableHeight: "370",
        headColor: "#3AB54C10",
        headTxtColor: "#3AB54C",
        url: "surveyList",
        pagination: true,
        pagePosition: "center",
        tooltip: true,
        data: {
          page: 1,
          pageSize: 10
        },
        tHead: [
          { label: "药材名称", prop: "medicineName", width: "70" },
          {
            label: "种植面积",
            type: "slot",
            slotName: "plantArea",
            width: "80"
          },
          { label: "种植时间", prop: "plantDate" },
          { label: "采收时间", prop: "harvestDate" },
          { label: "预估亩产", type: "slot", slotName: "yieldMu" },
          { label: "地理位置", type: "slot", slotName: "area", width: "140" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration",
            width: "140"
          }
        ]
      }
    };
  },
  methods: {
    addSurvey() {
      this.$router.push({ path: "/personal/survey/add" });
    },
    handelDelSurvey(e) {
      this.delId = e.id;
      this.confirm({
        tip: "确认删除",
        content: "确认删除此条调查信息？",
        status: "调查信息删除成功",
        fn: this.delSurvey
      });
    },
    delSurvey() {
      let ids = [];
      ids.push(this.delId);
      reqdelsurvery(ids).then(res => {
        console.log(res);
      });
    },
    /* 编辑用户调查 */
    editSurvey(e) {
      console.log(e);
      this.$router.push({
        path: "/personal/survey/add",
        query: e
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.surverList {
  .surveyTop {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .typeBox {
      span {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: $maincolor;
      }
    }
    .btnBox {
      .el-button {
        width: 137px;
      }
    }
  }
  .tableBox {
    .btnBox {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .mainBtn {
        display: inline-block;
        width: 75px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        border-radius: 3px;
        border: 1px solid #3ab54c;
        color: #3ab54c;
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          border: 1px solid #ff0f0f;
          color: #ff0f0f;
        }
      }
    }
  }
}
</style>
