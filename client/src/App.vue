<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="content bg-neutral-900 text-white min-h-screen py-5">
    <header>
      <div class="wrapper">
        <nav class="flex justify-center gap-5 font-bold text-yellow-400">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/dishes">Dishes</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
