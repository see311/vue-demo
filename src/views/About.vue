<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a style="color:#6c0;cursor:pointer;" @click.prevent="toTest1">toTest1</a>
  </div>
</template>
<script>
export default {
  methods: {
    toTest1() {
      this.$router.push("/zeratul/test1");
    }
  }
};
</script>

