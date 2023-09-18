import { computed, ref } from 'vue'
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

  const fromUnixTime = computed(() => currentUnixTime.value - selectedSelector.value)

  const apiTimeseries = async () => {
    return await getTimeseries(fromUnixTime.value, currentUnixTime.value)
  }

  const apiPie = async () => {
    return await getPie(fromUnixTime.value, currentUnixTime.value)
  }

  const apiValue = async () => {
    return await getValue(fromUnixTime.value, currentUnixTime.value)
  }

  return {
    selectorOption,
    selectorOptionName,
    selectedSelector,
    setSelectedSelector,
    apiTimeseries,
    apiPie,
    apiValue
  }
})
