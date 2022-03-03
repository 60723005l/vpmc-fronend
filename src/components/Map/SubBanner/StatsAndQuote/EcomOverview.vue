<template>
  <div>
    <md-dialog :md-active="open">
      <md-dialog-title>總經概覽</md-dialog-title>
      <md-tabs md-dynamic-height>
        <md-tab md-label="經濟成長（yoy）">
          <div class="jsdc-chart-card">
            <canvas :ref="'ecom'" id="ecom"></canvas>
          </div>
        </md-tab>

        <md-tab md-label="中央銀行利率">
          <div class="jsdc-chart-card">
            <canvas :ref="'ratio'" id="ratio"></canvas>
          </div>
        </md-tab>

        <md-tab md-label="消費者信心指數">
          <div class="jsdc-chart-card">
            <canvas :ref="'confidence'"></canvas>
          </div>
        </md-tab>
        <md-tab md-label="批發、零售及餐飲業營業額">
          <div class="jsdc-chart-card">
            <canvas :ref="'sales'"></canvas>
          </div>
        </md-tab>
        <md-tab md-label="工業生產指數">
          <div class="jsdc-chart-card">
            <canvas :ref="'industr'"></canvas>
          </div>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="$emit('onClose')">關閉</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<script>
import Chart from "chart.js"
import ecomJson from './datas/ecom.json'
import rotioJson from './datas/ratio.json'
import confidenceJson from './datas/confidence.json'
import salesJson from './datas/sales.json'
import industrJson from './datas/industr.json'
import { uniqueId } from 'lodash'

export default {
  name: 'EcomOverview',
  data() {
    return {
      id: uniqueId(),
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.InitEcomChart()
    this.InitRatioChart()
    this.InitConfidenceChart()
    this.InitSalesChart()
    this.InitIndustrChart()
  },
  methods: {
    InitEcomChart()
    {
      const ref = this.$refs['ecom'];
      const data = {
        labels: ecomJson.labels,
        datasets: [
          {
            data: ecomJson.values,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }
      const config = {
        type: "line",
        data,
        options: 
        {
          responsive: true,
          legend: { display: false },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} %`
                }
              }
            ]
          }
        }
      }
      const chart = new Chart(ref, config)
    },
    InitRatioChart()
    {
      const ref = this.$refs['ratio'];
      const data = {
        labels: rotioJson.labels.reverse(),
        datasets: [
          {
            label: '重貼現率',
            data: rotioJson['重貼現率'].reverse(),
            fill: false,
            borderColor: "rgb(200, 192, 192)",
            tension: 0.1,
          },
          {
            label: '擔保放款融通利率',
            data: rotioJson['擔保放款融通利率'].reverse(),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: '短期融通利率',
            data: rotioJson['短期融通利率'].reverse(),
            fill: false,
            borderColor: "rgb(75, 200, 100)",
            tension: 0.1,
          },
        ],
      }
      const config = {
        type: "line",
        data,
        options: 
        {
          responsive: true,
          legend: { display: true },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} %`
                }
              }
            ]
          }
        }
      }
      const chart = new Chart(ref, config)
    },
    InitConfidenceChart()
    {
      const ref = this.$refs['confidence'];
      const data = {
        labels: confidenceJson.labels.reverse(),
        datasets: [
          {
            label: '重貼現率',
            data: confidenceJson.values.reverse(),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          }
        ],
      }
      const config = {
        type: "line",
        data,
        options: 
        {
          responsive: true,
          legend: { display: false },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} 點`
                }
              }
            ]
          }
        }
      }
      const chart = new Chart(ref, config)
    },
    InitSalesChart()
    {
      const ref = this.$refs['sales'];
      const data = {
        labels: salesJson.labels.reverse(),
        datasets: [
          {
            label: '批發(億)',
            data: salesJson['批發(億)'].reverse(),
            fill: false,
            borderColor: "rgb(32, 58, 169)",
            tension: 0.1,
          },
          {
            label: '零售(億)',
            data: salesJson['零售(億)'].reverse(),
            fill: false,
            borderColor: "rgb(120, 32, 164)",
            tension: 0.1,
          },
          {
            label: '餐飲業(億)',
            data: salesJson['餐飲業(億)'].reverse(),
            fill: false,
            borderColor: "rgb(150, 220, 30)",
            tension: 0.1,
          }
        ],
      }
      const config = {
        type: "line",
        data,
        options: 
        {
          responsive: true,
          legend: { display: false },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} 億`
                }
              }
            ]
          }
        }
      }
      const chart = new Chart(ref, config)
    },
    InitIndustrChart()
    {
      const ref = this.$refs['industr'];
      const data = {
        labels: industrJson.labels.reverse(),
        datasets: [
          {
            data: industrJson.values.reverse(),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }
      const config = {
        type: "line",
        data,
        options: 
        {
          responsive: true,
          legend: { display: false },
          scales: 
          {
            yAxes: 
            [
              {
                ticks: 
                {
                  beginAtZero: false,
                  callback: (value, index, values) => `${value} 點`
                }
              }
            ]
          }
        }
      }
      const chart = new Chart(ref, config)
    },
  }
}
</script>
<style lang="scss" scoped>
  .md-dialog /deep/.md-dialog-container {
    max-width: 768px;
  }
  .jsdc-chart-card{
    position: relative;
    margin: 10px;
    height: 400px;
    // max-width: 200px;
  }
</style>