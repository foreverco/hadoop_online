<template>
  <div class="newsContainer">
    <ul class="listBox">
      <li
        v-for="(item, index) in records"
        :key="index"
        @click="gotoMsg(item.id)"
      >
        <div class="imgBox">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="msgBox">
          <div class="msgTop" :title="item.title">
            {{ item.title }}
          </div>
          <div class="msgMid">
            {{ item.context }}
          </div>
          <div class="msgBot">
            <ul class="markBox">
              <li v-for="(i, index) in item.labelList" :key="index">
                {{ i.labelName }}
              </li>
            </ul>
            <div class="dateBox">
              <span>发布时间:</span>
              <span>{{ item.releaseTime }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    records: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // records: [
      //   {
      //     id: "001",
      //     imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
      //     title: "黄芪",
      //     context: "黄芪黄芪黄芪黄芪黄芪",
      //     releaseTime: "2020-08-20",
      //     labelList: [
      //       {
      //         labelName: "黄芪"
      //       }
      //     ]
      //   },
      //   {
      //     id: "001",
      //     imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
      //     title: "黄芪",
      //     context: "黄芪黄芪黄芪黄芪黄芪",
      //     releaseTime: "2020-08-20",
      //     labelList: [
      //       {
      //         labelName: "黄芪"
      //       }
      //     ]
      //   },
      //   {
      //     id: "001",
      //     imgUrl: require("@/assets/images/test/sczx/图层 11.png"),
      //     title: "黄芪",
      //     context: "黄芪黄芪黄芪黄芪黄芪",
      //     releaseTime: "2020-08-20",
      //     labelList: [
      //       {
      //         labelName: "黄芪"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    gotoMsg(e) {
      this.$emit("getNewsid", e);
    }
  }
};
</script>

<style scoped lang="scss">
.newsContainer {
  .listBox {
    > li {
      width: 100%;
      height: 154px;
      padding: 18px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.11);
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
        width: 1146px;
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
          white-space: nowrap; /* 规定文本是否折行 */
          overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
          text-overflow: ellipsis;
        }
        .msgMid {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
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
