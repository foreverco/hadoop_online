<template>
  <div class="perNav">
    <div class="navTitle">
      个人中心
    </div>
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
  border: 1px solid #ccc;
  margin-right: 20px;
  width: $perNav;
  .navTitle {
    text-align: center;
    height: 70px;
    line-height: 70px;
    font-size: 25px;
    font-weight: 700;
    // border-bottom: 1px solid #ccc;
    background: #ffffff;
  }
  .el-menu {
    .menuTitle {
      font-size: 18px;
    }
    .el-submenu {
      border-top: 1px solid #ccc;
    }
  }
}
</style>
