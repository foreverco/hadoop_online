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

    <ul class="rzList" v-if="$route.name == 'Supply'">
      <li
        v-for="(item, index) in supplyList"
        @click="changeAppyType(item.status)"
        :key="index"
        :class="{ active: applystatus == index }"
      >
        {{ item.lable }}
        {{ `(${item.count})` }}
      </li>
    </ul>

    <ul class="rzList" v-if="$route.name == 'Notes'">
      <li
        v-for="(item, index) in NotesList"
        :key="index"
        :class="{ active: $route.path == `/personal/notes/${item.value}` }"
        @click="changeNotesType(item.value)"
      >
        {{ item.name }}
      </li>
    </ul>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in routerList"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div
      class="viewBox"
      :class="{ istransform: $route.path == '/personal/notes/favorite' }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { reqgetsupplyType } from "@/api/userInfo";
export default {
  name: "PerMain",
  data() {
    return {
      supplyList: [],
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
      ],
      NotesList: [
        {
          name: "浏览记录",
          value: "browse"
        },
        {
          name: "收藏夹",
          value: "favorite"
        },
        {
          name: "交易记录",
          value: "2"
        }
      ]
    };
  },
  computed: {
    fatherType() {
      return this.$store.state.config.autonymType;
    },
    applystatus() {
      return this.$store.state.config.status;
    }
    // notesStatus() {
    //   return this.$store.state.config.notesStatus;
    // }
  },
  created() {
    this.getRouter(this.$route);
    this.getApplyType();
  },

  watch: {
    $route: {
      handler(newVal) {
        this.getRouter(this.$route);
        console.log(newVal);
      },
      immediate: true
    }
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
    },
    // 修改认证类型
    changeType(value) {
      this.$store.commit("updateautonymType", value);
    },
    // 获取供应类型
    getApplyType() {
      reqgetsupplyType().then(res => {
        console.log(res);
        this.supplyList = res.data.data;
      });
    },

    // 修改供应类型
    changeAppyType(value) {
      this.$store.commit("updateApplyType", value);
      console.log(this.$route.path);
    },
    // 修改个人记录类型
    changeNotesType(value) {
      // this.$store.commit("updatenotesStatus", value);
      this.$router.push({
        path: `/personal/notes/${value}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.perMain {
  width: calc(1440px - 360px);
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
      width: 120px;
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
  .istransform {
    background: transparent !important;
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
