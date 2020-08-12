<template>
  <div class="MarketList">
    <ul class="listBox">
      <li v-for="(item, index) in MarketList" :key="index">
        <div class="imgBox">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="msgBox">
          <div class="msgTop">
            {{ item.title }}
          </div>
          <div class="msgMid">
            {{ item.content }}
          </div>
          <div class="msgBot">
            <ul class="markBox">
              <li v-for="(i, index) in item.mark" :key="index">
                {{ i.name }}
              </li>
            </ul>
            <div class="dateBox">
              <span>发布时间:</span>
              <span>{{ item.date }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "MarketList",
  data() {
    return {
      MarketList: [
        {
          imgUrl: require("@/assets/images/test/sczx/图层 1(1).png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 2.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 3.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 4.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 5.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 6.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 7.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 8.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 7.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        },
        {
          imgUrl: require("@/assets/images/test/sczx/图层 8.png"),
          title: "浙江省金华市磐安县覆盆子价格较为平稳",
          content:
            "浙江省金华市磐安县覆盆子最近价格较为平稳，但要货的商家不是很多，货源仍以小批量走动为主，本地统货价格为40元左右，预计短期内行",
          date: "2020-7-8",
          mark: [{ name: "黄芪" }, { name: "黄芪" }, { name: "黄芪" }]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.MarketList {
  margin-top: 10px;
  > .listBox {
    > li {
      width: 100%;
      height: 154px;
      padding: 18px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        background: #3ab54c10;
        cursor: pointer;
      }
      .imgBox {
        img {
          width: 176px;
          height: 120px;
        }
      }
      .msgBox {
        width: 745px;
        height: 120px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        > div {
        }
        .msgTop {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 35px;
        }
        .msgMid {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
        }
        .msgBot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .markBox {
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              width: 84px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              border: 1px solid $maincolor;
              border-radius: 4px;
              color: $maincolor;
              margin-right: 20px;
            }
          }
          .dateBox {
            span {
              color: $maincolor;
              &:first-child {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
