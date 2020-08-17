<template>
  <div class="mainAdress">
    <div class="addBox">
      <el-button type="success" icon="el-icon-plus" @click="addAdress"
        >添加地址</el-button
      >
      <p>最多添加10条地址信息</p>
    </div>
    <TableVue :config="tableConfig" ref="addressTable">
      <template v-slot:isdefalult="scope">
        {{ scope.data.isDefault === 1 ? "是" : "否" }}
      </template>
      <template v-slot:opration="scope">
        <div class="btnBox">
          <span class="mainBtn" @click="handleDefault(scope.data)">
            {{ scope.data.isDefault === 1 ? "取消默认" : "设为默认" }}
          </span>
          <span class="mainBtn" @click="edit(scope.data)">编辑</span>
          <span class="mainBtn" @click="handelAdress(scope.data)">删除</span>
        </div>
      </template>
    </TableVue>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
import { reqdelAdress, reqdefaultAdress } from "@/api/adress";
export default {
  name: "MainAdress",
  components: {
    TableVue
  },
  data() {
    return {
      // 删除地址id
      delId: "",
      //默认收货地址
      defaultId: "",
      defaultNum: -1,
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: true,
        tableHeight: "370",
        headColor: "#3AB54C10",
        headTxtColor: "#3AB54C",
        url: "addressList",
        pagination: false,
        tooltip: true,
        data: {
          page: 1,
          pageSize: 10
        },
        tHead: [
          { label: "收货人", prop: "recipientName" },
          { label: "手机", prop: "recipientTel" },
          { label: "地址", prop: "address" },
          { label: "邮编", prop: "postcode" },
          { label: "默认", type: "slot", slotName: "isdefalult" },
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
    },
    addAdress() {
      this.$router.push({
        path: "/personal/adress/add"
      });
    },
    // 编辑收货地址
    edit(rowData) {
      console.log(rowData);
      this.$router.push({
        path: "/personal/adress/add",
        query: rowData
      });
    },
    // 删除收货地址
    handelAdress(e) {
      this.delId = e.id;
      this.confirm({
        tip: "确认删除",
        content: "确认删除此条出货地址信息？",
        status: "地址删除成功",
        fn: this.delAdress
      });
    },
    delAdress() {
      let ids = [];
      ids.push(this.delId);
      reqdelAdress(ids).then(res => {
        console.log(res);
        this.$refs.addressTable.requestData();
      });
    },
    // 设置默认地址
    handleDefault(e) {
      console.log(e);
      this.defaultId = e.id;
      this.defaultNum = e.isDefault;
      this.confirm({
        tip: "确认修改",
        content: "确认修改默认出货地址？",
        status: "默认出货地址修改成功",
        fn: this.DefaultFun
      });
    },
    DefaultFun() {
      let defaultParams = {};
      defaultParams.id = this.defaultId;
      console.log(this.defaultNum);
      this.defaultNum == 1
        ? (defaultParams.isDefault = 0)
        : (defaultParams.isDefault = 1);
      console.log(defaultParams.isDefault);
      reqdefaultAdress(defaultParams)
        .then(res => {
          console.log(res);
          this.$refs.addressTable.requestData();
        })
        .catch(error => {
          console.log(error);
        });
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
