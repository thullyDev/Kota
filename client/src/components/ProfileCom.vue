<script setup lang="ts">
	import Icon from "./Icon.vue"
</script>

<template>
	<div class="profile-con">
		<div class="inner-con">
			<form action="POST" class="flex gap-5 flex-col mt-5">
				<div class="profile-img-con flex justify-center">
					<img src="https://robohash.org/thullyDev" class="w-56 h-56 p-5 rounded-full bg-neutral-700 border" alt="thullyDev">
				</div>
				<div class="username-inp-con flex justify-center text-xs px-2">
					<div class="inner-con flex  gap-2 bg-neutral-700 py-2 px-4 rounded-l-full">
						<Icon name="fa fa-user" />
						<input type="text" name="username" class="username-inp  w-full bg-inherit outline-none border-none" placeholder="Name" value="thullyDev">
					</div>
					<button type="role" class="change-name-btn w-14 rounded-r-full bg-neutral-600">
						<Icon name="fa fa-check" />
					</button>
				</div>
			</form>
		</div>
	</div>
</template>