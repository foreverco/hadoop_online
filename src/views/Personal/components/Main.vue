<template>
  <div class="perMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in routerList"
        :key="index"
        :to="{ path: '/' }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "PerMain",
  data() {
    return {
      routerList: []
    };
  },
  created() {
    this.getRouter(this.$route);
  },
  watch: {
    $route(newVal) {
      console.log(newVal);
      this.getRouter(this.$route);
      // let targetRoute = this.$route.matched.filter(item => {
      //   return item.path == newVal.path;
      // })[0];
      // let routerArr = [];
      // routerArr.push(targetRoute.parent);
      // routerArr.push(targetRoute);
      // this.routerList = routerArr;
    }
  },
  methods: {
    getRouter(routeName) {
      console.log(routeName.matched);
      let targetRoute = routeName.matched.filter(item => {
        return item.path == routeName.path;
      })[0];
      let routerArr = [];
      routerArr.push(targetRoute.parent);
      routerArr.push(targetRoute);
      this.routerList = routerArr;
    }
  }
};
</script>
<style lang="scss">
.perMain {
  width: calc(1440px - 400px);
  // width: calc(100vw - $perNav);
  border: 1px solid #ccc;
  background: #ffffff;
  padding: 20px;
  .el-breadcrumb {
    margin-bottom: 20px;
  }
}
</style>
