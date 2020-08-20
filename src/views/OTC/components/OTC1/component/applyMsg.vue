<template>
  <div class="applyMsg lvcontainer">
    <div class="topBox">
      <div class="imgBox">
        <img :src="applyMsg.medicincePic" alt="" />
      </div>
      <div class="contentBox">
        <div class="titleBox">
          <span>{{ applyMsg.medinceName }}</span>
          <p @click="favotite(applyMsg.isFavotite)">
            <i
              :class="
                applyMsg.isFavotite == 1
                  ? 'el-icon-star-on'
                  : 'el-icon-star-off'
              "
            ></i>
            <!-- <i v-else class="el-icon-star-off"></i> -->
            收藏
          </p>
        </div>
        <ul>
          <li>
            <span>产品售价:</span>
            <span>{{
              applyMsg.disclosePriceName === "具体价格"
                ? applyMsg.price
                : applyMsg.disclosePriceName
            }}</span>
          </li>
          <li>
            <span>有无样品:</span>
            <span>{{ applyMsg.isSampleName }}</span>
          </li>
          <li>
            <span>产品规格:</span>
            <span>{{ applyMsg.specificationName }}</span>
          </li>
          <li>
            <span>付款方式:</span>
            <span>{{ applyMsg.paymentMethodName }}</span>
          </li>
          <li>
            <span>产品数量:</span>
            <span>{{
              `${applyMsg.supplyAmount}${applyMsg.supplyUnitName}`
            }}</span>
          </li>
          <li>
            <span>票据:</span>
            <span>{{ applyMsg.invoiceName }}</span>
          </li>
          <li>
            <span>产品产地:</span>
            <span>{{
              `${applyMsg.orginProvinceName}/${applyMsg.orginCityName}/${applyMsg.orginCountyName}`
            }}</span>
          </li>
          <li>
            <span>联系人:</span>
            <span>{{ applyMsg.contactPerson }}</span>
          </li>
          <li>
            <span>产品仓储:</span>
            <span>{{
              `${applyMsg.warehouseProvinceName}${applyMsg.warehouseCityName}${applyMsg.warehouseCountyName}`
            }}</span>
          </li>
          <li>
            <span>更新时间:</span>
            <span>{{ applyMsg.updateDate }}</span>
          </li>
          <li>
            <span>质量标准:</span>
            <span>{{ applyMsg.qualityStandardName }}</span>
          </li>
          <li>
            <span>联系方式:</span>
            <span>{{
              applyMsg.contactNumber || "*********** (登陆后显示联系方式)"
            }}</span>
          </li>
          <li>
            <span>资质标准:</span>
            <span>{{ applyMsg.qualificationStandardName }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="userBox">
      <Title titleTxt="该用户其他供应信息"></Title>
      <ul class="applylistAll">
        <li
          v-for="(item, index) in userApplyList"
          :key="index"
          @click="gotoApplyMsg(item)"
        >
          <div class="imgBox">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="contentBox">
            <p>
              <span>{{ item.title }}</span>
              <span>{{ item.price }}元/公斤</span>
            </p>
            <ul>
              <li>
                <span>规格</span>
                <span>{{ item.gg }}</span>
              </li>
              <li>
                <span>数量</span>
                <span>{{ item.num }}</span>
              </li>
              <li>
                <span>产地</span>
                <span>{{ item.cd }}</span>
              </li>
              <li>
                <span>仓储</span>
                <span>{{ item.ck }}</span>
              </li>
              <li>
                <span>质量</span>
                <span>{{ item.zl }}</span>
              </li>
              <li>
                <span>票据</span>
                <span>{{ item.pj }}</span>
              </li>
              <!-- <li>
                <span>电话</span>
                <span>{{ item.phone }}</span>
                <p @click.stop="toLogin">登录可见 > ></p>
              </li> -->
            </ul>
            <!-- <div class="findMsg">查看详情</div> -->
          </div>
        </li>
      </ul>
    </div>
    <div class="drugBox">
      <Title titleTxt="防风供应信息"></Title>
      <ul class="applylistAll">
        <li
          v-for="(item, index) in drugApplyList"
          :key="index"
          @click="gotoApplyMsg(item)"
        >
          <div class="imgBox">
            <img :src="item.imgUrl" alt />
          </div>
          <div class="contentBox">
            <p>
              <span>{{ item.title }}</span>
              <span>{{ item.price }}元/公斤</span>
            </p>
            <ul>
              <li>
                <span>规格</span>
                <span>{{ item.gg }}</span>
              </li>
              <li>
                <span>数量</span>
                <span>{{ item.num }}</span>
              </li>
              <li>
                <span>产地</span>
                <span>{{ item.cd }}</span>
              </li>
              <li>
                <span>仓储</span>
                <span>{{ item.ck }}</span>
              </li>
              <li>
                <span>质量</span>
                <span>{{ item.zl }}</span>
              </li>
              <li>
                <span>票据</span>
                <span>{{ item.pj }}</span>
              </li>
              <!-- <li>
                <span>电话</span>
                <span>{{ item.phone }}</span>
                <p @click.stop="toLogin">登录可见 > ></p>
              </li> -->
            </ul>
            <!-- <div class="findMsg">查看详情</div> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reqapplymsg, reqfavotite, reqaddBrowse } from "@/api/apply";
export default {
  name: "applyMsg",
  computed: {
    tokenMsg() {
      return this.$store.state.app.token;
    },
    userMsg() {
      // console.log(this.$store.state.app.userInfo);
      if (
        typeof this.$store.state.app.userInfo == "string" &&
        this.$store.state.app.userInfo != "undefined"
      ) {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  data() {
    return {
      applyMsg: {
        imgUrl: require("@/assets/images/test/apply/图层 1.png"),
        title: "防风",
        id: "002",
        gg: "统货",
        num: "100",
        cd: "北京",
        ck: "内蒙古",
        zl: "2020标准",
        pj: "发票",
        phone: "1515151515151",
        price: "20"
      },
      userApplyList: [],
      drugApplyList: [],
      applyList: [
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
          id: "002",
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
          gg: "统货",
          id: "003",
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
          gg: "统货",
          id: "004",
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
          gg: "统货",
          id: "004",
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
          gg: "统货",
          id: "004",
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
          gg: "统货",
          id: "004",
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
    let id = this.$route.query.id;
    // alert(id);
    if (this.applyList && this.applyList.length > 4) {
      this.userApplyList = this.applyList.slice(0, 4);
    } else {
      this.userApplyList = this.applyList;
    }
    if (this.applyList && this.applyList.length > 8) {
      this.drugApplyList = this.applyList.slice(0, 8);
    } else {
      this.drugApplyList = this.applyList;
    }
    // 初始化数据
    this.initSupplymsg(id);
    // 添加浏览
    this.addBrowse();
  },
  methods: {
    // 初始化数据
    initSupplymsg(id) {
      reqapplymsg({ id: id }).then(res => {
        console.log(res);
        this.applyMsg = res.data.data;
      });
    },

    addBrowse() {
      if (this.tokenMsg && this.userMsg) {
        let browseParams = {};
        browseParams.businessId = this.$route.query.id;
        browseParams.module = 0;
        reqaddBrowse(browseParams).then(res => {
          // alert();
          console.log(res);
        });
      }
    },
    favotite(e) {
      console.log(e);
      if (this.tokenMsg && this.userMsg) {
        let favotiteparams = {};
        favotiteparams.businessId = this.$route.query.id;
        favotiteparams.module = 1;
        e == 0 ? (favotiteparams.isDel = 0) : (favotiteparams.isDel = 1);
        console.log(favotiteparams);
        reqfavotite(favotiteparams).then(res => {
          console.log(res);
          e == 0
            ? this.$message.success("收藏成功")
            : this.$message.success("取消收藏成功");
          this.initSupplymsg(this.$route.query.id);
        });
      } else {
        this.$message.warning("登录后方可开启收藏功能");
        this.$router.push({
          path: "/login"
        });
      }
    },
    // 跳转详情
    gotoApplyMsg(e) {
      console.log(e.id);
      this.$router.push({
        path: "/OTC1/applyMsg",
        query: { id: e.id }
      });
    }
  }
};
</script>
<style lang="scss">
.applyMsg {
  .topBox {
    background: $boxbg;
    padding: $boxpadding;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgBox {
      // border: 1px solid red;
      img {
        width: 500px;
        height: 300px;
      }
    }
    .contentBox {
      // border: 1px solid blue;
      width: 840px;
      height: 300px;
      .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        p {
          &:hover {
            cursor: pointer;
          }
        }
        span {
          font-size: 24px;
          color: $maincolor;
          font-weight: 400;
        }
      }
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li {
          height: 38px;
          line-height: 38px;
          &:nth-child(odd) {
            // float: left;
            width: 350px;
          }
          &:nth-child(even) {
            // float: right;
            width: 480px;
          }
          span {
            color: #333333;
            &:first-child {
              display: inline-block;
              width: 100px;
              color: #666666;
            }
          }
        }
      }
    }
  }
  .userBox {
    background: $boxbg;
    padding: $boxpadding;
    margin: 44px 0;
  }
  .drugBox {
    background: $boxbg;
    padding: $boxpadding;
    .applylistAll {
      > li {
        margin-bottom: 26px;
      }
    }
  }
  .applylistAll {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
    > li {
      width: 318px;
      margin-right: 26px;
      // margin-bottom: 34px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      &:nth-child(4n) {
        margin-right: 0px;
      }
      &:hover {
        border: 1px solid rgba(58, 181, 76, 1);
        cursor: pointer;
      }
      .imgBox {
        img {
          display: inline-block;
          width: 100%;
          height: 198px;
        }
      }
      .contentBox {
        background: $boxbg;
        padding: $boxpadding;
        height: 241px;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 24px;
            color: $maincolor;
            &:last-child {
              font-size: 18px;
              color: $sencondcolor;
            }
          }
        }
        ul {
          margin-top: 15px;
          margin-bottom: 15px;
          li {
            height: 28px;
            line-height: 28px;
            &:last-child {
              position: relative;
              p {
                position: absolute;
                color: $maincolor;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            span {
              color: #333333;
              &:first-child {
                // border: 1px solid red;
                display: inline-block;
                width: 60px;
              }
            }
          }
        }
        // .findMsg {
        //   border-top: 1px solid rgba(0, 0, 0, 0.2);
        //   text-align: center;
        //   color: $maincolor;
        //   font-size: 18px;
        //   padding-top: 15px;
        // }
      }
    }
  }
}
</style>
