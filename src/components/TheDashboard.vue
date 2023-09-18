<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { selectedSelector } = storeToRefs(store)
const {
  selectorOption,
  selectorOptionName,
  setSelectedSelector,
  getPieHandler,
  getTimesHandler,
  getValueHandler
} = store
</script>

<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <ul>
      <li
        v-for="(unixtime, index) in selectorOption"
        :key="index"
        :value="unixtime"
        :class="{ selected: unixtime === selectedSelector }"
        @click="setSelectedSelector(unixtime)"
      >
        {{ selectorOptionName[index] }}
      </li>
    </ul>
    <button @click="getTimesHandler">getTimeseries</button>
    <button @click="getPieHandler">getPie</button>
    <button @click="getValueHandler">getValue</button>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}
li {
  cursor: pointer;
  padding: 0.2rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  margin-bottom: 0.5rem;
}
li.selected {
  background-color: var();
  color: var(--color-text);
}

li.selected {
  text-decoration: none;
  background-color: rgb(42, 155, 208);
  color: #ffffff;
  transition: 0.4s;
}

@media (hover: hover) {
  li:hover {
    background-color: rgba(42, 155, 208, 0.2);
  }
}
</style>
