<template>
  <div>welcome to flight scanner</div>
</template>
<script>
export default {
  created() {
    this.$router.replace({ name: "home" });
  }
};
</script>
