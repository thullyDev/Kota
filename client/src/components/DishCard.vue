<script setup lang="ts">
  import Icon from "./Icon.vue"
</script>

<template>
  <div class="dish-card">
    <div class="inner-con">
      <div class="left-side">
        <div class="title">
          Title Here
        </div>
        <div class="ticks-con">
          <span class="price-tick">
            R23.50
          </span>
          <span class="dot-tick"></span>
          <span class="ia-tick">
            3 
            <!-- the amount of ingredients in the dish  -->
          </span>
        </div>
      </div>
      <div class="right-side">
        <button type="button" class="edit-btn">
          <Icon name="fa fa-pencil" />
        </button>
        <button type="button" class="delete-btn">
          <Icon name="fa fa-trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>