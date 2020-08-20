<template>
  <div class="BrowseBox">
    <ul class="browseList">
      <li v-for="(item, index) in BrowseList" :key="index">
        <div class="imgBox">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="contentBox">456</div>
      </li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Browse",
  data() {
    return {
      BrowseList: [
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
  }
};
</script>
<style lang="scss">
.BrowseBox {
  .browseList {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    li {
      width: 240px;
      height: 330px;
      border: 1px solid red;
      margin-right: 13px;
      margin-bottom: 50px;
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
