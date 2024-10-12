<script setup lang="ts">
	import Icon from "./Icon.vue"	
</script>

<template>
	<div class="ing-card flex justify-between items-center w-full border border-neutral-600 bg-neutral-800 py-1 px-2 rounded">
		<div class="left-side flex flex-col gap-2">
			<span class="text-base flex flex-nowrap gap-2 font-bold">
				<Icon name="fa fa-tag" />
				ingredient
			</span>
			<span class="text-xs flex flex-nowrap text-yellow-400 gap-2">
				<Icon name="fa-solid fa-circle-plus" />
				10
			</span>
		</div>

		<div class="right-side">
			<button type="button" class="remove-btn bg-red-400 rounded w-7 h-7 ">
				<Icon name="fa fa-trash" />
			</button>
		</div>
	</div>
</template>