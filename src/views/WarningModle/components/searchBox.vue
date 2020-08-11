<template>
  <div class="searchBox">
    <Title titleTxt="相关防治措施" :btnShow="false"></Title>
    <div class="headSearch">
      <el-input placeholder="请输入关键字"></el-input>
      <el-button type="success">搜索</el-button>
    </div>
    <ul class="searchBoxList">
      <li>
        <div class="harmBox">
          <div class="title">
            <span>豆荚蟆的危害</span>
            <span>热门搜索</span>
          </div>
          <div class="imgList">
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
          </div>
          <div class="content">
            在全国范围内皆有分布，是多种作物的害虫，其钻蛀性极强，幼虫常常危害豆荚，往往将种子吃成缺刻，荚内充满粪便，引起霉烂。老虫在土壤中结茧越冬，越冬后破茧而出，在黄芪的豆荚上产卵，幼虫孵化后钻入豆荚，啃食种子。
          </div>
        </div>
        <div class="mayBox">
          <div class="title">
            <span>防治方法</span>
          </div>
          <div class="imgList">
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
          </div>
          <div class="content">
            合理轮作，避免与豆科类作物连作或间作，在冬季时在土壤中施白僵菌粉，清除老虫和虫茧，及时除草松土，在幼虫孵化期间用除虫药剂喷洒防
          </div>
        </div>
      </li>
      <li>
        <div class="harmBox">
          <div class="title">
            <span>蝗虫的危害</span>
            <span>热门搜索</span>
          </div>
          <div class="imgList">
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
          </div>
          <div class="content">
            成虫是主要危害对象，主要危害叶片花蕾，啃食后会出现残缺、空洞现象，严重时会啃食完叶片，花蕾，只剩光杆。而东亚飞蝗只吃禾本科的植
          </div>
        </div>
        <div class="mayBox">
          <div class="title">
            <span>防治方法</span>
          </div>
          <div class="imgList">
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
            <img src="@/assets/images/test/cz.png" alt="" />
          </div>
          <div class="content">
            先是控制虫子数量，防治大面积发生，如果没控制住就要赶紧用药剂毒杀，消灭成虫。可以冬季灌深水保持一个冬天，然后就可以在消灭越冬虫
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.searchBox {
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
.searchBox {
  background: $boxbg;
  padding: $boxpadding;
  width: 402px;
  height: 1185px;
  .headSearch {
    // border: 1px solid red;
    margin-top: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: relative;
    .el-input {
      // border: 1px solid $maincolor;
      border-radius: 5px 0 0 5px;
      width: 300px;
      outline: 0;
      // position: absolute;
      .el-input__inner {
        height: 100px;
        background: #ffffff;
        outline: 0;
      }
    }
    .el-button {
      // position: absolute;
      border-radius: 0 5px 5px 0;
      height: 40px;
      line-height: 10px;
    }
  }
  .searchBoxList {
    li {
      padding: 31px 0;
      &:nth-child(odd) {
        border-bottom: 1px solid #cccccc40;
      }
      .harmBox {
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
          span {
            &:first-child {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              width: 163px;
              padding-left: 10px;
              font-size: 16px;
              font-family: Microsoft YaHei;
              border: 1px solid $maincolor;
              color: $maincolor;
              background: #3ab54c10;
              border-radius: 0 30px 30px 0;
              border-left: 0;
              margin-left: -12px;
            }
            &:last-child {
              color: #ff0000;
            }
          }
        }
        .imgList {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
          img {
            height: 74px;
            width: 116px;
          }
        }
        .content {
          // border: 1px solid red;
          height: 110px;
          letter-spacing: 1px;
          line-height: 22px;
          overflow: auto;
        }
      }
      .mayBox {
        .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 17px;
          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            width: 163px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            border: 1px solid $sencondcolor;
            color: $sencondcolor;
            background: #fb921d10;
            border-radius: 0 30px 30px 0;
            border-left: 0;
            margin-left: -12px;
          }
        }
        .imgList {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
          img {
            height: 74px;
            width: 116px;
          }
        }
        .content {
          height: 65px;
          letter-spacing: 1px;
          line-height: 22px;
          overflow: auto;
        }
      }
    }
  }
}
</style>
