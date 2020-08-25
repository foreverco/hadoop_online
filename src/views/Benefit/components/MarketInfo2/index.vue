<template>
  <div class="marketInfo lvcontainer">
    <div class="leftBox">
      <div>
        <router-view ref="newChild"></router-view>
        <!-- <MarketList></MarketList> -->
      </div>
    </div>
    <div class="rightBox">
      <div class="topBox">
        <div>
          <Title titleTxt="搜索" :btnShow="false"></Title>
        </div>
        <div class="headSearch">
          <el-input placeholder="请输入关键字" v-model="newKeys"></el-input>
          <el-button type="success" @click="searchNews">搜索</el-button>
        </div>
        <div class="hotBox">
          <p>今日热词</p>
          <ul>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
            <li>黄芪</li>
          </ul>
        </div>
      </div>
      <div class="midBox">
        <p>
          <i class="el-icon-upload"></i>
          <span>TOP 10</span>
        </p>
        <ul class="toptenBox">
          <li v-for="(item, index) in toptenList" :key="index">
            <span>{{ index + 1 }}</span>
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <div class="botBox">
        <ul>
          <li v-for="(item, index) in imgList" :key="index">
            <img :src="item.imgUrl" alt="" />
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import MarketList from "./components/MarketList";
// import MarketMsg from "./components/marketMsg";
import { reqhotList } from "@/api/news";
export default {
  name: "MarketInfo",
  // components: {
  //   MarketList,
  //   MarketMsg
  // },
  data() {
    return {
      newsId: "",
      newKeys: "",
      toptenList: [
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        },
        {
          content: "玉林市场丁香淡季走动量有限近日行情有下滑"
        }
      ],
      imgList: [
        {
          imgUrl: require("@/assets/images/test/sczx/图层 9.png"),
          title: "玉林市场桃胶货源成交量不大行情少有波动"
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 10.png"),
          title: "玉林北豆根商家购进量不大行情走平"
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
          title: "安国市场茜草行情低于前期 货源正常购销"
        }
      ]
    };
  },
  mounted() {},
  created() {
    this.gethotList();
    // console.log(this.$route.query.id);
    // this.newsId = this.$route.query.id;
  },
  // watch: {
  //   "$route.query.id"(newval) {
  //     console.log(newval);
  //     this.newsId = newval;
  //   }
  // },
  methods: {
    /* 获取热文榜单列表 */
    gethotList() {
      reqhotList().then(res => {
        console.log(res);
        this.toptenList = res.data.data;
      });
    },
    // 关键字搜索
    searchNews() {
      let params = {};
      params.policyName = this.newKeys;
      this.$refs.newChild.getpolicyNews(1, 10, params);
    }
  }
};
</script>
<style lang="scss">
.marketInfo {
  .headSearch {
    .el-input {
      .el-input__inner {
        height: 40px;
        background: #ffffff;
        border: 1px solid $maincolor;
        border-radius: 5px 0 0 5px;
        outline: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.marketInfo {
  display: flex;
  justify-content: space-between;
  .leftBox {
    width: 980px;
    // padding: $boxpadding;
    // background: $boxbg;
  }
  .rightBox {
    display: flex;
    flex-flow: column;
    > div {
      padding: $boxpadding;
      background: $boxbg;
      width: 402px;
    }
    .topBox {
      height: 219px;
      .headSearch {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-input {
          border-radius: 5px 0 0 5px;
          width: 300px;
          outline: 0;
          .el-input__inner {
            height: 100px;
            background: #ffffff;
            outline: 0;
          }
        }
        .el-button {
          border-radius: 0 5px 5px 0;
          height: 40px;
          line-height: 10px;
        }
      }
      .hotBox {
        margin-top: 15px;
        height: 80px;
        p {
          color: #656565;
          margin-bottom: 15px;
        }
        ul {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-wrap: wrap;
          li {
            color: $maincolor;
            margin-right: 45px;
            line-height: 30px;
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
    }
    .midBox {
      margin: 24px 0 11px 0;
      height: 639px;
      p {
        i {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(253, 15, 15, 1);
          color: #fd0f0f;
        }
        span {
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(253, 15, 15, 1);
        }
      }
      .toptenBox {
        li {
          display: flex;
          align-items: center;
          margin-top: 32px;
          &:first-child {
            span {
              &:first-child {
                background: #fd0f0f;
              }
            }
          }
          &:nth-child(2) {
            span {
              &:first-child {
                background: #ffa032;
              }
            }
          }
          span {
            font-weight: 600;
            &:first-child {
              background: #3ab54c;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 24px;
              height: 24px;
              border-radius: 24px;
              color: #fff;
              margin-right: 10px;
            }
          }
        }
      }
    }
    .botBox {
      height: 772px;
      ul {
        li {
          width: 368px;
          height: 233px;
          margin-bottom: 20px;
          position: relative;
          img {
            width: 100%;
          }
          p {
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            font-size: 16px;
            padding: 5px;
          }
        }
      }
    }
  }
}
</style>
