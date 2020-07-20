<template>
  <div class="nav lvallcontainer">
    <div class="navHeader">
      <div class="headerleft">
        <img src="@/assets/images/timg.jpg" alt="" />
        大数据分析平台
      </div>
      <ul class="headerright">
        <li>登陆</li>
        <li>注册</li>
        <li>公众号</li>
        <li>小程序</li>
      </ul>
    </div>
    <div class="navContent lvcontainer">
      <div class="navLogoBox">
        <img src="@/assets/images/timg.jpg" alt="" />
      </div>
      <ul class="navList">
        <li>首页</li>
        <li>虫情预警</li>
        <li>首页</li>
        <li>虫情预警</li>
        <li>首页</li>
        <li>虫情预警</li>
        <li>首页</li>
        <li>虫情预警</li>
        <li>首页</li>
        <li>虫情预警</li>
        <li>首页</li>
        <li>虫情预警</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav"
};
</script>
<style lang="scss">
.nav {
  // border: 1px solid blue;
  width: 100%;
  .navHeader {
    width: 100%;
    height: 40px;
    background: $c9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerleft {
      margin-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // flex: 4;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 5px;
      img {
        height: 30px;
        margin-right: 10px;
      }
    }
    .headerright {
      display: flex;
      // flex: 1;
      justify-content: space-between;
      align-items: center;
      li {
        border-right: 1px solid #ccc;
        padding: 0 10px;
        &:last-child {
          border-right: 0;
        }
      }
    }
  }
  .navContent {
    background: yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navLogoBox {
      img {
        height: 50px;
      }
    }
    .navList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        font-size: 15px;
        height: 50px;
        padding: 0 5px;
        margin: 0 5px;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
