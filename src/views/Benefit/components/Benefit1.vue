<template>
  <div class="tableTest">
    <TableVue :config="tableConfig">
      <template v-slot:opration="scope">
        <el-button @click="find(scope.data)">查看</el-button>
      </template>
    </TableVue>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
export default {
  name: "Benefit1",
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
        headColor: "#D8EFDA",
        url: "newsList",
        pagination: true,
        data: {
          page: 1,
          pageSize: 1
        },
        tHead: [
          { label: "标题", prop: "title" },
          { label: "日期", prop: "releaseTime" },
          { label: "内容", prop: "context" },
          { label: "来源", prop: "policyCategory" },
          {
            label: "操作",
            type: "slot",
            slotName: "opration"
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
<style lang="scss">
.tableTest {
  border: 1px solid red;
  height: 1800px;
}
</style>
