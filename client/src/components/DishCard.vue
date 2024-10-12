<script setup lang="ts">
  import Icon from "./Icon.vue"
</script>

<template>
  <div class="dish-card w-full">
    <div class="inner-con w-full flex items-center justify-between bg-neutral-800 py-5 px-2 border border-neutral-400 rounded">
      <div class="left-side flex flex-col gap-3 cursor-pointer">
        <div class="title text-xl font-bold">
          Title Here
        </div>
        <div class="ticks-con text-xs text-neutral-400 flex gap-5 items-center">
          <span class="price-tick text-yellow-400 font-bold flex flex-nowrap gap-2">
            <Icon name="fa-solid fa-money-bill" />
            R23.50
          </span>
          <span class="dot-tick bg-neutral-600 w-1 h-1 inline-block rounded-full"></span>
          <span class="ia-tick flex flex-nowrap gap-2">
            <Icon name="fa-solid fa-list" />
            3 
            <!-- the amount of ingredients in the dish  -->
          </span>
        </div>
      </div>
      <div class="right-side flex flex-col gap-5 items-center justify-center">
        <button type="button" class="edit-btn bg-green-400 w-7 h-7 rounded">
          <Icon name="fa fa-pencil" />
        </button>
        <button type="button" class="delete-btn bg-red-400 w-7 h-7 rounded">
          <Icon name="fa fa-trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>