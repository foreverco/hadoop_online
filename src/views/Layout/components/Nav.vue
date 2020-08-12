<template>
  <div class="nav lvallcontainer">
    <div class="navHeaderContainer">
      <div class="navHeader lvcontainer">
        <div class="headerleft">
          <span>内蒙古</span>
          <span>多云转晴</span>
          <span>{{ timer | formatTimer }}</span>
        </div>
        <ul class="headerright">
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

    <div class="headerImgBox">
      <div class="lvcontainer headerImgBoxCon">
        <div class="imgBox">
          <img src="@/assets/images/nav/navlogo.png" alt="" />
          <div class="headerImgBoxtxt">
            <p>蒙中药材网</p>
            <p>专注内蒙古中药材种种销售</p>
          </div>
        </div>
        <div class="leftBox">
          <p v-if="$route.path == '/login' || $route.path == '/register'">
            <span v-if="$route.path == '/register'"
              >已有账号,<b @click="login">马上登陆</b></span
            >
            <span v-if="$route.path == '/login'"
              >没有账号,<b @click="register">立即注册</b></span
            >
            <span>|</span>
            <span @click="$router.push({ name: 'ViewHomeindex' })"
              >返回首页</span
            >
          </p>
          <div class="headSearch" v-else>
            <el-input placeholder="请输入关键字"></el-input>
            <el-button type="success">搜索</el-button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="navContent"
      v-if="$route.path !== '/register' && $route.path !== '/login'"
    >
      <div class="navMsg lvcontainer">
        <ul class="navList">
          <template v-for="(item, index) in navList">
            <li
              :key="index"
              v-if="!item.hidden"
              :class="{ navactive: item.class_true }"
              @click="navClick(index, item.name, item)"
              @mouseover="item.navMouseIn = true"
              @mouseleave="item.navMouseIn = false"
            >
              <router-link :to="item.path">
                <span class="navTxt">{{ item.meta.title }}</span>
                <i
                  v-if="item.children"
                  :class="
                    item.navMouseIn
                      ? 'el-icon-caret-bottom'
                      : 'el-icon-caret-top'
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
        <ul class="headerright">
          <li>|</li>
          <li v-if="!userMsg" @click="login">登陆</li>
          <li v-if="!userMsg" @click="register">注册</li>
          <li v-if="userMsg" class="userList">
            <span>您好！</span>
            <span class="el-dropdown-link">
              {{ (userMsg.info && userMsg.info.nickname) || "admin" }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <dl>
              <dt @click="$router.push({ name: 'Personal' })">
                个人中心
              </dt>
              <dt>
                我的供应
              </dt>
              <dt>
                我的收藏
              </dt>
              <dt>
                <el-button type="success" @click="handlelogout">退出</el-button>
              </dt>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return {
      timer: new Date(),
      navList: [],
      navIndex: 1,
      logOutMsg: "",
      searchForm: {
        contetnt: ""
      }
    };
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  computed: {
    tokenMsg() {
      return this.$store.state.app.token;
    },
    isLogin() {
      return this.$store.state.app.isLogin;
    },
    userMsg() {
      // console.log(this.$store.state.app);
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
    this.initActive();
  },
  watch: {
    $route() {
      this.initActive();
    }
  },
  methods: {
    navClick() {},
    register() {
      this.$router.push({
        name: "Register"
      });
    },
    initActive() {
      let navListArr = this.$router.options.routes[1].children;
      // 当前路由name
      let curRouteName = this.$route.name;
      // console.log(333);
      // console.log(curRouteName);
      // 父级路由path
      let parentPath = "";
      navListArr.map(item => {
        // console.log(item);
        if (item.children) {
          item.children.map(j => {
            if (j.name === curRouteName) {
              parentPath = item.path;
            }
          });
        } else {
          // 没有子级，直接判断父级name
          if (item.name === curRouteName) {
            parentPath = item.path;
          }
        }
      });
      this.navList = this.$router.options.routes[1].children;
      this.navList.forEach(item => {
        // 判断父级path等于菜单数据path字段，设置样式选中
        if (parentPath === item.path) {
          item.class_true = true;
        } else {
          item.class_true = false;
        }
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
        status: "账号退出成功",
        fn: this.logout
      });
    },
    logout() {
      let logoutParams = { token: this.tokenMsg };
      this.$store
        .dispatch("app/clearUserInfo", logoutParams)
        .then(res => {
          console.log(res);
          // this.$message.success(res.data.msg);
          // this.logOutMsg = res.data.msg;
          // console.log(this.logOutMsg);
          this.$router.push({ name: "Login" });
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
  .navHeaderContainer {
    background: $maincolor;
    height: 30px;
    display: flex;
    align-items: center;
    .navHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .headerleft {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #ffffff;
          margin: 0 5px;
          // font-size: 14px;
          // letter-spacing: 5px;
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
          color: #fff;
          &:last-child {
            border-right: 0;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .userList {
          position: relative;
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

  .headerImgBox {
    // background: #ccc;
    background: url("../../../assets/images/nav/navbg.png") no-repeat;
    background-size: 100% 100%;
    .headerImgBoxCon {
      // border: 1px solid red;
      height: 138px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .imgBox {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          // width: 100%;
        }
        .headerImgBoxtxt {
          margin-left: 18px;
          margin-top: 14px;
          p {
            font-size: 40px;
            font-family: CTXingKaiSJ;
            font-weight: 400;
            text-align: center;
            letter-spacing: 5px;
            &:last-child {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              height: 42px;
              line-height: 42px;
            }
          }
        }
      }
      .leftBox {
        .headSearch {
          // border: 1px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          // position: relative;
          .el-input {
            border: 1px solid #ffffff;
            border-radius: 5px 0 0 5px;
            width: 300px;
            // position: absolute;
            .el-input__inner {
              background: #ffffff;
              border: 1px solid #ffffff;
            }
          }
          .el-button {
            // position: absolute;
            border-radius: 0 5px 5px 0;
          }
        }
        p {
          span {
            letter-spacing: 5px;
            margin: 0 8px;
            b {
              font-weight: 600;
              color: $sencondcolor;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            &:last-child {
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .navContent {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    background: $maincolor;
    .navMsg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .navList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .navactive {
          #line {
            width: 90%;
            bottom: 2px;
            height: 2px;
            background-color: #ffffff;
          }
        }
        li {
          font-size: 15px;
          height: 60px;
          width: 120px;
          // border-bottom: 2px solid #fff;
          // margin-bottom: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: all 0.2s linear;

          &:hover {
            background: #ffffff;
            cursor: pointer;
            > a {
              span {
                color: $maincolor;
                // transform: translateY(-5px);
              }
              i {
                color: $maincolor;
                // transform: translateY(-5px);
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
              color: #ffffff;
              transition: all 0.2s linear;
            }
            i {
              font-size: 16px;
              font-weight: 600;
              color: #ffffff;
              margin-left: 5px;
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
            width: 155px;
            top: 100%;
            left: 0;
            // left: 50%;
            // transform: translateX(-50%);
            z-index: 203;
            // box-shadow: 0 0 3px 1px #ccc;
            background: #fff;
            box-sizing: content-box;
            dt {
              width: 100%;
              height: 100%;
              text-align: center;
              transition: all 0.2s linear;
              box-sizing: content-box;
              padding: 10px 0;
              &:hover {
                // transform: translateX(5px);
                background: #3ab54c20;
                a {
                  color: #333333;
                }
              }
              a {
                color: $maincolor;
                // border-bottom: 1px solid #fff;
                font-size: 14px;
                text-align: center;
                text-decoration: none;
                height: 100%;
                width: 90%;
                color: #333333;
                display: inline-block;
                padding: 10px;
                transition: all 0.2s linear;
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
          color: #fff;
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
              color: $maincolor;
              // border: 1px solid red;
              display: flex;
              align-items: center;
              justify-content: center;
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
      }
    }
  }
}
</style>
