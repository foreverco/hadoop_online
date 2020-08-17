<template>
  <div class="mainLayout">
    <div
      class="breadcrumbBox lvcontainer"
      v-if="
        !$route.path.includes('/personal') &&
          !$route.path.includes('/home') &&
          !$route.path.includes('/login') &&
          !$route.path.includes('/register') &&
          !$route.path.includes('/drug/index') &&
          !$route.path.includes('/insect')
      "
    >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in routerList"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      routerList: []
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      // console.log(this.$store.state.app.myChart);
      if (
        this.$store.state.app.myChart &&
        this.$store.state.app.myChart.length > 0
      )
        this.$store.state.app.myChart.forEach(item => {
          // console.log(item);
          item.resize();
        });
    });
  },
  created() {
    this.getRouter(this.$route);
  },
  methods: {
    getRouter(routeName) {
      // console.log(routeName.matched);
      let targetRoute = routeName.matched.filter(item => {
        return item.path == routeName.path;
      })[0];
      let routerArr = [];
      routerArr.push(targetRoute.parent);
      routerArr.push(targetRoute);
      this.routerList = routerArr;
    }
  },
  watch: {
    $route: {
      handler() {
        this.getRouter(this.$route);
        this.$store.state.app.myChart = [];
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss">
.mainLayout {
  width: 100%;
  .breadcrumbBox {
    padding: 15px 0;
  }
}
</style>
