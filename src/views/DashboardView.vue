<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import TimeSelector from '@/components/TimeSelector.vue'
import PieChart from '@/components/PieChart.vue'
import LineChart from '@/components/LineChart.vue'
import ValueChart from '@/components/ValueChart.vue'
import AddChart from '@/components/AddChart.vue'
import { useChartStore } from '@/stores/chart'

const store = useChartStore()

onMounted(() => {
  store.apiAll()
  store.apiAllInterval()
})

onUnmounted(() => {
  store.clearAllInterval()
})
</script>

<template>
  <main>
    <TimeSelector />
    <LineChart />
    <PieChart />
    <ValueChart />
    <AddChart />
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
  border: 1px solid var(--color-border);
  border-radius: 4px;
}
</style>
