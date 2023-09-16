<script setup lang="ts">
import { getTimeseries, getPie, getValue } from '@/api/getApi'

// 현재 시간을 Unix 시간으로 변환
const currentUnixTime = Math.floor(Date.now() / 1000)
const selectorOption = {
  tenMin: 600,
  thirtyMin: 1800,
  oneHour: 3600
}

const defaultSelector = selectorOption.tenMin

const getTimesHandler = async () => {
  const requestData = {
    from: currentUnixTime - defaultSelector,
    to: currentUnixTime
  }
  const timeseriesData = await getTimeseries(requestData.from, requestData.to)
  console.log(timeseriesData)
}
const getPieHandler = async () => {
  const requestData = {
    from: currentUnixTime - defaultSelector,
    to: currentUnixTime
  }
  const timeseriesData = await getPie(requestData.from, requestData.to)
  console.log(timeseriesData)
}
const getValueHandler = async () => {
  const requestData = {
    from: currentUnixTime - defaultSelector,
    to: currentUnixTime
  }
  const timeseriesData = await getValue(requestData.from, requestData.to)
  console.log(timeseriesData)
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
