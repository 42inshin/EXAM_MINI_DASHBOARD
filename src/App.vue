<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DashboardIcon from '@/components/icons/IconDashboard.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo_whitec.svg" width="125" height="125" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <DashboardIcon />
          <div>Dashboard</div>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a div.router-link-exact-active {
  color: var(--color-text);
}

nav a div.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  padding: 0.2rem 0.8rem;
  border-radius: 8px;
}

nav a:first-of-type {
  border: 0;
}
</style>
