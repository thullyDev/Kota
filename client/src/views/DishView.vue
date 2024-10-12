<script setup lang="ts">
  import IngredientsCom from "../components/IngredientsCom.vue"
  import Icon from "../components/Icon.vue"
  import DishInp from "../components/DishInp.vue"
</script>

<template>
  <main>
    <div class="inner-con mt-5 px-2">
      <form action="POST" class="flex flex-col gap-5">
        <div class="top-inputs flex flex-col gap-5 items-center">
          <DishInp name="name" icon="fa fa-pencil" />
          <DishInp name="price" icon="fa-solid fa-money-bill"/>
        </div>
        <IngredientsCom />
        <div class="submit-con flex justify-center">
            <button class="submit bg-yellow-500 w-20 rounded">
                submit
            </button>
        </div>
      </form>
    </div>
  </main>
</template>
