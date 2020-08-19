<template>
  <div class="perNav">
    <ul class="navTitle">
      <li>
        <!-- <img src="../../../assets/logo.png" alt="" /> -->
        <el-avatar :size="50" :src="userMsg.info.headUrl"></el-avatar>
      </li>
      <li class="nameBox">
        {{ userMsg.info.nickname }}
      </li>
      <li>
        <span class="plangter">{{
          userMsg.role.length == 0 ? "未实名认证" : userMsg.role[0].roleName
        }}</span>
        <span class="plangter">{{ userMsg.info.username }}</span>
      </li>
      <li>
        <el-button @click="gotoGy">发布供应信息</el-button>
      </li>
      <li>
        <el-button>发布求购信息</el-button>
      </li>
    </ul>
    <el-menu
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      :default-active="$route.name"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <el-submenu
        v-for="(item, index) in menuList"
        :key="index"
        :index="index + ''"
      >
        <template slot="title">
          <span slot="title" class="menuTitle">{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(i, ind) in item.submenuList"
          :key="ind"
          :index="i.name"
          :route="{ path: i.subIndex }"
          >{{ i.label }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { removeApplyForm } from "@/util/storage";

export default {
  name: "PerNav",
  computed: {
    userMsg() {
      if (
        typeof this.$store.state.app.userInfo == "string" &&
        this.$store.state.app.userInfo != "undefined"
      ) {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log(to);
        console.log(from);
        if (to.name != "Supply") {
          removeApplyForm();
        }
      },
      deep: true,
      // 初始化监听
      immediate: true
    }
  },
  data() {
    return {
      isCollapse: false,
      openeds: ["0", "1"],
      touxiang: require("@/assets/images/test1.png"),
      menuList: [
        {
          title: "用户设置",
          itemIndex: "1",
          submenuList: [
            {
              label: "个人信息",
              name: "PerCenter",
              subIndex: "/personal/center"
            },
            {
              label: "实名认证",
              name: "Certify",
              subIndex: "/personal/certify"
            },
            {
              label: "用户调查",
              name: "Survey",
              subIndex: "/personal/survey"
            },
            {
              label: "安全中心",
              name: "SaveCenter",
              subIndex: "/personal/saveCenter"
            },
            {
              label: "收货地址",
              name: "Adress",
              subIndex: "/personal/adress"
            }
          ]
        },
        {
          title: "需求管理",
          itemIndex: "1",
          submenuList: [
            { label: "我的供应", name: "Supply", subIndex: "/personal/supply" },
            { label: "我的求购", subIndex: "2-2" }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoGy() {
      if (this.$route.path !== "/personal/supply/addsupply") {
        this.$router.push({
          path: "/personal/supply/addsupply"
        });
      } else {
        this.$message.warning("当前已在供应信息发布页面");
      }
    }
  }
};
</script>
<style lang="scss">
.perNav {
  // background: pink;
  margin-right: 20px;
  width: $perNav;
  .navTitle {
    // border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #ffffff;
    margin-bottom: 20px;
    li {
      width: 100%;
      text-align: center;
      margin: 10px 0;
      &.nameBox {
        font-size: 18px;
        font-family: Microsoft YaHei;
      }
      .plangter {
        padding: 0 5px;
        &:first-child {
          border-right: 1px solid #ccc;
        }
      }
      .el-button {
        background: $maincolor;
        width: 215px;
        // height: 36px;
        border-radius: 8px;
        color: #ffffff;
        font-size: 16px;
        letter-spacing: 5px;
      }
    }
  }
  .el-menu {
    .el-submenu__title {
      color: $maincolor;
      font-size: 14px;
      font-weight: 600;
    }
    .el-menu-item.is-active {
      border-left: 3px solid $maincolor;
      background-image: linear-gradient(to right, #3ab54c20, transparent);
      color: #000000;
      font-weight: 600;
    }
    .menuTitle {
      font-size: 18px;
    }
    .el-submenu {
      border-top: 1px solid #ccc;
      &:first-child {
        border-top: 0;
      }
    }
  }
}
</style>
