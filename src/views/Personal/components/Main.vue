<template>
  <div class="perMain">
    <ul class="rzList" v-if="$route.path == '/personal/certify'">
      <li
        v-for="(item, index) in typeList"
        @click="changeType(index)"
        :key="index"
        :class="{ active: fatherType == index }"
      >
        {{ item.name }}
      </li>
    </ul>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in routerList"
        :key="index"
        :to="{ path: '/' }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="viewBox">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "PerMain",
  data() {
    return {
      routerList: [],
      typeList: [
        {
          name: "个人认证",
          value: 0
        },
        {
          name: "企业认证",
          value: 1
        }
      ]
    };
  },
  computed: {
    fatherType() {
      return this.$store.state.config.autonymType;
    }
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
    },
    changeType(value) {
      this.$store.commit("config/updateautonymType", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.perMain {
  width: calc(1440px - 400px);
  // width: calc(100vw - $perNav);
  .rzList {
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    li {
      height: 60px;
      text-align: center;
      line-height: 60px;
      width: 80px;
      margin-left: 44px;
      color: #666666;
      &:hover {
        cursor: pointer;
        background: #00000010;
      }
      &.active {
        border-bottom: 3px solid $maincolor;
        color: #333333;
      }
    }
  }
  .viewBox {
    background: #ffffff;
    padding: 20px;
    min-height: calc(100vh - 170px);
  }
  .el-breadcrumb {
    margin-bottom: 20px;
  }
}
</style>
