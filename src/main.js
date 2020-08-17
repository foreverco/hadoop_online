import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";
import "lib-flexible";

//高德地图
import "./plugin/aMap";
Vue.config.productionTip = false;
Vue.use(ElementUI);

// 全局组件
import "./components/TitleTxt";
// upload
import PermissionUpload from "./components/PermissionUpload/index";
Vue.component("per-upload", PermissionUpload);

// vue-video-player
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
Vue.use(VideoPlayer);

// echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import LvChart from "@/plugin/lv_echarts";
Vue.use(LvChart);
import Lvconfirm from "./util/global";
Vue.use(Lvconfirm);

/* animate.css */
import "wowjs/css/libs/animate.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
