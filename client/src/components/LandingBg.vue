<script setup lang="ts">
import landingBg from "../assets/chef-girl.png"
</script>

<template>
  <div>
    <span class="about-us-con flex flex-col items-center" id="about_us">
      <img :src="landingBg" class="w-36 sm:w-56" alt="chef girl image">
      <p class="short-text text-gray-200 font-bold  text-center hidden sm:inline ">
        Kota, The chef's secret weapon for menu management.
      </p>
    </span>
  </div>
</template>

<style scoped>
</style>