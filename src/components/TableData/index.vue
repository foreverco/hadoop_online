<template>
  <div>
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" width="55" v-if="table_config.checkBox"></el-table-column>
      <template v-for="item in table_config.tHead">
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <span v-html="item.callback && item.callback(scope.row, item.prop)"></span>
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

        <el-table-column v-else :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
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
        checkBox: true
      },
      table_data: [
        {
          date: "2016-05-02",
          type: 1,
          status: 1,
          name: "王小虎",
          photo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595409508794&di=0a56dcc883332ba5ae12e4962b06af2c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6e8f56b2543cce8bffa35b22d03684fae76a1b2c56c32-COdswi_fw658",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          type: 0,
          status: 1,
          name: "王小虎",
          photo:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2272478076,2858112941&fm=26&gp=0.jpg",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          type: 1,
          status: 0,
          name: "王小虎",
          photo:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595409508791&di=673d4c661dc77bbe563e79d3bf90fc29&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201309%2F26%2F20130926095128_SiPMh.jpeg",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          type: 1,
          status: 1,
          name: "王小虎",
          photo: "../../assets/images/timg.jpg",
          address: "上海市普陀区金沙江路 1516 弄"
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
