<template>
  <div class="DrugNews">
    <div class="newsCheckBox">
      <ul>
        <li
          v-for="(item, index) in newsTitle"
          :key="index"
          :class="{ newsActive: newsParams.policyType == item.value }"
          @click="changeNewsType(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
      <span class="btnClass" @click="gotoNews">查看更多 > ></span>
    </div>
    <ul class="drugNewsList">
      <li
        v-for="(item, index) in records"
        :key="index"
        @click="gotoMsg(item.id)"
      >
        <div class="imgBox">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="msgBox">
          <div class="msgTop">
            {{ item.title }}
          </div>
          <div class="msgMid">
            {{ item.context }}
          </div>
          <div class="msgBot">
            <ul class="markBox">
              <li v-for="(i, index) in item.labelList" :key="index">
                {{ i.labelName }}
              </li>
            </ul>
            <div class="dateBox">
              <span>发布时间:</span>
              <span>{{ item.releaseTime }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { reqpolicyNews } from "@/api/news";
export default {
  name: "DrugNews",
  props: {
    newsKeys: {
      type: String,
      default: ""
    }
  },
  // created() {
  //   // alert(this.newsKeys);
  //   if (this.newsKeys) {
  //     this.initNewsList();
  //   }
  // },
  watch: {
    newsKeys() {
      this.initNewsList();
    }
  },
  data() {
    return {
      newsActive: 0,
      newsParams: {
        page: 1,
        size: 3,
        policyType: "A1",
        policyName: ""
      },
      // 资讯Tab
      newsTitle: [
        { name: "产地资讯", value: "A1" },
        { name: "政策资讯", value: "A2" }
      ],
      records: [
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "亳州药市黄芪价格行情表现疲软",
          context:
            "随着黄芪产新季节以及用季的到来。黄芪的产量和用量是后市走势的关键因素。这两年价格虽然不是很高 ，但是种植的积极性还是有的。目前",
          labelList: [
            {
              labelName: "黄芪"
            }
          ],
          releaseTime: "2020-08-20"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "亳州药市黄芪价格行情表现疲软",
          context:
            "随着黄芪产新季节以及用季的到来。黄芪的产量和用量是后市走势的关键因素。这两年价格虽然不是很高 ，但是种植的积极性还是有的。目前",
          labelList: [
            {
              labelName: "黄芪"
            }
          ],
          releaseTime: "2020-08-20"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "亳州药市黄芪价格行情表现疲软",
          context:
            "随着黄芪产新季节以及用季的到来。黄芪的产量和用量是后市走势的关键因素。这两年价格虽然不是很高 ，但是种植的积极性还是有的。目前",
          labelList: [
            {
              labelName: "黄芪"
            }
          ],
          releaseTime: "2020-08-20"
        }
      ]
    };
  },
  methods: {
    // 初始化新闻列表
    initNewsList() {
      this.newsParams.policyName = this.newsKeys;
      reqpolicyNews(this.newsParams).then(res => {
        console.log(res);
        this.records = res.data.data.records;
        this.records.forEach(item => {
          item.imgUrl = require("@/assets/images/test/ddyc/黄芪.png");
        });
      });
    },
    // 修改新闻类型
    changeNewsType(e) {
      this.newsParams.policyType = e;
      console.log(this.newsParams);
      this.initNewsList();
    },
    // 跳转新闻页面
    gotoNews() {
      this.$router.push({
        path: "/marketInfo/marketList"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.DrugNews {
  .newsCheckBox {
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      .newsActive {
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
    > span {
      color: $maincolor;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .drugNewsList {
    > li {
      width: 100%;
      height: 154px;
      padding: 18px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background: #3ab54c10;
        cursor: pointer;
      }
      .imgBox {
        img {
          width: 176px;
          height: 120px;
        }
      }
      .msgBox {
        width: 676px;
        height: 120px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        > div {
        }
        .msgTop {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 35px;
        }
        .msgMid {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .msgBot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .markBox {
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              width: 84px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              border: 1px solid $maincolor;
              border-radius: 4px;
              color: $maincolor;
              margin-right: 20px;
            }
          }
          .dateBox {
            span {
              color: $maincolor;
              &:first-child {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
