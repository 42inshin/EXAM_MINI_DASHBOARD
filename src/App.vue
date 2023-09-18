<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DashboardIcon from '@/components/icons/IconDashboard.vue'
import FeedIcon from '@/components/icons/IconFeed.vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
</script>

<template>
  <header>
    <div class="logoWrapper">
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      </RouterLink>
    </div>
    <nav>
      <RouterLink to="/">
        <DashboardIcon />
        <div>Dashboard</div>
      </RouterLink>
      <RouterLink to="/about">
        <FeedIcon />
        <div>About</div>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoWrapper {
  padding: 0.5rem;
  border-radius: 4px;
}

.logo {
  display: block;
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  padding: 0.2rem 0.8rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
