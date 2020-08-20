<template>
  <div class="plantingVideo lvcontainer">
    <ul class="videoNav">
      <li
        v-for="(item, index) in videoNav"
        :key="index"
        :class="{ navActive: navActive == index }"
        @click="changenavActive(index)"
      >{{ item.name }}</li>
    </ul>
    <div class="videoBox">
      <ul class="videoList">
        <li v-for="(item, index) in videoList" :key="index" @click="gotoVideo(item.id)">
          <div class="imgBox">
            <span>专家</span>
            <img :src="item.imgUrl" alt>
          </div>
          <div class="contentBox">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
      <div class="pageBox">
        <pageVue
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="total"
          :size="size"
          :current="current"
        ></pageVue>
      </div>
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
      ],
      videoList: [
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(1).png"),
          title: "黄芪种植",
          id: "001",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(2).png"),
          title: "黄芪种植",
          id: "002",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(3).png"),
          title: "黄芪种植",
          id: "003",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(4).png"),
          title: "黄芪种植",
          id: "004",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(5).png"),
          title: "黄芪种植",
          id: "005",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(8).png"),
          title: "黄芪种植",
          id: "006",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(1).png"),
          title: "黄芪种植",
          id: "007",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(5).png"),
          title: "黄芪种植",
          id: "008",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(8).png"),
          title: "黄芪种植",
          id: "009",
          content: "关于春季病虫害防治与诊断"
        },
        {
          imgUrl: require("@/assets/images/test/zjzd/图片(1).png"),
          title: "黄芪种植",
          id: "010",
          content: "关于春季病虫害防治与诊断"
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
    /* 跳转视频详情 */
    gotoVideo(e) {
      console.log(e);
      this.$router.push({
        path: "/planting2/video",
        query: {
          id: e
        }
      });
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
  .videoBox {
    background: $boxbg;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 33px 52px;
    .videoList {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      li {
        width: 218px;
        // margin: 30px 50px;
        margin-right: 50px;
        margin-bottom: 30px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        &:hover {
          cursor: pointer;
        }
        .imgBox {
          position: relative;
          &:hover {
            cursor: pointer;
          }
          span {
            background: $maincolor;
            color: #fff;
            position: absolute;
            top: 10px;
            padding: 2px 5px;
            border-radius: 0 10px 10px 0;
          }
          img {
            width: 100%;
            // height: 300px;
          }
        }
        .contentBox {
          height: 60px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-left: 15px;
          p {
            width: 100%;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(146, 146, 146, 1);
            &:first-child {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }
    }
    .pageBox {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
