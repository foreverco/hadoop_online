<template>
  <div class="DrugPrice">
    <div class="priceCheckBox">
      <ul>
        <li
          v-for="(item, index) in priceTitle"
          :key="index"
          :class="{ priceActive: priceActive == index }"
        >
          {{ item.name }}
        </li>
      </ul>
      <p>
        <span>更新时间:</span>
        <span>2020-08-14 09:00</span>
      </p>
      <span>查看更多 > ></span>
    </div>
    <div class="priceTable">
      <TableVue :config="tableConfig">
        <template v-slot:opration="slotData">
          <i class="el-icon-s-data iconName"></i>
          <span v-if="false">{{ slotData }}</span>
        </template>
      </TableVue>
    </div>
  </div>
</template>
<script>
import TableVue from "@/components/TableData";
export default {
  name: "DrugPrice",
  components: {
    TableVue
  },
  data() {
    return {
      priceActive: 0,
      // 价格Tab
      priceTitle: [{ name: "市场价格" }, { name: "产地价格" }],
      // 表格配置
      tableConfig: {
        checkBox: false,
        hadBorder: false,
        pagination: false,
        tableHeight: "370",
        headColor: "#D8EFDA",
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
      // 资讯Tab
      newsTitle: [{ name: "市场资讯" }, { name: "产地资讯" }]
    };
  }
};
</script>
<style lang="scss" scoped>
.DrugPrice {
  .priceCheckBox {
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      .priceActive {
        color: $maincolor;
      }
      li {
        font-size: 16px;
        padding: 0 28px;
        font-weight: 600;
        &:first-child {
          border-right: 1px solid rgba(0, 0, 0, 0.1);
        }
        &:hover {
          color: $maincolor;
          cursor: pointer;
        }
      }
    }
    p {
      flex: 2;
      span {
        font-size: 12px;
        color: rgba(154, 154, 154, 1);
      }
    }
    > span {
      color: $maincolor;
    }
  }
  .priceTable {
    margin-top: 20px;
    margin-bottom: 30px;
  }
}
</style>
