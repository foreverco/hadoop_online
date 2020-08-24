<template>
  <div class="MarketMsg">
    <div class="MarketMsgTopbox">
      <p class="MarketTitle">{{ msg.title }}</p>
      <ul class="markList" v-if="msg.labelList && msg.labelList.length > 0">
        <li v-for="(item, index) in msg.labelList" :key="index">
          {{ item.labelName }}
        </li>
      </ul>
      <div class="fromDateBox">
        <div>
          <!-- <span>来源:</span> -->
          <span>{{ msg.policyCategory }}</span>
        </div>
        <div>
          <span>发布时间:</span>
          <span>{{ msg.releaseTime }}</span>
        </div>
      </div>
      <div class="imgBox" v-if="msg.urls && msg.urls.length > 0">
        <img v-for="(i, index) in msg.urls" :key="index" :src="i.url" alt="" />
      </div>
      <div class="imgBox" v-else>
        <img src="@/assets/images/test/sczx/图层 2.png" alt="" />
      </div>
      <div class="contentBox" v-html="msg.context"></div>
    </div>
    <div class="aboutBox">
      456
    </div>
  </div>
</template>
<script>
import { reqpolicyNewsMsg } from "@/api/news";
export default {
  name: "MarketMsg",
  data() {
    return {
      msg: {
        title: "浙江省金华市磐安县覆盆子价格较为平稳",
        markList: [{ name: "333" }, { name: "333" }, { name: "333" }],
        from: "33333",
        date: "2020-08-11",
        imgUrl: require("@/assets/images/test/sczx/图层 2.png"),
        content: `<p style="margin-bottom:20px">延胡索价格：延胡索市场货源充足，商家关注度减弱，走动缓慢，行情稳定，现延胡索浙江统货价格在42元左右，陕西统货价格在39元左右</p>
          <p style="margin-bottom:20px">延胡索价格：延胡索市场货源充足，商家关注度减弱，走动缓慢，行情稳定，现延胡索浙江统货价格在42元左右，陕西统货价格在39元左右</p>
          <p style="margin-bottom:20px">延胡索价格：延胡索市场货源充足，商家关注度减弱，走动缓慢，行情稳定，现延胡索浙江统货价格在42元左右，陕西统货价格在39元左右</p>`
      }
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.getpolicyNewsMsg(this.$route.query.id);
  },
  methods: {
    getpolicyNewsMsg(e) {
      reqpolicyNewsMsg({ Id: e }).then(res => {
        console.log(res);
        this.msg = res.data.data;
        this.$route.meta.title = res.data.data.title;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.MarketMsg {
  .MarketMsgTopbox {
    padding: $boxpadding;
    background: $boxbg;
    height: 1275px;
    .MarketTitle {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      text-align: center;
      margin-bottom: 25px;
    }
    .markList {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 25px;
      li {
        margin: 0 20px;
        width: 84px;
        height: 22px;
        border: 1px solid $maincolor;
        color: $maincolor;
        border-radius: 4px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .fromDateBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      > div {
        &:first-child {
          span {
            color: $maincolor;
          }
        }
      }
    }
    .imgBox {
      width: 100%;
      margin-bottom: 25px;
      img {
        width: 100%;
      }
    }
    .contentBox {
      text-indent: 35px;
      line-height: 30px;
    }
  }
  .aboutBox {
    margin-top: 23px;
    padding: $boxpadding;
    background: $boxbg;
    height: 366px;
  }
}
</style>
