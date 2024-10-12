<script setup lang="ts">
  import Icon from "./Icon.vue"
</script>

<template>
  <div class="auth-inp-con">
    <Icon :name="icon" />
    <input
      :type="type"
      :name="name"
      :placeholder="name"
      class="auth-inp"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: "AuthInp",
    props: {
      type: {
        type: String,
        default: "text",
      },
      name: {
        type: String,
      },
      icon: {
        type: String,
      }
    }
  }
</script>