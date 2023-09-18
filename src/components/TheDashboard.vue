<script setup lang="ts">
import { getTimeseries, getPie, getValue } from '@/api/getApi'

// 현재 시간을 Unix 시간으로 변환
const currentUnixTime = new Date().getTime()
const selectorOption = {
  tenMin: 600000,
  thirtyMin: 1800000,
  oneHour: 3600000
}

const defaultSelector = selectorOption.thirtyMin
const fromUnixTime = currentUnixTime - defaultSelector

const getTimesHandler = async () => {
  const requestData = {
    from: fromUnixTime,
    to: currentUnixTime
  }
  const timeseriesData = await getTimeseries(requestData.from, requestData.to)
  return timeseriesData
}
const getPieHandler = async () => {
  const requestData = {
    from: fromUnixTime,
    to: currentUnixTime
  }
  const PieData = await getPie(requestData.from, requestData.to)
  return PieData
}
const getValueHandler = async () => {
  const requestData = {
    from: fromUnixTime,
    to: currentUnixTime
  }
  const valueData = await getValue(requestData.from, requestData.to)
  return valueData
}
</script>

<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <button @click="getTimesHandler">getTimeseries</button>
    <button @click="getPieHandler">getPie</button>
    <button @click="getValueHandler">getValue</button>
  </div>
</template>
