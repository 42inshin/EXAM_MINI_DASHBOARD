import type { TimeseriesResponse, PieResponse, ValueResponse } from '@/types/ApiResponse'

const getFetch = (apiUrl: string, from: number, to: number) => {
  return fetch(apiUrl + `?from=${from}&to=${to}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      console.log('데이터 수신:', data)
      return data
    })
    .catch((error) => {
      console.error('오류 발생:', error)
      throw error
    })
}

export const getTimeseries = async (from: number, to: number) => {
  const response: TimeseriesResponse = await getFetch('/timeseries', from, to)
  return response
}

export const getPie = async (from: number, to: number) => {
  const response: PieResponse = await getFetch('/pie', from, to)
  return response
}

export const getValue = async (from: number, to: number) => {
  const response: ValueResponse = await getFetch('/value', from, to)
  return response
}
