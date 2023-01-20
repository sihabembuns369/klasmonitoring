<template>
  <div style="position: relative;">
    <div class="container-loading">
      <div class="loader-line positioning">
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--dot"></div>
        <div class="loader--text"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading",
};
</script>
<style lang="scss">
@import "../../../assets/scss/loading/index.scss";
</style>
