<template>
  <div class="tableBox">
    <div class="selBox">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间"
      >
      </el-date-picker>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="success">筛选</el-button>
    </div>
    <div>
      <TableVue :config="tableConfig">
        <!-- <template v-slot:image="slotData">
            <el-avatar :src="slotData.data.photo"></el-avatar>
          </template>
          <template v-slot:status="slotData">
            <el-switch
              v-model="slotData.data.status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template> -->
        <template v-slot:opration="slotData">
          <i class="el-icon-s-data iconName"></i>
          <span v-if="false">{{ slotData }}</span>
          <!-- <el-button type="primary" icon="el-icon-s-data"></el-button> -->
        </template>
      </TableVue>
    </div>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
export default {
  name: "warningtableBox",
  components: {
    TableVue
  },
  data() {
    return {
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
        headTxtColor: "#3AB54C",
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
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      value1: ""
    };
  }
};
</script>
<style lang="scss">
.tableBox {
  .selBox {
    .el-select {
      width: 130px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 170px;
    }
    .el-input__inner {
      background: #ffffff;
      border: 1px solid $maincolor;
    }
  }
}
</style>
<style lang="scss" scoped>
.tableBox {
  background: $boxbg;
  width: 983px;
  height: 1185px;
  padding: $boxpadding;
  .selBox {
    // border: 1px solid red;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button--success {
      width: 120px;
      font-size: 16px;
      // height: 35px;
    }
  }
}
</style>
