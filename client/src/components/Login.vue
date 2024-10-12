<script setup lang="ts">
	import AuthInp from "./AuthInp.vue"
</script>

<template>
	<div class="login-form-con">
		<form action="POST" class="flex flex-col gap-5 w-full px-2 bg-neutral-800 py-5 my-5 rounded-sm border border-neutral-400">
			<div class="label-text-con">
				<p class="label-text text-start text-yellow-200 text-xs sm:text-sm font-bold">Welcome back chef...</p>
			</div>
			
 			<div class="inputs-con flex flex-col gap-5">
				<AuthInp name="email" icon="fa fa-envelope" />
				<AuthInp name="password" type="password" icon="fa fa-lock" />
			</div>
			<div class="submit-con flex flex-col items-center gap-5">
				<button type="button" class="submit-con bg-yellow-500 p-2 rounded-full text-xs w-20 sm:text-sm">
					submit
				</button>
				<span class="text-xs sm:text-sm">
					I dont have an account, <button type="button" class="underline text-yellow-500">
						signup
					</button>
				</span>

			</div>
		</form>
	</div>
</template>