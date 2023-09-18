<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { LineChart } from 'vue-chart-3'
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { timeseriesLabel, timeseriesData, timeseriesName, timeseriesUnit } = storeToRefs(store)

const chartData = ref({
  labels: timeseriesLabel.value,
  datasets: [
    {
      label: timeseriesName.value,
      data: timeseriesData.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
      borderColor: 'cornflowerblue',
      tension: 0.3
    }
  ]
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

watchEffect(() => {
  chartData.value.labels = timeseriesLabel.value
  chartData.value.datasets[0].data = timeseriesData.value
  chartData.value.datasets[0].label = `${timeseriesName.value} (${timeseriesUnit.value})`
})
</script>

<template>
  <div class="chart">
    <LineChart :chartData="chartData" :options="options" />
  </div>
</template>

<style scoped></style>
