<template>
  <div class="nav lvallcontainer">
    <div class="aaa">
      <div class="navHeader lvcontainer">
        <div class="headerleft">
          <img src="@/assets/images/timg.jpg" alt />
          大数据分析平台
        </div>

        <ul class="headerright">
          <li v-if="!userMsg" @click="login">登陆</li>
          <li v-if="!userMsg" @click="register">注册</li>
          <li v-if="userMsg" class="userList">
            <span>您好！</span>
            <span class="el-dropdown-link">
              {{ (userMsg.info && userMsg.info.nickname) || "空" }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <dl>
              <dt @click="$router.push({ name: 'Personal' })">
                个人中心
              </dt>
              <dt>
                123
              </dt>
              <dt>
                123
              </dt>
              <dt>
                <el-button type="success" @click="handlelogout">退出</el-button>
              </dt>
            </dl>
          </li>
          <li class="weixinBox">
            <span>公众号</span>
            <img src="../../../../public/images/wxerweima.png" alt="" />
          </li>
          <li class="cxBox">
            <span>小程序</span>
            <img src="../../../../public/images/dy.png" alt="" />
          </li>
        </ul>
      </div>
    </div>

    <div class="navContent lvcontainer">
      <!-- <div class="navLogoBox">
        <img src="@/assets/images/timg.jpg" alt>
      </div>-->

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
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      navList: [],
      navIndex: 0,
      logOutMsg: "",
      searchForm: {
        contetnt: ""
      }
    };
  },
  computed: {
    tokenMsg() {
      return this.$store.state.app.token;
    },
    isLogin() {
      return this.$store.state.app.isLogin;
    },
    userMsg() {
      console.log(typeof this.$store.state.app.userInfo);
      if (typeof this.$store.state.app.userInfo == "string") {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  beforeMount() {
    this.$router.options.routes[1].children.forEach(item => {
      item.navMouseIn = false;
    });
    this.navList = this.$router.options.routes[1].children;
  },
  mounted() {
    // this.$store.dispatch("app/getUser");
  },
  methods: {
    navClick() {},
    register() {
      this.$router.push({
        name: "Register"
      });
    },
    login() {
      if (this.$route.name != "Login") {
        this.$router.push({
          name: "Login"
        });
      }
    },
    // 登出
    handlelogout() {
      this.confirm({
        tip: "退出",
        content: "确认退出登陆？",
        status: this.logOutMsg,
        fn: this.logout
      });
    },
    logout() {
      let logoutParams = { token: this.tokenMsg };
      this.$store
        .dispatch("app/clearUserInfo", logoutParams)
        .then(res => {
          // this.$message.success(res.data.msg);
          this.logOutMsg = res.data.msg;
        })
        .catch(error => {
          this.$message.success(error.data.msg);
        });
    }
  }
};
</script>
<style lang="scss">
.nav {
  // border: 1px solid blue;
  width: 100%;
  .aaa {
    background: $maincolor;
    display: flex;
    align-items: center;
    .navHeader {
      display: flex;
      justify-content: space-between;
      background: blue;
      align-items: center;
      .headerleft {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // flex: 4;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 5px;
        img {
          height: 30px;
        }
      }
      .searchBox {
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .el-form {
          display: flex;
          justify-content: center;
          align-items: center;
          .el-form-item {
            display: flex;
            justify-content: center;
            align-items: center;
            .el-form-item__content {
              display: flex;
              justify-content: center;
              align-items: center;
              .el-input__inner {
                height: 40px;
              }
            }
          }
        }
      }
      .headerright {
        display: flex;
        // flex: 1;
        justify-content: space-between;
        align-items: center;
        li {
          padding: 0 10px;
          height: $NavHeight;
          line-height: $NavHeight;
          &:last-child {
            border-right: 0;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .userList {
          position: relative;
          // .el-dropdown {
          //   color: black;
          //   font-size: 15px;
          //   .el-dropdown-item {
          //     border: 1px solid red;
          //   }
          // }
          &:hover {
            dl {
              height: 280px;
            }
          }
          dl {
            width: 150%;
            position: absolute;
            top: $NavHeight;
            left: 50%;
            transform: translateX(-50%);
            z-index: 110;
            background: #fff;
            height: 0;
            overflow: hidden;
            transition: ease-in-out 0.6s;
            dt {
              text-align: center;
              background: #fff;
              height: 70px;
              &:hover {
                background: #cccccc90;
              }
              &:last-child {
                border-radius: 0 0 10px 10px;
                &:hover {
                  background: #fff;
                }
              }
            }
          }
        }
        .weixinBox {
          position: relative;
          &:hover {
            img {
              display: block;
            }
          }
          img {
            display: none;
            position: absolute;
            top: $NavHeight;
            left: 50%;
            transform: translateX(-50%);
            z-index: 110;
          }
        }
        .cxBox {
          position: relative;
          &:hover {
            img {
              display: block;
            }
          }
          img {
            display: none;
            position: absolute;
            top: $NavHeight;
            left: 50%;
            transform: translateX(-50%);
            z-index: 110;
          }
        }
      }
    }
  }

  .navContent {
    // background: yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // .navLogoBox {
    //   img {
    //     height: 50px;
    //   }
    // }
    .navList {
      // background: blue;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        font-size: 15px;
        height: 50px;
        padding: 0 15px;
        // margin: 0 15px;
        // border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: all 0.2s linear;
        &:hover {
          background: #00b6a830;
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
            font-size: 16px;
            font-weight: 600;
            color: $maincolor;
            transition: all 0.2s linear;
          }
          i {
            font-size: 16px;
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
          // border-top: 1px solid red;

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
