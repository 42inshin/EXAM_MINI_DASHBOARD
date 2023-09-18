<script setup lang="ts">
import { useChartStore } from '@/stores/chart'
import { storeToRefs } from 'pinia'

const store = useChartStore()
const { selectedSelector } = storeToRefs(store)
const { selectorOption, selectorOptionName, setSelectedSelector } = store

const clickedSelectorHandler = async (unixtime: number) => {
  if (unixtime === selectedSelector.value) return
  setSelectedSelector(unixtime)
  store.apiAll()
  store.clearAllInterval()
  store.apiAllInterval()
}
</script>

<template>
  <div class="wrapper">
    <div class="title">데이터 범위</div>
    <ul>
      <li
        v-for="(unixtime, index) in selectorOption"
        :key="index"
        :value="unixtime"
        :class="{ selected: unixtime === selectedSelector }"
        @click="clickedSelectorHandler(unixtime)"
      >
        {{ selectorOptionName[index] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem;
}

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
  margin-right: 0.25rem;
}

li.selected {
  text-decoration: none;
  background-color: cornflowerblue;
  color: #ffffff;
  transition: 0.4s;
}

li:hover {
  background-color: rgba(100, 149, 237, 0.2);
}
</style>
