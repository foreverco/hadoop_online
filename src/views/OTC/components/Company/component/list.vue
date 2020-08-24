<template>
  <div class="companyListBox lvcontainer">
    <ul class="companyList">
      <li>
        <div class="imgBox">
          <img src="" alt="">
        </div>
        <div class="contentBox">
          <p>内蒙古国草园实业科技有限公司</p>
          <p>
            <span>注册资本:</span>
            <span>1400万</span>
          </p>
          <p>
            <span>主营业务：</span>
            <ul>
              <li>黄芪、板蓝根、防风、川芎、厚柏、中药材种植、黄芪、板蓝根、防风、川芎、厚柏、中药材种植、销售及技术推广服务销售及售及技术推广服</li>
            </ul>
          </p>
          <p>
            <span>所在地区：</span>
            <span>内蒙古化德县</span>
          </p>
        </div>
      </li>
      <li>123</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "companyList"
};
</script>
<style lang="scss">
.companyListBox {
  .companyList {
    background: $boxbg;
    padding: $boxpadding;
    > li {
      border: 1px solid red;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .imgBox{
        border:1px solid red;
      }
      .contentBox{
        p{
          border: 1px solid red;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
