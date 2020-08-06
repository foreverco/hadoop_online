<template>
  <div class="perNav">
    <ul class="navTitle">
      <li>
        <!-- <img src="../../../assets/logo.png" alt="" /> -->
        <el-avatar :size="50" :src="touxiang"></el-avatar>
      </li>
      <li class="nameBox">
        吕文明
      </li>
      <li>
        <span class="plangter">种植户</span>
        <span class="plangter">15151515151</span>
      </li>
      <li>
        <el-button>发布求购信息</el-button>
      </li>
      <li>
        <el-button>发布求购信息</el-button>
      </li>
    </ul>
    <el-menu
      class="el-menu-vertical-demo"
      :default-openeds="openeds"
      :default-active="$route.path"
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
          :index="i.subIndex"
          >{{ i.label }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "PerNav",
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
            { label: "个人信息", subIndex: "/personal/center" },
            { label: "实名认证", subIndex: "/personal/certify" },
            { label: "用户调查", subIndex: "/personal/survey" },
            { label: "安全中心", subIndex: "/personal/saveCenter" },
            { label: "收货地址", subIndex: "/personal/adress" }
          ]
        },
        {
          title: "需求管理",
          itemIndex: "1",
          submenuList: [
            { label: "我的供应", subIndex: "2-1" },
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
