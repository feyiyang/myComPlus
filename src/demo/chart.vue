<template>
  <div class="parent_reports">
    <div class="charts">
        <report-chart v-for="(item,index) in charts" :key="index" class="chart_item" :idx="index" :range="!tabActive?'week':'month'" :datas="item">
          <div class="rtit">{{item.title}}</div>
        </report-chart>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'
import reportChart from '@lib/charts/reportChart'
export default {
  components: {
    reportChart
  },
  data() {
    return {
      charts: [],
      tableParam: {}
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      moment.locale("zh-cn")
      let theweek = [moment().weekday(0), moment().weekday(6)]
      let themonth = [moment().startOf('month'), moment().endOf('month')]
      this.weekRange = {
        short: {beginTime: theweek[0].format('MM.DD'), endTime: theweek[1].format('MM.DD')},
        full: {beginTime: theweek[0].format('YYYY-MM-DD'), endTime: theweek[1].format('YYYY-MM-DD')}
      }
      this.tableParam = this.weekRange.full
      this.$api.reports.reportTable(this.tableParam).then(res => {
        // console.log(res)
        this.charts = [
          {title: '综合能力', val:res.totalAbility, unit: '分', xlabel:[['最高分', '平均分']] },
          {title: `本${this.tabActive?'月':'周'}学习时长`, val:res.studyTime, unit: '时', division: '60', xlabel: [['累计时长', '每日平均']] },
          {title: '新学习古诗文', val:res.poem, unit: '篇', xlabel: [['累计篇数', '平均篇数']]},
          {title: '成语名句积累', val:res.idiom, unit: '个', xlabel: [['累计数量', '平均数量']]}
        ]
        
        this.goodRate = res.goodRate
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style lang="less" scoped>
  
</style>