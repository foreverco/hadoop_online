<template>
  <div class="drugIndex lvallcontainer">
    <div class="swiperBox">
      <div class="smallSwiper lvcontainer">
        <!-- 轮播图 -->
        <SwiperVue
          :imgList="drugswiperList"
          :swiperConfig="drugswiperConfig"
        ></SwiperVue>
      </div>
    </div>
    <div class="drugcontent lvcontainer">
      <ul class="searchBox">
        <li>
          <span>搜索:</span>
          <div class="headSearch">
            <el-input placeholder="请输入关键字"></el-input>
            <el-button type="success">搜索</el-button>
          </div>
        </li>
        <li>
          <span>区域:</span>
        </li>
        <li>
          <span>产地:</span>
          <ul class="moonList">
            <li v-for="(item, index) in moonList" :key="index">
              {{ item.moon }}
            </li>
          </ul>
        </li>
        <li>
          <span>拼音:</span>
          <ul class="zmList">
            <li
              v-for="(item, index) in zmList"
              :key="index"
              :class="{ zmActive: zmActive == item.name }"
              @click="getZm(item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="titleBox">
        <Title :titleTxt="`${zmActive}类`" :btnShow="false"></Title>
      </div>
      <div class="drugMsgBoxList">
        <ul>
          <li
            v-for="(item, index) in drugList"
            :key="index"
            @click="gotoDrugMsg('aaabbb')"
          >
            <div class="imgBox">
              <img :src="item.imgUrl" alt="" />
            </div>
            <div class="conBox">
              <div class="nameBox">
                <span>{{ item.title }}</span>
                <span>{{ item.enName }}</span>
              </div>
              <p>
                <span>别名:</span>
                <span>{{ item.allName }}</span>
              </p>
              <p>
                <span>产新时间:</span>
                <span>{{ item.date }}</span>
              </p>
              <p>
                <span>主要产区:</span>
                <span>{{ item.adress }}</span>
              </p>
              <el-button type="success">查看更多</el-button>
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
    </div>
  </div>
</template>
<script>
import SwiperVue from "@/components/SwiperVue";
import pagination from "@/components/Pagination";
export default {
  name: "drugIndex",
  components: {
    SwiperVue,
    pagination
  },
  data() {
    return {
      records: [],
      current: 1,
      size: 4,
      total: 10,
      pages: 10,
      pageLayout: "prev, pager, next",
      drugswiperConfig: {
        slidesPerView: 4,
        spaceBetween: 78,
        textShow: true,
        imgheight: "80%"
      },
      drugswiperList: [
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "黄芪",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/甘草.png"),
          title: "甘草",
          con: "清热解毒，润肺止咳，调和诸药性"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/枸杞.png"),
          title: "枸杞",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/苦豆子.png"),
          title: "苦豆子",
          con: "补气升阳，益卫固表，利水消肿，托疮生肌"
        }
      ],
      moonList: [
        { moon: "一月" },
        { moon: "二月" },
        { moon: "三月" },
        { moon: "四月" },
        { moon: "五月" },
        { moon: "六月" },
        { moon: "七月" },
        { moon: "八月" },
        { moon: "九月" },
        { moon: "十月" },
        { moon: "十一月" },
        { moon: "十二月" }
      ],
      zmActive: "A",
      zmList: [
        { name: "A" },
        { name: "B" },
        { name: "C" },
        { name: "D" },
        { name: "E" },
        { name: "F" },
        { name: "G" },
        { name: "H" },
        { name: "I" },
        { name: "J" },
        { name: "K" },
        { name: "L" },
        { name: "M" },
        { name: "N" },
        { name: "O" },
        { name: "P" },
        { name: "Q" },
        { name: "R" },
        { name: "S" },
        { name: "T" },
        { name: "U" },
        { name: "V" },
        { name: "W" },
        { name: "X" },
        { name: "Y" },
        { name: "Z" }
      ],
      drugList: [
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芩.png"),
          title: "黄芩",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黄芪.png"),
          title: "黄芪",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/霍山石斛.png"),
          title: "霍山石斛",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/苦豆子.png"),
          title: "苦豆子",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/枸杞.png"),
          title: "枸杞",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/甘草.png"),
          title: "甘草",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        },
        {
          imgUrl: require("@/assets/images/test/ddyc/黑灵芝.png"),
          title: "黑灵芝",
          enName: "hei ling zhi",
          allName: "棉芪、黄耆等",
          date: "三月",
          adress: "内蒙古、甘肃"
        }
      ]
    };
  },
  methods: {
    getZm(e) {
      this.zmActive = e;
    },
    // 跳转详情页
    gotoDrugMsg(id) {
      this.$router.push({
        path: "/drug/drugMsg",
        query: {
          id: id
        }
      });
    },
    getDrugList(page, size, p) {
      console.log(page, size, p);
    },
    handleSizeChange(size) {
      this.getDrugList(1, size);
    },
    handleCurrentChange(page) {
      this.getDrugList(page);
    }
  }
};
</script>
<style lang="scss">
.drugcontent {
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
.drugIndex {
  .swiperBox {
    height: 413px;
    background: url("../../../assets/images/test/ddyc/swiperbg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .drugcontent {
    // height: 2000px;
    margin-top: 32px;
    .searchBox {
      background: $boxbg;
      border-top: 3px solid $maincolor;
      > li {
        padding: $boxpadding;
        min-height: 55px;
        border-bottom: 1px solid rgba(58, 181, 76, 0.1);
        display: flex;
        align-items: center;
        &:last-child {
          border-bottom: 0;
        }
        span {
          margin-right: 35px;
          color: #666666;
        }
        .headSearch {
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
            font-size: 16px;
            line-height: 10px;
          }
        }
        .moonList {
          display: flex;
          > li {
            margin-right: 47px;
            &:hover {
              color: $maincolor;
              cursor: pointer;
            }
          }
        }
        .zmList {
          display: flex;
          .zmActive {
            color: $maincolor;
          }
          > li {
            margin-right: 33px;
            &:hover {
              color: $maincolor;
              cursor: pointer;
            }
          }
        }
      }
    }
    .titleBox {
      margin: 30px 0;
    }
    .drugMsgBoxList {
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        > li {
          width: 445px;
          height: 460px;
          border: 1px solid rgba(58, 181, 76, 1);
          margin-right: 29px;
          margin-bottom: 29px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .imgBox {
            height: 272px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .conBox {
            height: 188px;
            background: #fff;
            padding: 20px;
            border-bottom: 1px solid $maincolor;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            position: relative;
            .el-button {
              position: absolute;
              width: 123px;
              height: 33px;
              line-height: 0;
              font-size: 18px;
              bottom: 21px;
              right: 26px;
            }
            .nameBox {
              span {
                &:first-child {
                  font-size: 24px;
                  font-family: Microsoft YaHei;
                  font-weight: 600;
                  color: $maincolor;
                  line-height: 27px;
                  margin-right: 10px;
                }
              }
            }
            p {
              span {
                display: inline-block;
                &:first-child {
                  width: 80px;
                  text-align: justify;
                  text-align-last: justify;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
