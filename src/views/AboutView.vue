<template>
  <main>
    <h2>About</h2>
    <article>
      <h3>개요</h3>
      <p>SPA로 구성된 미니 대시보드입니다.</p>
      <p>
        데이터는 10초 주기로 갱신되며, 선택한 시간 범위(10분, 30분, 1시간)에 따라서 보여지는
        데이터가 달라집니다.
      </p>
      <p>
        데이터는 MSW(Mock Service Worker)를 사용하여 브라우저에 MockServer를 만들어 사용했습니다.
      </p>
      <br />
      <h3>기술스택</h3>
      <p>Vue3 + Typescript + Vite + Pinia + msw + Vue-Chart-3 + Chart.js</p>
      <br />
      <h3>차트 별 API</h3>
      <ul>
        <li>라인 차트 : GET <code>/timeseries</code></li>
        <li>파이 차트: GET <code>/pie</code></li>
        <li>값 차트: GET <code>/value</code></li>
      </ul>
      <br />
      <h3>참조 문서</h3>
      <div class="reference">
        <a href="https://www.chartjs.org/">Chart.js</a>
        <a href="https://vue-chart-3.netlify.app/guide/#introduction">vue-chart-3</a>
        <a href="https://mswjs.io/">msw</a>
        <a href="https://mswjs.io/docs/recipes/deferred-mounting">msw: Deferred mounting</a>
        <a href="https://fonts.google.com/icons">구글 Icons</a>
      </div>
    </article>
  </main>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 2rem 0;
}

h3 {
  margin: 1rem 0;
}

article {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

code {
  background-color: #eee;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}
.reference a {
  color: cornflowerblue;
  display: inline-block;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  margin-left: 1rem;
}

.reference a:first-of-type {
  border: 0;
}
</style>
