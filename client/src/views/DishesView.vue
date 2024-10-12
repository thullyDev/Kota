<script setup lang="ts">
  import ProfileCom from "../components/ProfileCom.vue"
  import UserDishes from "../components/UserDishes.vue"
  import Pagination from "../components/Pagination.vue"
</script>

<template>
  <main class="lg:flex items-center justify-center">
    <div class="left-side w-full lg:max-w-60">
      <ProfileCom />
    </div>
    <div class="right-side ">
      <UserDishes />
      <Pagination />
    </div>
  </main>
</template>
