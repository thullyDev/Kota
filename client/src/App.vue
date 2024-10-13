<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from "@/stores/app"

const appStore = useAppStore()
</script>

<template>
  <div class="content bg-neutral-900 text-white min-h-screen py-5">
    <header>
      <div class="wrapper">
        <nav class="flex justify-center gap-5 font-bold text-yellow-400 sm:text-2xl">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/dishes">Dishes</RouterLink>
          <RouterLink to="/add">Add</RouterLink>
        </nav>
      </div>
    </header>
    <div class="outer-loader">
      <div v-if="appStore.isLoading == true" class="inner-loader fixed top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center text-4xl font-bold text-yellow-500">
        loading...
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
