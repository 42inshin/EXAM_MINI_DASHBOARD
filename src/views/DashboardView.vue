<script setup lang="ts">
import TimeSelector from '@/components/TimeSelector.vue'
import PieChart from '@/components/PieChart.vue'
import LineChart from '@/components/LineChart.vue'
import ValueChart from '@/components/ValueChart.vue'

import { useChartStore } from '@/stores/chart'
import { onMounted } from 'vue'

const store = useChartStore()
onMounted(async () => {
  await store.apiAll()
  store.apiAllInterval()
})
</script>

<template>
  <main>
    <TimeSelector />
    <LineChart />
    <PieChart />
    <ValueChart />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.chart {
  width: 100%;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
