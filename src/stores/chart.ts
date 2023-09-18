import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTimeseries, getPie, getValue } from '@/api/getApi'

export const useChartStore = defineStore('chart', () => {
  const currentUnixTime = ref(new Date().getTime())
  const selectorOption = [600000, 1800000, 3600000]
  const selectorOptionName = ['10분', '30분', '1시간']
  const selectedSelector = ref(selectorOption[0])
  const setSelectedSelector = (value: number) => {
    selectedSelector.value = value
  }

  const fromUnixTime = ref(currentUnixTime.value - selectedSelector.value)

  const getTimesHandler = async () => {
    const requestData = {
      from: fromUnixTime.value,
      to: currentUnixTime.value
    }
    const timeseriesData = await getTimeseries(requestData.from, requestData.to)
    return timeseriesData
  }

  const getPieHandler = async () => {
    const requestData = {
      from: fromUnixTime.value,
      to: currentUnixTime.value
    }
    const PieData = await getPie(requestData.from, requestData.to)
    return PieData
  }

  const getValueHandler = async () => {
    const requestData = {
      from: fromUnixTime.value,
      to: currentUnixTime.value
    }
    const valueData = await getValue(requestData.from, requestData.to)
    return valueData
  }

  return {
    selectorOption,
    selectorOptionName,
    selectedSelector,
    setSelectedSelector,
    getTimesHandler,
    getPieHandler,
    getValueHandler
  }
})
