<template>
  <div id="main" class="econtainer" ref="chart"></div>
</template>
<script>
export default {
  name: "Echarts",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.$echarts.init(this.$refs.chart);
    let option = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    // 绘制图表
    myChart.setOption(option);
  },
  methods: {
    initChart(container, option) {
      const myChart = this.$echarts.init(container);
      // 绘制图表
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.econtainer {
  width: 100%;
  height: 100%;
}
</style>
