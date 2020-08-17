<template>
  <div class="MarketList">
    <div class="titleBox">
      <div>
        <Title titleTxt="市场资讯" :btnShow="false"></Title>
      </div>
      <ul>
        <li>产地资讯</li>
        <li>政策法规</li>
        <li>行业资讯</li>
      </ul>
    </div>
    <ul class="listBox">
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
    <!--   分页插件   -->
    <div style="text-align:center;margin-top:20px">
      <pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :size="size"
        :pageLayout="pageLayout"
        :current="current"
      ></pagination>
    </div>
  </div>
</template>
<script>
import { reqpolicyNews } from "@/api/news";
import pagination from "@/components/Pagination";
export default {
  name: "MarketList",
  components: {
    pagination
  },
  data() {
    return {
      records: [],
      current: 1,
      size: 4,
      total: 0,
      pages: 0,
      pageLayout: "prev, pager, next",
      MarketList: [
        {
          imgUrl: require("@/assets/images/test/sczx/图层 1(1).png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        }
      ]
    };
  },
  created() {
    this.getpolicyNews();
  },
  methods: {
    getpolicyNews(page, size, p) {
      let newParams = {};
      if (page) {
        this.current = page;
      }
      if (size) {
        this.size = size;
      }
      if (p) {
        newParams = p;
      }
      newParams.page = this.current;
      newParams.pageSize = this.size;
      reqpolicyNews(newParams).then(res => {
        console.log(res);
        this.records = res.data.data.records;
        this.records.forEach(item => {
          item.imgUrl = require("@/assets/images/test/sczx/图层 2.png");
        });
        this.total = res.data.data.total;
        this.size = res.data.data.size;
      });
    },
    handleSizeChange(size) {
      this.getpolicyNews(1, size);
    },
    handleCurrentChange(page) {
      this.getpolicyNews(page);
    },
    gotoMsg(id) {
      console.log(id);
      this.$router.push({
        path: "/marketInfo/marketMsg",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.MarketList {
  padding: $boxpadding;
  background: $boxbg;
  height: 1665px;
  .titleBox {
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        color: $graycolor;
        border-right: 1px solid $graycolor;
        padding: 0 12px;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
  > .listBox {
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
        width: 745px;
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
