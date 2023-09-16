export interface TimeseriesResponse {
  name: string
  data: number[]
  times: number[]
  unit: string
}

export interface PieResponse {
  data: PieData[]
  unit: string
}

export interface PieData {
  name: string
  value: number
}

export interface ValueResponse {
  name: string
  value: number
  unit: string
}
