import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getTimeseries, getPie, getValue } from '@/api/getApi'

export const useChartStore = defineStore('chart', () => {
  const currentUnixTime = ref(Math.floor(new Date().getTime() / 1000) * 1000)

  const getCurrentUnixTime = () => {
    currentUnixTime.value = Math.floor(new Date().getTime() / 1000) * 1000
  }

  const selectorOption = [600000, 1800000, 3600000]
  const selectorOptionName = ['10분', '30분', '1시간']
  const selectedSelector = ref(selectorOption[0])

  const setSelectedSelector = (value: number) => {
    selectedSelector.value = value
  }

  const fromUnixTime = computed(() => currentUnixTime.value - selectedSelector.value)

  const timeseriesLabel = ref(['', '', '', '', '']) // timeseries 차트 라벨
  const timeseriesData = ref([0, 0, 0, 0, 0]) // timeseries 차트 데이터
  const timeseriesName = ref('') // timeseries 차트 이름
  const timeseriesUnit = ref('') // timeseries 차트 단위

  const pieLabel = ref(['', '', '', '', '']) // pie 차트 라벨
  const pieData = ref([10, 10, 10, 10, 10]) // pie 차트 데이터

  const valueUnit = ref('') // value 차트 단위
  const valueData = ref('0') // value 차트 데이터

  const unixtimeToTimeString = (unixtime: number) => {
    const date = new Date(unixtime)
    const hour = ('0' + date.getHours()).slice(-2)
    const minute = ('0' + date.getMinutes()).slice(-2)
    const second = ('0' + date.getSeconds()).slice(-2)
    return `${hour}:${minute}:${second}`
  }

  // API 호출
  const apiTimeseries = async () => {
    const response = await getTimeseries(fromUnixTime.value, currentUnixTime.value)
    timeseriesLabel.value = response.times.map((item) => unixtimeToTimeString(item))
    timeseriesData.value = response.data
    timeseriesName.value = response.name
    timeseriesUnit.value = response.unit
    return response
  }

  const apiPie = async () => {
    const response = await getPie(fromUnixTime.value, currentUnixTime.value)
    pieLabel.value = response.data.map((item) => item.name)
    pieData.value = response.data.map((item) => item.value)
    return response
  }

  const apiValue = async () => {
    const response = await getValue(fromUnixTime.value, currentUnixTime.value)
    valueData.value = formatValueData(response.value)
    valueUnit.value = formatValueUnit(response.value, response.unit)
    checkValueWarning(response.value)
    return response
  }

  // value 차트 경고
  const valueWarning = ref(false)
  const warningRange = 900

  const checkValueWarning = (value: number) => {
    if (selectedSelector.value === selectorOption[0] && value > warningRange) {
      valueWarning.value = true
    } else if (selectedSelector.value === selectorOption[1] && value > warningRange * 3) {
      valueWarning.value = true
    } else if (selectedSelector.value === selectorOption[2] && value > warningRange * 6) {
      valueWarning.value = true
    } else {
      valueWarning.value = false
    }
  }

  // value 자리수
  const formatValueData = (value: number) => {
    if (value > 1000) return (value / 1000).toFixed(2)
    return value.toFixed(2)
  }

  const formatValueUnit = (value: number, unit: string) => {
    if (value > 1000) {
      if (unit === 'bytes') return 'KB'
      if (unit === 'KB') return 'MB'
      if (unit === 'MB') return 'GB'
    }
    return unit
  }

  // 모든 API 호출
  const apiAll = () => {
    getCurrentUnixTime()
    apiTimeseries()
    apiPie()
    apiValue()
  }

  // API 호출 주기
  const intervalRange = 10000
  const apiInterval = ref<NodeJS.Timer | null>(null)

  const apiAllInterval = () => {
    apiInterval.value = setInterval(() => {
      apiAll()
    }, intervalRange)
  }

  const clearAllInterval = () => {
    if (apiInterval.value != null) {
      clearInterval(apiInterval.value)
    }
  }

  return {
    selectorOption,
    selectorOptionName,
    selectedSelector,
    timeseriesLabel,
    timeseriesData,
    timeseriesName,
    timeseriesUnit,
    pieLabel,
    pieData,
    valueUnit,
    valueData,
    valueWarning,
    setSelectedSelector,
    apiTimeseries,
    apiPie,
    apiValue,
    apiAll,
    apiAllInterval,
    clearAllInterval
  }
})
