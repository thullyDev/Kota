<template>
  <div class="auth-inp-con">
    <i :class="name" aria-hidden="true"></i>
  </div>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      name: {
        type: String,
      },
    }
  }
</script>