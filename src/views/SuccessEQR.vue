<template>
  <div>
      Success!
  </div>
</template>

<script>
export default {
    created() {
        console.log(this.$route.params.data)
    }
}
</script>

<style>

</style>