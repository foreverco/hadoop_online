<template>
  <div class="FavoriteBox">
    <ul class="browseList">
      <li v-for="(item, index) in FavoriteList" :key="index">
        <div class="imgBox">
          <img :src="item.medicincePic" alt="" />
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
            <li>
              <i style="font-size:15px;" class="el-icon-delete"></i>
            </li>
          </ul>
        </div>
        <div class="mark">
          供
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { reqfavotiteList } from "@/api/apply";
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
    }
  }
};
</script>
<style lang="scss">
.FavoriteBox {
  .browseList {
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
        img {
          width: 100%;
          height: 100%;
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
        background: $maincolor;
      }
    }
  }
}
</style>
