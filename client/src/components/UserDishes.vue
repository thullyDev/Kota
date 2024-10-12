<script setup lang="ts">
	import DishCard from "./DishCard.vue"
</script>

<template>
  <div class="dishes-con">
  	<div class="inner-con">
  		<ul class="dishes-list">
  			<li class="dish-item" v-for="i in 12" :key="i">
  				<DishCard />
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<style scoped>
</style>