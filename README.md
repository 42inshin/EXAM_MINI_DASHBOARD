# EXEM_MINI_DASHBOARD

## 프로젝트 소개

### 개요

- 단일 페이지로 구성 된 미니 대시보드 앱을 구현하는 프로젝트입니다.
- 데이터는 10초 주기로 갱신되며, 선택한 시간 범위(10분, 30분, 1시간)에 따라서 보여지는 데이터가 달라집니다.
- 데이터는 MSW(Mock Service Worker)를 사용하여 브라우저에 MockServer를 만들어 사용했습니다.

- 3종의 차트 구현했으며, 각 차트의 API endpoint는 다음과 같습니다.

  - 라인 차트: `GET /timeseries API`
  - 파이 차트: `GET /pie API`
  - 값 차트: `GET /value API`
  - 3종의 차트는 **10초** 주기로 데이터를 갱신됩니다.

- 각 차트에 보여질 데이터를 선택할 시간 범위 selector를 구현했습니다.
  - 시간 범위 selector의 설정 값은 대시보드 페이지의 모든 차트에 영향을 줍니다.
  - 선택 가능한 옵션은 **10분, 30분, 1시간** 입니다.
  - ex) 주기 옵션이 10분이라면, 10분 전부터 현재 시각까지의 데이터를 차트에 반영

### 선택 구현 사항

- ☐ 사용자가 대시보드에 3종의 차트 중 원하는 것 하나를 추가할 수 있는 기능
- ☑ 값 차트가 특정 기준 값 이상일 때, 값의 색상이 변하는 기능
- ☑ 값 차트의 값을 항상 소수 점 위 3자리, 소수 점 아래 2자리까지만 보이도록 하기
- ▲ 대시보드 페이지의 차트들의 위치와 크기를 원하는 대로 조작 가능한 기능

### 기술 스택

`Vue3` + `Typescript` + `Vite` + `Pinia` + `MSW` + `Vue-Chart-3` + `Chart.js`

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
  unit: string
}
```

## 프로젝트 실행 방법

프로젝트를 받으신 후, `EXEM_MINI_DASHBOARD/` 에서 아래 명령어를 통해 실행할 수 있습니다.

```sh
# 경로: EXEM_MINI_DASHBOARD/
npm install # 패키지 및 모듈 설치
npm run dev # 개발 모드 실행
```

주의) MSW는 개발을 위해 만든 API mock server입니다. 빌드를 할 때 `public/mockServieceWorker.js` 파일이 배포 환경에 올라가지 않도록 주의해주세요.

추가적으로 사용 가능한 커맨드는 아래에 적어두었습니다.

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

## 과제 수행 과정에 대한 기록

### MSW(Mock Service Worker) 설치 방법

#### MSW 라이브러리 설치

```sh
npm install msw --save-dev
```

#### 브라우저에 서비스 워커 등록

브라우저에서 사용하기 위해서는 MSW를 서비스 워커에 등록하는 과정이 필요합니다.
아래의 명령어를 실행하면 서비스 워커 등록을 위한 파일이 public 폴더에 추가할 수 있습니다.

```sh
npx msw init public/ --save
```

#### Worker 설정

`src/mocks/browser.js` 파일을 생성해서 worker 설정을 합니다.

```ts
import { setupWorker, type SetupWorker } from 'msw'
import { handlers } from './handlers'

const worker: SetupWorker = setupWorker(...handlers)

export default worker
```

#### Worker 실행

`src/main.ts` 에 Worker 실행 코드를 추가합니다.

```ts
import worker from './mocks/browser'

// MockServiceWorker
if (process.env.NODE_ENV === 'development') {
  worker.start({ onUnhandledRequest: 'bypass' })
}
```

### Mocks resolves의 올바른 response를 위한 코드 수정

Mocking Server File을 그대로 사용하면, 오류가 나는 상황이었습니다.
MSW를 구성하기까지 몇가지 파일 수정을 거쳤으며, 수정을 통해서 목서버를 구성할 수 있었습니다. 하지만, 데이터가 제대로 오지 않거나, 콘솔창에서 500 에러가 뜨는 상황도 있어서 3개 차트의 resolver 부분을 수정해야 했습니다.

에러들을 정리하면, 다음과 같습니다.

#### 에러

1. 각 resolver 파일의 standardStartTime의 단위가 다름.
2. handlers가 배열로 한번 더 감싸져 있어 browser에서 전개 구문만 사용 시 오류.
3. index가 제너레이트로 만든 values배열의 인덱스 범위를 초과해 에러. -> 500 에러

#### 해결 방법

1. standardStartTime인 unixtime의 단위를 밀리초로 통일
2. handlers 파일에서 handlers를 이중배열이 아닌 배열로 리턴
3. for 문에서 values배열의 인덱스를 초과하지 않도록 조건문 추가

특히, 3번의 경우 새로고침 시 되거나 안되거나를 반복해서 어떤 에러인지 찾는데 많은 시간이 걸렸습니다. 각각의 함수들의 주요 동작 부분에서 console.log로 출력하며 디버깅했으며, 자세히 디버깅해야지만 알 수 있었던 부분이어서 상당히 찾는데 어려움이 있었습니다.

### Pinia Store 사용 시 반응형을 유지한 채로 속성 추출하는 방법

[참고 문서](https://pinia.vuejs.kr/core-concepts/#destructuring-from-a-store)

반응형을 유지하면서 스토어의 ref()인 속성을 추출하려면, storeToRefs()를 사용해야 합니다.

```html
<script setup>
  import { storeToRefs } from 'pinia'

  const store = useChartStore()
  // 반응형 refs의 경우 storeToRef로 구조화.
  const { selectedSelector } = storeToRefs(store)
  // 액션의 경우 일반적인 구조화로 사용 가능
  const { setSelectedSelector } = store
</script>
```

### 참조 문서

[Chart.js](https://www.chartjs.org/)

[vue-chart-3](https://vue-chart-3.netlify.app/guide/#introduction)

[MSW](https://mswjs.io/)

[MSW: Deferred mounting](https://mswjs.io/docs/recipes/deferred-mounting)

[Pinia](https://pinia.vuejs.kr/)

[구글 Icons](https://fonts.google.com/icons)
