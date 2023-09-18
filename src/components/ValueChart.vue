<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { valueUnit, valueData } = storeToRefs(store)
</script>

<template>
  <div class="chart">
    <div class="contents">
      {{ valueData }} <span class="unit">{{ valueUnit }}</span>
    </div>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1rem;
}

.contents {
  font-size: 3.5rem;
  font-weight: bold;
}

.unit {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
