<template>
  <div class="plantingVideo lvcontainer">
    <ul class="videoNav">
      <li
        v-for="(item, index) in videoNav"
        :key="index"
        :class="{ navActive: navActive == index }"
        @click="changenavActive(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="videoList">
      <li>456</li>
      <li>456</li>
      <li>456</li>
      <li>456</li>
      <li>456</li>
    </ul>
    <div>
      <pageVue
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :size="size"
        :current="current"
      ></pageVue>
    </div>
  </div>
</template>
<script>
import { reqpolicyNews } from "@/api/news";
import pageVue from "@/components/Pagination";
export default {
  name: "Planting2",
  components: {
    pageVue
  },
  data() {
    return {
      navActive: 0,
      records: [],
      current: 1,
      size: 5,
      total: 0,
      pages: 0,
      videoNav: [
        {
          name: "全部",
          value: "all"
        },
        {
          name: "黄芪",
          value: "all"
        },
        {
          name: "板蓝根",
          value: "all"
        },
        {
          name: "防风",
          value: "all"
        }
      ]
    };
  },
  mounted() {
    this.getpolicyNews();
  },
  methods: {
    changenavActive(index) {
      this.navActive = index;
    },
    getpolicyNews() {
      let policyNewsParams = {
        page: this.pages,
        pageSize: this.size
      };
      reqpolicyNews(policyNewsParams).then(res => {
        console.log(res);
      });
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.plantingVideo {
  border: 1px solid red;
  .videoNav {
    background: $boxbg;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 10px;
    margin-bottom: 22px;
    .navActive {
      border-bottom: 3px solid $maincolor;
    }
    li {
      height: 60px;
      line-height: 60px;
      text-align: center;
      width: 70px;
      margin: 0 5px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .videoList {
    background: $boxbg;
  }
}
</style>
