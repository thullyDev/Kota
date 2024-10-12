<script setup lang="ts">
  import Icon from "./Icon.vue"
</script>

<template>
  <div class="dish-inp-con border border-neutral-400 flex flex-nowrap gap-3 py-1 px-2 bg-neutral-700 rounded-sm">
    <Icon :name="icon + ' text-neutral-400 text-sm' " />
    <input
      :type="type"
      :name="name"
      :placeholder="name"
      class="dish-inp bg-inherit w-full text-white text-xs border-none outline-none placeholder:text-neutral-400"
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