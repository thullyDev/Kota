<script setup lang="ts">
	import Icon from "./Icon.vue"
</script>

<template>
	<div class="profile-con">
		<div class="inner-con">
			<form action="POST">
				<div class="profile-img-con">
					<img src="https://robohash.org/thullyDev" alt="thullyDev">
				</div>
				<div class="username-inp-con">
					<Icon name="fa fa-user" />
					<div class="inner-con">
						<input type="text" name="username" class="username-inp" placeholder="Name" value="thullyDev">
						<button type="role" class="change-name-btn">
							<Icon name="fa fa-check" />
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>