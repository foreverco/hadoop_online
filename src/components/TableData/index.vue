<template>
  <div>
    <el-table
      :data="table_data"
      :border="table_config.hadBorder"
      v-loading="loadingTable"
      element-loading-text="加载中"
      size="mini"
      style="width: 100%"
      header-row-class-name="tableHead"
      @selection-change="tableSelectChange"
      :header-cell-style="{
        background: table_config.headColor,
        color: table_config.headTxtColor
      }"
    >
      <el-table-column
        type="selection"
        width="45"
        v-if="table_config.checkBox"
        header-align="center"
      ></el-table-column>
      <template v-for="item in table_config.tHead">
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
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
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :show-overflow-tooltip="table_config.tooltip"
          :key="item.prop"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
    <el-row v-if="table_config.slotBox">
      <template slot-scope>
        <slot :name="table_config.slotName"></slot>
      </template>
    </el-row>
    <el-row
      :style="{ justifyContent: table_config.pagePosition }"
      style="display:flex;align-items: center;margin-top:20px;"
    >
      <el-pagination
        v-if="table_config.pagination"
        class="pull-right"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 10]"
        :page-size="table_config.data.pageSize"
        :layout="table_config.pageLayout"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { getTableData } from "@/api/common";
// import { reqpolicyNews } from "@/api/news";
export default {
  name: "TableData",
  data() {
    return {
      loadingTable: true,
      tableRow: {
        type: Object,
        default: () => {}
      },
      table_config: {
        tHead: [],
        checkBox: true,
        hadBorder: true,
        tableHeight: false,
        headColor: "#000000",
        headTxtColor: "#000000",
        tooltip: false,
        pagePosition: "flex-end",
        pageLayout: "total,sizes,prev,pager,next,jumper",
        url: "",
        pagination: true,
        slotBox: false,
        slotName: "",
        data: {}
      },
      total: 0,
      // 当前页
      currentPage: 1,
      table_data: [
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        },
        {
          name: "黄芪",
          type: 1,
          num: "300t",
          adress: "上海市普陀区"
        }
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
  beforeMount() {
    // this.getPolicyNews();
  },
  methods: {
    // 获取政策新闻
    // getPolicyNews() {
    //   let newParams = {
    //     page: 1,
    //     pageSize: 4
    //   };
    //   reqpolicyNews(newParams).then(res => {
    //     console.log(res);
    //     const resData = res.data.data;
    //     this.table_data = resData.records;
    //   });
    // },
    //初始化配置
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
      // 配置完调取接口
      this.loadingData();
    },
    loadingData() {
      let newsParams = {
        url: this.table_config.url,
        data: this.table_config.data
      };
      getTableData(newsParams)
        .then(res => {
          console.log(res);
          const resData = res.data.data;
          if (resData) {
            this.table_data = resData.records;
          }
          this.total = resData.total;
          this.loadingTable = false;
        })
        .catch(error => {
          console.log(error);
          this.loadingTable = false;
        });
    },
    requestData(params = "") {
      if (params) {
        this.table_config.data = params;
      }
      this.loadingData();
    },
    handleSizeChange(val) {
      console.log(val);
      this.table_config.data.pageSize = val;
      this.loadingData();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.table_config.data.page = val;
      this.loadingData();
    },
    // 勾选checkbox时触发
    tableSelectChange(val) {
      console.log(val);
      let rowData = {
        idItem: val.map(item => item.id)
      };
      console.log(rowData);
      this.$emit("update:tableRow", rowData);
    }
    // tableSelectChange(val) {
    //   let rowData = {
    //     idItem: val.map(item => item.id)
    //   };
    //   // console.log(val.map(item => item.id));
    //   console.log(this.tableRow);
    //   this.$emit("update:tableRow", rowData);
    // }
  }
};
</script>
<style lang="scss" scoped>
.tableHead {
  font-size: 20px !important;
  font-weight: 300;
}
</style>
