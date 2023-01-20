<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a href="#" class="font-weight-bold ml-1"
            >Klasmonitoring Pemerintah
            {{
              nameCity != null
                ? nameCity
                : nameProvince != null
                ? nameProvince
                : ""
            }}</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      nameProvince: this.$store.state.user.province.name,
      nameCity: this.$store.state.user.city.name,
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
