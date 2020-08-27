<template>
  <div class="drugMapping lvcontainer">
    <Title titleTxt="知识图谱" :btnShow="false"></Title>
    <div class="nameBox">
      <ul class="contentBox">
        <li>{{ drugMsg.medinceName }}</li>
        <li>{{ drugMsg.medicineIntro }}</li>
        <li>
          <p>
            <span>别名:</span>
            <span>{{ drugMsg.anotherName }}</span>
          </p>
          <p>
            <span>中文名:</span>
            <span>{{ drugMsg.chineseName }}</span>
          </p>
        </li>
        <li>
          <p>
            <span>药性:</span>
            <span>
              {{ drugMsg.medicineNature }}
            </span>
          </p>
          <p>
            <span>产地:</span>
            <span v-for="(item, index) in drugMsg.places" :key="index">
              {{ item }}
            </span>
          </p>
        </li>
        <li class="titleBox">性味归经</li>
        <li>
          <span>性味:</span>
          <span>{{ drugMsg.midicineFlavour }}</span>
        </li>
        <li>
          <span>归经:</span>
          <span>{{ drugMsg.midicineEntry }}</span>
        </li>
        <li class="titleBox">功效主治</li>
        <li>
          <span>功效:</span>
          <span>{{ drugMsg.midicineEffect }}</span>
        </li>
        <li>
          <span>主治:</span>
          <span>{{ drugMsg.midicineIndications }}</span>
        </li>
        <li class="titleBox">用法用量</li>
        <li>
          <span>用法:</span>
          <span>{{ drugMsg.midicineUsage }}</span>
        </li>
        <li>
          <span>用量:</span>
          <span>{{ drugMsg.midicineDosage }}</span>
        </li>
        <li class="titleBox">炮制方法</li>
        <li>
          <span>炮制方法:</span>
          <span>{{ drugMsg.midicinePrepare }}</span>
        </li>
        <li class="titleBox">储藏方法</li>
        <li>
          <span>储藏方法:</span>
          <span>{{ drugMsg.midicineStorage }}</span>
        </li>
        <li class="titleBox">关联经典方剂</li>
        <li>
          <div
            class="aboutWays"
            v-for="(item, index) in drugMsg.plist"
            :key="index"
          >
            <i class="el-icon-s-order"></i>
            <span>{{ item.name }}</span>
            <span>功效:{{ item.indication }}</span>
          </div>
        </li>

        <li class="titleBox">药典标准</li>
        <li>
          <p>《中国药典》2015年版第一部</p>
          <p>{{ drugMsg.standard }}</p>
        </li>
      </ul>
      <div class="imgBox">
        <img :src="drugMsg.imgUrl" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { reqDrugMsg } from "@/api/drug";
export default {
  name: "drugMapping",
  data() {
    return {
      drugMsg: {
        name: "黄芪",
        content:
          "黄芪，又名绵芪。多年生草本，高50-100厘米。主根肥厚，木质，常分枝，灰白色。茎直立，上部多分枝，有细棱，被白色柔毛。多年生草本，高50-100厘米。产于内蒙古、山西、甘肃、黑龙江等地。 黄芪的药用迄今已有2000多年的历史，其有增强机体免疫功能、保肝、利尿、抗衰老、抗应激、降压和较广泛的抗菌作用。但表实邪盛，气滞湿阻，食积停滞，痈疽初起或溃后热毒尚盛等实证，以及阴虚阳亢者，均须禁服。 由于长期大量采挖，近几年来野生黄芪的数量急剧减少，有趋于绝灭的危险。为此确定该植物为渐危种，国家三级保护植物。",
        otherName: "棉芪，黄耆，独椹等",
        status: "温",
        place: "华北、东北、内蒙古和西北，主产于山西、黑龙江",
        wx: "甘，微温",
        imgUrl: require("@/assets/images/test/ddyc/黄芩.png")
      }
    };
  },
  created() {
    this.getdrugMsg(this.$route.query.id);
  },
  methods: {
    // 获取id
    getdrugMsg(e) {
      this.msg = e;
      let drugParamsid = {};
      drugParamsid.id = e;
      reqDrugMsg(drugParamsid).then(res => {
        console.log(res);
        this.drugMsg = res.data.data;
        this.drugMsg.imgUrl = require("@/assets/images/test/ddyc/黄芩.png");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.drugMapping {
  background: $boxbg;
  padding: $boxpadding;
  * {
    color: #666666;
  }
  .nameBox {
    border-top: 1px solid rgba(0, 0, 0, 0.11);
    padding: 10px 0;
    margin: 14px 0;
    display: flex;
    justify-content: space-between;
    .contentBox {
      width: 1028px;
      > li {
        // margin-bottom: 12px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        &:first-child {
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        &.titleBox {
          margin-top: 10px;
          font-size: 16px;
          padding-bottom: 10px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: $maincolor;
          border-bottom: 1px solid rgba(0, 0, 0, 0.11);
        }
        .aboutWays {
          width: 100%;
          margin-top: 15px;
          i {
            color: $sencondcolor;
            margin-right: 10px;
          }
          span {
            &:first-child {
              width: 180px;
            }
          }
        }
        span {
          padding: 10px 0;
          // display: inline-block;
          &:first-child {
            width: 90px;
            display: inline-block;
            color: #333333;
            text-align: justify;
            text-align-last: justify;
            margin-right: 10px;
          }
          &:nth-child(2) {
            width: 910px;
            line-height: 25px;
          }
        }
        &:first-child {
          color: $maincolor;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
        &:nth-child(2) {
          line-height: 30px;
        }
        &:nth-child(3) {
          border-bottom: 1px dashed #e2e2e2;
        }
        &:nth-child(3),
        &:nth-child(4) {
          display: flex;
          justify-content: space-between;
          span {
            padding: 15px 0;
          }
        }
        &:last-child {
          p {
            margin-top: 20px;
            &:last-child {
              line-height: 30px;
            }
          }
        }
      }
    }
    .imgBox {
      width: 260px;
      height: 180px;
      border: 1px dashed #333333;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
