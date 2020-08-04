<template>
  <div class="footer">
    <div class="footercontainer lvcontainer">
      <div class="footerLeft">
        <img src="../../../assets/logo.png" alt="" />
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
  margin-top: 50px;
  background: #ffffff;
  padding: 30px 0;
  .footercontainer {
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
    }
    .footerLeft {
      width: 150px;
      img {
        width: 100%;
      }
    }
    .footerCenter {
      flex-wrap: wrap;
      // border: 1px solid red;
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
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 130px;
          &:first-child {
            margin-right: 10px;
          }
          img {
            width: 90%;
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
</style>
