<template>
  <div>
    <el-table
      :data="table_data"
      :border="table_config.hadBorder"
      size="mini"
      :height="table_config.tableHeight"
      style="width: 100%"
      :header-cell-style="{
        background: table_config.headColor,
        color: 'black'
      }"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="table_config.checkBox"
        header-align="center"
      ></el-table-column>
      <template v-for="item in table_config.tHead">
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'slot'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TableData",
  data() {
    return {
      table_config: {
        tHead: [],
        checkBox: true,
        hadBorder: true,
        tableHeight: false,
        headColor: "#000000"
      },
      table_data: [
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区金沙江路"
        }
        // {
        //   date: "2016-05-02",
        //   type: 1,
        //   status: 1,
        //   name: "王小虎",
        //   photo:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595409508794&di=0a56dcc883332ba5ae12e4962b06af2c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6e8f56b2543cce8bffa35b22d03684fae76a1b2c56c32-COdswi_fw658",
        //   address: "上海市普陀区金沙江路 1518 弄"
        // },
      ]
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    config: {
      handler() {
        this.initConfig();
      },
      immediate: true
    }
  },
  methods: {
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
    }
  }
};
</script>
<style lang="scss"></style>
