# EXEM_MINI_DASHBOARD

## 프로젝트 소개

- 단일 페이지로 구성 된 대시보드 앱 구현
- 3종의 차트 구현
  - 라인 차트: `GET /timeseries API`
  - 파이 차트: `GET /pie API`
  - 값 차트: `GET /value API`
  - 3종의 차트는 **10초** 주기로 데이터를 갱신
- 각 차트에 보여질 데이터를 선택할 시간 범위 selector를 구현
  - 시간 범위 selector의 설정 값은 대시보드 페이지의 모든 차트에 영향을 줌
  - 선택 가능한 옵션은 **10분, 30분, 1시간**
  - ex) 주기 옵션이 10분이라면, 10분 전부터 현재 시각까지의 데이터를 차트에 반영

### 선택 구현 사항

- 사용자가 대시보드에 3종의 차트 중 원하는 것 하나를 추가할 수 있는 기능
- 값 차트가 특정 기준 값 이상일 때, 값의 색상이 변하는 기능
- 값 차트의 값을 항상 소수 점 위 3자리, 소수 점 아래 2자리까지만 보이도록 하기
- 대시보드 페이지의 차트들의 위치와 크기를 원하는 대로 조작 가능한 기능

### API 명세

- `GET /timeseries?from=<FROM>&to=<TO>`

```ts
// Request Parameter
{
  from: number // unixtime
  to: number // unixtime
}

// Response body
{
  name: string
  data: number[]
  times: unixtime[]
  unit: string
}
```

- `GET /pie?from=<FROM>&to=<TO>`

```ts
// Request Parameter
{
  from: number // unixtime
  to: number // unixtime
}

// Response body
{
  data: PieData[]
  unit: string
}

// PieData
{
  name: string
  value: number
}
```

- `GET /value?from=<FROM>&to=<TO>`

```ts
// Request Parameter
{
  from: number //unixtime
  to: number // unixtime
}

// Response Body
{
  name: string
  value: number
}
```

## 프로젝트 셋업

### 패키지 및 모듈을 설치

```sh
npm install
```

### 코드 포맷팅

```sh
npm run format
```

### 개발을 위한 컴파일 및 핫 리로드

```sh
npm run dev
```

### 프로덕션을 위한 타입 체크, 컴파일 및 코드 경량화

```sh
npm run build
```

### 코딩 컨벤션 검사

```sh
npm run lint
```
