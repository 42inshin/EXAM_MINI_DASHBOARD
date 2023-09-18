<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import LineChart from '@/components/LineChart.vue'
import ValueChart from '@/components/ValueChart.vue'
import PieChart from '@/components/PieChart.vue'
import LineIcon from '@/components/icons/IconLine.vue'
import PieIcon from '@/components/icons/IconDonut.vue'
import ValueIcon from '@/components/icons/IconValue.vue'

const onChartsView = ref(false)
const chartTypes = ['선 차트', '파이 차트', '값 차트']

const plusChartHandler = () => {
  onChartsView.value = !onChartsView.value
}

const charts = shallowRef<any>([])

const addChart = (chartType: string) => {
  if (chartType === '선 차트') {
    charts.value.push(LineChart)
  } else if (chartType === '파이 차트') {
    charts.value.push(PieChart)
  } else if (chartType === '값 차트') {
    charts.value.push(ValueChart)
  }
  console.log(charts.value)
  onChartsView.value = false
}
</script>

<template>
  <div v-for="(chart, index) in charts" :key="index">
    <component :is="chart" />
  </div>
  <div v-if="onChartsView" class="chartSelectBox" @click="onChartsView = false">
    <ul>
      <li @click="addChart(chartTypes[0])">
        <div><LineIcon /></div>
        <h3>{{ chartTypes[0] }}</h3>
      </li>
      <li @click="addChart(chartTypes[1])">
        <PieIcon />
        <h3>{{ chartTypes[1] }}</h3>
      </li>
      <li @click="addChart(chartTypes[2])">
        <ValueIcon />
        <h3>{{ chartTypes[2] }}</h3>
      </li>
    </ul>
  </div>
  <button @click="plusChartHandler">+</button>
</template>

<style scoped>
button {
  width: 100%;
  height: 50px;
  margin: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--blue);
  color: var(--white);
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  opacity: 0.8;
}

.chartSelectBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

li {
  list-style: none;
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  min-width: 120px;
  text-align: center;
}

li:hover {
  background-color: var(--blue);
  color: var(--white);
}

li:nth-child(2) {
  margin: 0 1rem;
}

svg {
  width: 100%;
  height: 100%;
  max-height: 32px;
}
</style>
