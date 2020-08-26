<template>
  <div class="chart_wrap">
    <slot></slot>
    <div :id="'chart-'+idx" class="chart">
      
    </div>
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
  name: 'reportChart',
  props: {
    idx: {
      type: Number
    },
    datas: {
      type: Object,
      default: null
    },
    width: {
      type: String
    },
    range: {
      type: String,
      default: 'week'
    },
    legend: {
      type: Array,
      default: () => ['我', '同龄']
    }
  },
  watch: {
    datas: function(val){
      this.drawCanvas()
    }
  },
  mounted() {
    this.datas&&this.drawCanvas()
  },
  methods: {
    drawCanvas() {
      // console.log(this.datas.xlabel)
      var that = this
      const unit = this.datas.unit
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart-'+this.idx));
      // console.log(myChart)
      // 绘制图表
      var labelOption = {
        show: true,
        position: 'top',
        verticalAlign: 'bottom',
        formatter: function(data) {
          // console.log(data)
          return `{score| ${that.datas.division?(data.value/that.datas.division).toFixed(1):data.value} ${unit}}`
        },
        fontSize: 16,
        rich: {
          score: {
            color:'#EA3225',
            textBorderColor: '#fff'
          }
        }
      }
      myChart.setOption({
        title:{
          show: false
        },
        grid: {
          left: '-10%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {},
        legend: {
          data: this.legend
        },
        itemStyle: {barBorderRadius:[4, 4, 0, 0]},
        xAxis: {
          data: [`${this.datas.xlabel[0][0]}`, `${this.datas.xlabel[0][1]}`],
          axisLine:{
            lineStyle: {color:'#C4D2D3', width: 2}
          },
          axisLabel: {
            color:'#B58150'
          },
          axisTick:{show:false}
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '我',
          type: 'bar',
          color: '#FFA44B',
          label: labelOption,
          barGap: '30%',
          barMaxWidth: '50px',
          data: [this.datas.val.myScore, this.datas.val.myAvgScore]
        },{
          name: '同龄',
          type: 'bar',
          color: '#69CB3D',
          label: labelOption,
          barGap: '30%',
          barMaxWidth: '50px',
          data: [this.datas.val.contScore, this.datas.val.contAvgScore]
        }]
      })
    }
  },
}
</script>
<style lang="less" scoped>
.chart_wrap{
width:100%;height:e('calc(18vw + 38px)');min-height: 140px;
}
.chart{
  width: 100%;height: calc(100% - 32px);
}
</style>