import Line from "./line.vue";
import Bar from "./bar.vue";
import Pie from "./pie.vue";
export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        initChart(container, option, onclick) {
          const myChart = this.$echarts.init(container);
          myChart.off("click");
          // 绘制图表
          console.log(option);
          option.color = ["#FF9539", "#3ab54c"];
          myChart.setOption(option);
          if (onclick) {
            myChart.on("click", onclick);
          }
          // this.$store.state.app.myChart.push(myChart);
          console.log(myChart);
        }
      }
    });
    Vue.component("LineEchartsVue", Line);
    Vue.component("BarEchartsVue", Bar);
    Vue.component("PieEchartsVue", Pie);
  }
};
