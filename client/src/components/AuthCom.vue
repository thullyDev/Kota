<script setup lang="ts">
	import Login from "../components/Login.vue"
	import Signup from "../components/Signup.vue"
</script>

<template>
  <div class="auth-con flex justify-center w-full sm:max-w-96">
  	<div class="inner-con flex flex-col px-3 w-full max-w-96">
  		<Login />
  		<Signup />
  	</div>
  </div>
</template>

<style scoped>
</style>