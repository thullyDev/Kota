<script setup lang="ts">
	import DishCard from "./DishCard.vue"
</script>

<template>
  <div class="dishes-con mt-5 flex flex-col gap-5 px-2">
    <div class="label-text text-xl font-bold flex justify-center">
      My Dishes
    </div>
  	<div class="inner-con">
  		<ul class="dishes-list flex flex-wrap gap-4 justify-center">
  			<li class="dish-item w-full max-w-64" v-for="i in 12" :key="i">
  				<DishCard />
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<style scoped>
</style>