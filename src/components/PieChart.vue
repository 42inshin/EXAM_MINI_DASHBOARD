<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { pieLabel, pieData } = storeToRefs(store)

const chartData = ref({
  labels: pieLabel.value,
  datasets: [
    {
      data: pieData.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
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
  chartData.value.labels = pieLabel.value
  chartData.value.datasets[0].data = pieData.value
})
</script>

<template>
  <div class="chart">
    <DoughnutChart :chartData="chartData" :options="options" />
  </div>
</template>

<style scoped></style>
