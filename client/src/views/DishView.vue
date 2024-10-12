<script setup lang="ts">
  import IngredientsCom from "../components/IngredientsCom.vue"
</script>

<template>
  <main>
    <div class="inner-con">
      <form action="POST">
        <div class="dish-title-inp">
          <input type="text" name="title" class="title-inp" placeholder="Title here" />
        </div>
        <IngredientsCom />
        <div class="price-con">
          <input type="number" class="price-inp" placeholder="Price"> 
        </div>
        <div class="submit-con">
            <button class="submit">
                submit
            </button>
        </div>
      </form>
    </div>
  </main>
</template>
