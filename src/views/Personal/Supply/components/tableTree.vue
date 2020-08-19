<template>
  <div class="supplyTable">
    <TableVue :config="tableConfig" ref="applyTable" :tableRow.sync="tableRow">
      <template v-slot:supplyAmount="scope">
        {{ `${scope.data.supplyAmount}${scope.data.supplyUnitName}` }}
      </template>
      <template v-slot:price="scope">
        {{
          scope.data.price && scope.data.price
            ? `${scope.data.price}元/${scope.data.priceUnitName}`
            : scope.data.disclosePriceName
        }}
      </template>
      <template v-slot:opration="scope">
        <div class="btnBox">
          <el-button size="mini" @click="find(scope.data)">查看</el-button>
          <el-button
            size="mini"
            :disabled="scope.data.statusName === '审核中'"
            @click="handleEdit(scope.data)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            :disabled="scope.data.statusName !== '供应中'"
            @click="handerUnder(scope.data)"
            >下架</el-button
          >
          <el-button size="mini" @click="handlerDel(scope.data)"
            >删除</el-button
          >
        </div>
      </template>
      <template v-slot:btnBox>
        <el-row class="bottomBtn">
          <el-col :span="15">
            <el-button class="alldel" @click="handleManyUnder"
              >批量下架</el-button
            >
            <el-button type="danger" @click="handleManydel">批量删除</el-button>
          </el-col>
          <el-col :push="5" :span="2">
            <el-button type="success" @click="addsupply">发布供应</el-button>
          </el-col>
        </el-row>
      </template>
    </TableVue>

    <AddDialogVue
      :dialogFlag.sync="dialogFlag"
      :dialogData="dialogData"
      :isFind.sync="isFind"
      @refresData="resetTable"
    ></AddDialogVue>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
import AddDialogVue from "./addDialog";
import { reqdelsupply, requndersupply } from "@/api/userInfo";
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
        // alert(newVal);
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
      dialogData: {},
      // 是否查看
      isFind: false,
      delId: "",
      // table选择的数据
      tableRow: {},
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
        slotBox: true,
        slotName: "btnBox",
        data: {
          page: 1,
          pageSize: 10,
          status: ""
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
    /* 刷新表格数据 */
    resetTable() {
      this.$refs.applyTable.requestData();
    },
    /* 跳转发布供应 */
    addsupply() {
      this.$router.push({
        path: "/personal/supply/addsupply"
      });
    },
    /* 删除供应 */
    handlerDel(e) {
      this.delId = e.id;
      this.confirm({
        tip: "确认删除",
        content: "确认删除此条供应信息？",
        status: "供应信息删除成功",
        fn: this.delApply
      });
    },
    delApply() {
      let ids = [];
      console.log(this.delId);
      ids.push(this.delId);
      reqdelsupply(ids).then(res => {
        console.log(res);
        this.resetTable();
      });
    },

    /* 批量删除 */
    handleManydel() {
      let id = this.tableRow.idItem;
      if (!id || id.length === 0) {
        this.$message({
          message: "请选择需要删除的供应信息",
          type: "warning"
        });
        return false;
      }
      this.confirm({
        tip: "确认删除",
        content: "确认删除选中供应信息？",
        status: "选中供应信息删除成功",
        fn: this.manydelApply
      });
    },

    manydelApply() {
      let ids = this.tableRow.idItem;
      reqdelsupply(ids).then(res => {
        console.log(res);
        this.resetTable();
      });
    },

    /* 下架供应 */
    handerUnder(e) {
      this.delId = e.id;
      this.confirm({
        tip: "确认下架",
        content: "确认下架此条供应信息？",
        status: "供应信息下架成功",
        fn: this.underApply
      });
    },
    underApply() {
      let ids = [];
      console.log(this.delId);
      ids.push(this.delId);
      requndersupply(ids).then(res => {
        console.log(res);
        this.resetTable();
      });
    },
    /* 批量下架 */
    handleManyUnder() {
      let id = this.tableRow.idItem;
      if (!id || id.length === 0) {
        this.$message({
          message: "请选择需要下架的供应信息",
          type: "warning"
        });
        return false;
      }
      this.confirm({
        tip: "确认下架",
        content: "确认下架选中供应信息？",
        status: "选中供应信息下架成功",
        fn: this.manyunderApply
      });
    },
    manyunderApply() {
      let ids = this.tableRow.idItem;
      reqdelsupply(ids).then(res => {
        console.log(res);
        this.$refs.applyTable.requestData();
      });
    },
    /* 编辑我的供应 */
    handleEdit(e) {
      // console.log(e);
      if (e.statusName === "供应中") {
        this.dialogFlag = true;
        this.dialogData = e;
      } else if (e.statusName === "已下架" || e.statusName === "审核未通过") {
        this.$router.push({
          path: "/personal/supply/addsupply",
          query: e
        });
      }
    },
    find(e) {
      this.dialogFlag = true;
      this.dialogData = e;
      this.isFind = true;
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
      &.is-disabled {
        color: #c0c4cc !important;
        background-image: none !important;
        background-color: #ebeef5 !important;
        border-color: #ebeef5 !important;
      }
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
    margin: 30px 0;
    .alldel {
      background: $sencondcolor;
      border: 1px solid $sencondcolor;
      color: #fff;
    }
    .el-button {
      width: 171px;
      height: 34px;
      line-height: 0;
      border-radius: 5px;
    }
  }
}
</style>
