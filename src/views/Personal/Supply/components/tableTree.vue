<template>
  <div class="supplyTable">
    <TableVue :config="tableConfig" ref="applyTable">
      <template v-slot:supplyAmount="scope">
        {{ scope.data.supplyAmount }}
        {{ scope.data.supplyUnit }}
      </template>
      <template v-slot:price="scope">
        {{ `${scope.data.price}元${scope.data.priceUnitName}` }}
      </template>
      <template v-slot:opration="scope">
        <div class="btnBox">
          <el-button size="mini" @click="find(scope)">查看</el-button>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">下架</el-button>
          <el-button size="mini">删除</el-button>
        </div>
      </template>
    </TableVue>
    <el-row class="bottomBtn">
      <el-col :push="2" :span="15">
        <el-button>批量下架</el-button>
        <el-button type="danger">批量删除</el-button>
      </el-col>
      <el-col :push="5" :span="2">
        <el-button type="success" @click="addsupply">发布供应</el-button>
      </el-col>
    </el-row>
    <AddDialogVue :dialogFlag.sync="dialogFlag"></AddDialogVue>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
import AddDialogVue from "./addDialog";
export default {
  name: "Supply",
  components: {
    TableVue,
    AddDialogVue
  },
  computed: {
    status() {
      return this.$store.state.config.status;
    }
  },
  watch: {
    status: {
      handler(newVal) {
        alert(newVal);
        this.tableConfig.data.status = newVal;
        this.$refs.applyTable.requestData(this.tableConfig.data);
        // setApplyForm(this.formData);
      },
      deep: true
    }
  },
  data() {
    return {
      dialogFlag: false,
      // 表格配置
      tableConfig: {
        checkBox: true,
        hadBorder: true,
        tableHeight: "370",
        headColor: "#3AB54C10",
        headTxtColor: "#3AB54C",
        url: "supplyList",
        pagination: true,
        pagePosition: "center",
        tooltip: true,
        data: {
          page: 1,
          pageSize: 10,
          status: 0
        },
        tHead: [
          { label: "品名", prop: "medinceName" },
          { label: "规格", prop: "specificationName" },
          // { label: "供应量", prop: "supplyAmount" },
          { label: "供应量", type: "slot", slotName: "supplyAmount" },
          { label: "售价", type: "slot", slotName: "price" },
          { label: "状态", prop: "statusName" },
          { label: "有效期", prop: "yxq" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration",
            width: "150"
          }
        ]
      }
    };
  },
  methods: {
    addsupply() {
      this.$router.push({
        path: "/personal/supply/addsupply"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.supplyTable {
  .btnBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .el-button {
      margin: 5px;
      border: 1px solid $maincolor;
      color: $maincolor;
      &:nth-child(3) {
        border: 1px solid #f9911d;
        color: #f9911d;
      }
      &:last-child {
        border: 1px solid #ff0f0f;
        color: #ff0f0f;
      }
    }
  }
  .bottomBtn {
    margin-top: 10px;
    .el-button {
      width: 171px;
      height: 34px;
      line-height: 0;
      border-radius: 5px;
    }
  }
}
</style>
