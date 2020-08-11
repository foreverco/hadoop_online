<template>
  <div class="mainAdress">
    <div class="addBox">
      <el-button type="success" icon="el-icon-plus" @click="addSurvey"
        >添加地址</el-button
      >
      <p>最多添加10条地址信息</p>
    </div>
    <TableVue :config="tableConfig">
      <template v-slot:opration="scope">
        <div class="btnBox">
          <span class="mainBtn" @click="edit(scope.data)">设为默认</span>
          <span class="mainBtn" @click="edit(scope.data)">编辑</span>
          <span class="mainBtn" @click="del(scope.data)">删除</span>
        </div>
      </template>
    </TableVue>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
export default {
  name: "MainAdress",
  components: {
    TableVue
  },
  data() {
    return {
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: true,
        tableHeight: "370",
        headColor: "#3AB54C10",
        headTxtColor: "#3AB54C",
        url: "newsList",
        pagination: false,
        tooltip: true,
        data: {
          page: 1,
          pageSize: 1
        },
        tHead: [
          { label: "收货人", prop: "title" },
          { label: "手机", prop: "releaseTime" },
          { label: "地址", prop: "context" },
          { label: "邮编", prop: "policyCategory" },
          { label: "默认", prop: "policyCategory1" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration",
            width: "200"
          }
        ]
      }
    };
  },
  mounted() {
    // this.getPolicyNews();
  },
  methods: {
    find(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.mainAdress {
  .addBox {
    margin-top: 20px;
    .el-button {
      width: 140px;
    }
    p {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin: 11px 5px;
    }
  }
  .btnBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .mainBtn {
      display: inline-block;
      width: 75px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
      }
      &:first-child {
        border: 1px solid #ffa02f;
        color: #ffa02f;
      }
      &:nth-child(2) {
        border: 1px solid #3ab54c;
        color: #3ab54c;
      }
      &:last-child {
        border: 1px solid #ff0f0f;
        color: #ff0f0f;
      }
    }
  }
}
</style>
