<script setup lang="ts">
	import AuthInp from "./AuthInp.vue"
</script>

<template>
	<form action="POST">
		<div class="label-text-con">
			<p class="label-text">Welcome back chef...</p>
		</div>
		<div class="inputs-con">
			<AuthInp name="name" icon="fa fa-user" />
			<AuthInp name="email" icon="fa fa-envelope" />
			<AuthInp name="password" type="password" icon="fa fa-lock" />
			<AuthInp name="confirm" type="password" icon="fa fa-key" />
		</div>
		<div class="submit-con">
			<button type="button" class="submit-con">
				submit
			</button>
		</div>
	</form>
</template>