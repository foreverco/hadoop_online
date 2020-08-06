<template>
  <div class="footer">
    <div class="footertop">
      <div class="footercontainer lvcontainer">
        <div class="imgBox">
          <img src="@/assets/images/nav/navlogo.png" alt="" />
          <div class="headerImgBoxtxt">
            <p>药材网</p>
            <p>专注内蒙古中草药</p>
          </div>
        </div>
        <div class="footerCenter">
          <ul class="navList">
            <li v-for="(item, index) in navList" :key="index">
              {{ item.meta.title }}
            </li>
          </ul>
          <ul class="msgList">
            <li>
              <span>技术支持:</span>
              <span>江苏富宇通物联视频技术有限公司</span>
            </li>
            <li>
              <span>版权所有:</span>
              <span>江苏富宇通物联视频技术有限公司</span>
            </li>
            <li>
              <span>备案证编号:</span>
              <span>辽IPC备12015648号</span>
            </li>
          </ul>
        </div>
        <div class="footerRight">
          <ul>
            <li>
              <img src="../../../../public/images/wxerweima.png" alt="" />
              <p>蒙医药材小程序</p>
            </li>
            <li>
              <img src="../../../../public/images/dy.png" alt="" />
              <p>蒙医药材公众号</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footerbot">
      <ul class="lvcontainer">
        <li>友情链接</li>
        <li>友情链接</li>
        <li>友情链接</li>
        <li>友情链接</li>
        <li>友情链接</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: []
    };
  },
  mounted() {
    let arr = this.$router.options.routes[1].children.filter(item => {
      return item.hidden == false;
    });
    this.navList = arr;
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.footer {
  // margin-top: 170px;
  // height: 170px;
  // width: 100%;
  // position: absolute;
  // bottom: 0;
  .footertop {
    background: #ffffff;

    .footercontainer {
      // border: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
      }
      .imgBox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;

        img {
          width: 30%;
        }
        .headerImgBoxtxt {
          margin-top: 14px;
          margin-left: 5px;
          p {
            font-size: 20px;
            font-family: CTXingKaiSJ;
            font-weight: 600;
            text-align: center;
            letter-spacing: 5px;
            &:last-child {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              height: 42px;
              line-height: 42px;
              letter-spacing: 0px;
            }
          }
        }
      }
      .footerCenter {
        flex-wrap: wrap;
        ul {
          height: 50px;
        }
        .navList {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          li {
            width: 100px;
            border-right: 1px solid #888;
            color: #888;
            text-align: center;
            &:last-child {
              border-right: 0;
            }
          }
        }
        .msgList {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          li {
            color: #888;
            text-align: center;
            &:nth-child(2) {
              margin: 0 15px;
            }
          }
        }
      }
      .footerRight {
        height: 115px;

        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 125px;
            &:first-child {
              margin-right: 10px;
            }
            img {
              width: 50%;
            }
            p {
              text-align: center;
              width: 100%;
              font-size: 12px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
  .footerbot {
    background: #f0f0f0;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
}
</style>
