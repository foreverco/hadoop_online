<template>
  <div class="FavoriteBox">
    <ul class="favoriteList">
      <li
        v-for="(item, index) in FavoriteList"
        :key="index"
        @click="gotoMsg(item)"
      >
        <div class="imgBox">
          <img :src="item.medicincePic" alt="" />
          <div v-if="item.idExist == 1" class="hoverBox">产品已下架</div>
        </div>
        <div class="contentBox">
          <p>
            <span>{{ item.medicineName }}</span>
          </p>
          <ul>
            <li>
              <span>规格</span>
              <span> {{ item.specificationName }} </span>
            </li>
            <li>
              <span>供应量</span>
              <span> {{ `${item.amount}${item.amountUnit}` }} </span>
            </li>
            <li>
              <span>产地</span>
              <span :title="item.orginCountyName">
                <!-- 123 -->
                {{
                  `${item.orginProvinceName}/${item.orginCityName}/${item.orginCountyName}`
                }}
              </span>
            </li>
            <li @click.stop="delFavorite(item)">
              <i style="font-size:15px;" class="el-icon-delete"></i>
            </li>
          </ul>
        </div>
        <div
          class="mark"
          :style="{ background: item.module === 1 ? '#3ab54c' : '#fc8a0f' }"
        >
          {{ item.module === 1 ? "供" : "购" }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { reqfavotite, reqfavotiteList } from "@/api/apply";
export default {
  name: "Favorite",
  data() {
    return {
      records: [],
      current: 1,
      size: 4,
      total: 0,
      pages: 0,
      FavoriteList: [
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        },
        {
          imgUrl: require("@/assets/images/test/apply/图层 1.png"),
          title: "防风",
          id: "001",
          gg: "统货",
          num: "100",
          cd: "北京",
          ck: "内蒙古",
          zl: "2020标准",
          pj: "发票",
          phone: "1515151515151",
          price: "20"
        }
      ]
    };
  },
  created() {
    this.getFavoriteList();
  },
  methods: {
    // 获取收藏夹列表
    getFavoriteList(page, size, params) {
      let favoriteParams = {
        page: 1,
        pageSize: 10
      };
      if (page) {
        this.current = page;
      }
      if (size) {
        this.size = size;
      }
      if (params) {
        favoriteParams = params;
      }
      reqfavotiteList(favoriteParams).then(res => {
        console.log(res);
        this.FavoriteList = res.data.data.records;
        console.log(this.FavoriteList);
      });
    },
    /* 取消收藏 */
    delFavorite(e) {
      console.log(e);
      let favotiteparams = {};
      favotiteparams.businessId = e.businessId;
      favotiteparams.module = 1;
      favotiteparams.isDel = 1;
      console.log(favotiteparams);
      reqfavotite(favotiteparams).then(res => {
        console.log(res);
        this.$message.success("取消收藏成功");
        this.getFavoriteList();
      });
    },
    /* 跳转详情 */
    gotoMsg(e) {
      console.log(e);
      if (e.idExist == 0) {
        if (e.module == 1) {
          this.$router.push({
            path: "/OTC1/applyMsg",
            query: { id: e.businessId }
          });
        } else {
          this.$router.push({
            path: "/OTC2/buymsg",
            query: { id: e.businessId }
          });
        }
      } else {
        this.$message.warning("该商品已下架！");
      }
    }
  }
};
</script>
<style lang="scss">
.FavoriteBox {
  .favoriteList {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    > li {
      width: 250px;
      height: 330px;
      // border: 1px solid red;
      background: #fff;
      margin-right: 13px;
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .imgBox {
        border: 1px dashed #888;
        width: 240px;
        height: 155px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .hoverBox {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #00000050;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 18px;
          top: 0;
          left: 0;
        }
      }
      .contentBox {
        width: 240px;
        height: 150px;
        p {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          span {
            font-size: 24px;
            color: #333333;
          }
        }
        ul {
          margin-top: 5px;
          // margin-bottom: 15px;
          li {
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
              color: #333333;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              &:first-child {
                // border: 1px solid red;
                display: inline-block;
                width: 60px;
              }
            }
          }
        }
      }
      .mark {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 32px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
