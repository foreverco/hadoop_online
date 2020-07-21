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
        <template v-for="(item, index) in navList">
          <li
            :key="index"
            v-if="!item.hidden"
            :class="index == navIndex ? 'active' : ''"
            @click="navClick(index, item.name, item)"
            @mouseover="item.navMouseIn = true"
            @mouseleave="item.navMouseIn = false"
          >
            <router-link :to="item.path">
              <span class="navTxt">{{ item.meta.title }}</span>
              <span class="navTxt">{{ item.navMouseIn }}</span>
              <i
                v-if="item.children"
                :class="
                  item.navMouseIn ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                "
              ></i>
              <div id="line"></div>
            </router-link>
            <dl v-if="item.children && item.children.length > 0">
              <dt v-for="(i, n) in item.children" :key="n">
                <router-link :to="i.path">{{ i.meta.title }}</router-link>
              </dt>
            </dl>
          </li>
        </template>
      </ul>
      <!-- <ul class="navList">
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
      </ul> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      navList: [],
      navIndex: 0
    };
  },
  beforeMount() {
    this.navList = this.$router.options.routes[1].children;
    this.navList.forEach(item => {
      item.navMouseIn = false;
    });
    console.log(this.$router.options.routes[1].children);
  },
  mounted() {},
  methods: {
    navClick() {}
  }
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
        padding: 0 15px;
        margin: 0 15px;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:hover {
          background: #81b25b20;
          cursor: pointer;
          > a {
            span {
              transform: translateY(-5px);
            }
            i {
              transform: translateY(-5px);
            }
          }
          dl {
            display: block;
          }
          #line {
            width: 100%;
          }
        }
        > a {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 20px;
            font-weight: 600;
            color: $maincolor;
            transition: all 0.2s linear;
          }
          i {
            font-size: 20px;
            font-weight: 600;
            color: $maincolor;
            transition: all 0.2s linear;
          }
          #line {
            width: 0px;
            height: 3px;
            border-radius: 2px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background-color: $maincolor;
            margin: 0 auto;
            transition: all 0.6s ease;
          }
        }
        dl {
          display: none;
          position: absolute;
          width: 125px;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 103;
          // box-shadow: 0 0 3px 1px #ccc;
          background: #fff;
          padding: 0 20px;
          box-sizing: content-box;
          border-top: 1px solid red;

          dt {
            width: 100%;
            /* padding: 10px; */
            color: #fff;
            height: 100%;
            width: 100%;
            text-align: center;
            transition: all 0.2s linear;
            &:hover {
              transform: translateX(5px);
              a {
                color: #24585290;
              }
            }
            a {
              color: $maincolor;
              border-bottom: 1px solid #fff;
              font-size: 14px;
              text-align: center;
              text-decoration: none;
              height: 100%;
              width: 90%;
              display: inline-block;
              padding: 10px;
              transition: all 0.2s linear;
            }
          }
        }
      }
    }
  }
}
</style>
