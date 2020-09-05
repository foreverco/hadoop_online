<template>
  <div class="lvcontainer plantingNormBox">
    <div class="checkBox">
      <p>品种选择</p>
      <ul>
        <li v-for="(item, index) in drugTypeList" :key="index">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="topBox">
      <div class="titleBox">
        <Title
          titleTxt="标准化种植指导"
          btnMsg="*本种植指导模型仅限于内蒙古"
          btnColor="red"
        ></Title>
      </div>
      <div class="contentBox">
        <div class="leftBox">
          <div class="nameBox">
            黄芪
          </div>
          <div class="imgBox">
            <img
              src="../../../../assets/images/test/plantingzd/模型.png"
              alt=""
            />
          </div>
        </div>
        <div class="rightBox">
          <div class="listBox">
            <p class="titleP">种植方式</p>
            <ul>
              <li>
                <p>播种:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>移栽:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>根插:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
            </ul>
          </div>

          <div class="listBox">
            <p class="titleP">栽培技术</p>
            <ul>
              <li>
                <p>选地整地:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>种子处理:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>田间管理:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>采收加工:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
              <li>
                <p>留种:</p>
                <p>
                  分春播、伏播和秋播。春播于4月中旬至5月上旬，伏播于6月下旬至7月上旬，秋播于9月下旬至10月上旬。春播应注意土壤墒情。播种方法有穴播、条播和撒播，但主要为穴播和条播。在生产上多采用直播，田间管理方便，省工而产量高，质量好。在生产上多采用直播，田间管理方便。
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="botBox">
      <Title titleTxt="植保模型" :btnShow="false"></Title>
      <div class="selBox">
        <el-row>
          <el-col :span="10" :offset="14">
            <el-form>
              <el-form-item label="植保类型">
                <el-select v-model="bignorm">
                  <el-option
                    v-for="(item, index) in bignormList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="smallnorm">
                  <el-option
                    v-for="(item, index) in smallnormList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="modelBox">
        <div class="imgBox">123</div>
        <div class="contentBox">
          <div class="modelList">
            <h3>虫害简介</h3>
            <p>
              蚜虫，又称腻虫、蜜虫，是一类植食性昆虫，包括蚜总科(又称蚜虫总科，学名:Aphidoidea)下的所有成员。目前已经发现的蚜虫总共有10个科约4400种，其中多数属于蚜科。蚜虫也是地球上最具破坏性的害虫之一。
              其中大约有250种是对于农林业和园艺业危害严重的害虫。
              蚜虫的大小不一，身长从一到十毫米不等。
              蚜虫的天敌有瓢虫、食蚜蝇、寄生蜂、食蚜瘿蚊(aphid midge
              larvae)、蟹蛛、草蛉以及昆虫病原真菌(entomopathogenic
              fungi，含绿僵菌)。
            </p>
          </div>
          <div class="modelList">
            <h3>防治方法</h3>
            <p>
              分为苗蚜和穗蚜两个危害阶段，应采取“挑治苗蚜、主治穗蚜”的策略。当田间百株蚜量达500头、益害比大于1∶500时，每亩用25%蚜螨清乳油50毫升，或吡虫啉系列产品1500～2000倍液喷雾，10%的蚜虱净60-70克；20%的吡虫啉2500倍液；25%的抗蚜威3000倍液喷雾防治。麦蚜对吡虫啉和啶虫脒产生抗药性的麦区不宜单一使用药剂，可与低毒有机磷农药合理混配喷施
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Planting1",
  data() {
    return {
      /* 药材类型 */
      drugTypeList: [
        {
          label: "黄芪",
          value: "001"
        },
        {
          label: "黄芪",
          value: "001"
        },
        {
          label: "黄芪",
          value: "001"
        },
        {
          label: "黄芪",
          value: "001"
        }
      ],
      /* 植保类型大类 */
      bignorm: "",
      bignormList: [
        {
          label: "虫害",
          value: "1"
        },
        {
          label: "病害",
          value: "2"
        }
      ],
      /* 植保类型小类 */
      smallnorm: "",
      smallnormList: [
        {
          label: "蚜虫",
          value: "1"
        },
        {
          label: "蝗虫",
          value: "2"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.plantingNormBox {
  .checkBox {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      margin-right: 20px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        margin-right: 15px;
        background: #ccc;
        color: #ffffff;
        padding: 5px 15px;
        border-radius: 16px;
        &:hover {
          cursor: pointer;
          background: $maincolor;
        }
      }
    }
  }
  .topBox {
    background: $boxbg;
    padding: $boxpadding;
    margin: 20px 0;
    .titleBox {
      margin-bottom: 25px;
    }
    .contentBox {
      display: flex;
      justify-content: space-between;
      height: 770px;
      .leftBox {
        width: 375px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .nameBox {
          width: 55px;
          height: 55px;
          line-height: 55px;
          border-radius: 55px;
          box-sizing: content-box;
          text-align: center;
          background: $maincolor;
          color: #ffffff;
          border: 5px solid #a0e2ba;
        }
        .imgBox {
          width: 375px;
          height: 667px;
          border: 1px dashed rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 90%;
            height: 90%;
          }
        }
      }
      .rightBox {
        // border: 1px solid red;
        width: 936px;
        .listBox {
          .titleP {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fd890a;
            line-height: 35px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.11);
            margin-bottom: 15px;
          }
          ul {
            li {
              display: flex;
              justify-content: flex-start;
              margin-bottom: 20px;
              p {
                color: #666666;
                &:first-child {
                  color: $maincolor;
                  width: 100px;
                  text-align: justify;
                  text-align-last: justify;
                  // border: 1px solid red;
                  // display: flex;
                  // align-items: center;
                  padding-top: 10px;
                  margin-right: 10px;
                }
                &:last-child {
                  line-height: 30px;
                  width: 833px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
    }
  }
  .botBox {
    padding: $boxpadding;
    background: $boxbg;
    .selBox {
      .el-select {
        margin-left: 10px;
      }
    }
    .modelBox {
      display: flex;
      justify-content: space-between;
      .imgBox {
        border: 1px solid red;
        width: 550px;
      }
      .contentBox {
        border: 1px solid red;
        width: 760px;
        .modelList {
          &:first-child {
            margin-bottom: 20px;
          }
          h3 {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fd890a;
            border-bottom: 1px solid rgba(0, 0, 0, 0.11);
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          p {
            line-height: 30px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
