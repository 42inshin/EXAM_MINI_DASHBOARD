<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { valueUnit, valueData, valueWarning } = storeToRefs(store)
</script>

<template>
  <div class="chart">
    <div class="contents" :class="{ warning: valueWarning }">
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
  min-height: 160px;
}

.title {
  font-size: 1rem;
}

.contents {
  font-size: 3rem;
  font-weight: bold;
}

.warning {
  color: red;
}

.unit {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
