<template>
  <div class="jsdc-chart-card">
    <canvas :id="id" :ref="id"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import { uniqueId } from "lodash";

export default {
  name: "LineChart",
  data() {
    return {
      id: uniqueId(),
      chart: undefined,
    };
  },
  props: {
    title: String,
    uid: String,
    dataScale: {
      type: Number,
      default: 1
    },
    labels: {
      type: Array,
    },
    datas: {
      type: Array,
    },
    unit: {
      type: String,
    },
  },
  mounted() {
    this.updateChart()
  },
  beforeDestroy() 
    {
      console.log('des')
      if (this.chart) {
        this.chart.destroy()
      }
    },
  updated()
    {
      console.log('update hook')
    },
  watch: 
    {
      uid: {
        handler() { this.updateChart(); console.log('update by uid') }
      },
      // labels: {
      //   handler() { this.updateChart() }
      // },
      // datas: {
      //   handler() { this.updateChart() }
      // },
      // unit: {
      //   handler() { this.updateChart() }
      // }
    },
  methods: {
    updateChart()
    {
      const ref = this.$refs[this.id];
      if (this.chart) this.chart.destroy()
      this.chart = new Chart(ref, this.getConfig())
    },
    getConfig() {
      const data = {
      labels: this.labels,
      datasets: [
        {
          data: this.datas.map(data => this.dataScale * data),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
      return {
        type: "line",
        data,
        options: 
        {
          legend: { display: false },
            title: {
                display: true,
                text: this.title
          },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} ${this.unit}`
                }
              }
            ]
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.jsdc-chart-card{
  position: relative;
  margin: 10px;
  height: 200px;
  // max-width: 200px;
}
</style>