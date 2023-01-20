<template>
  <div>
    <div class="notification-refresh border p-2 mt-4">
      <div class="row">
        <div class="col-md-12 d-flex align-items-center">
          <div class="logo-notification">
            <img
              lazy="loading"
              v-once
              src="../../../../assets/image/logo/klasmember.png"
              alt="muat ulang"
            />
            <span>KLASMEMBER</span>
          </div>
          <div class="information-notification ml-auto">
            <a href="javascript:;" @click="submit">
              <span> Muat Ulang </span>
            </a>
            <button
              type="button"
              class="btn-sync ml-1 bg-success"
              title="Sinkrokinsasi Data"
              @click="submit"
            >
              <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <!-- Chart -->
      <div class="col-xl-9">
        <ChartPelajar ref="submitChartMember" />
      </div>
      <!-- Chart -->
      <!-- List Pelajar -->
      <div class="col-xl-3">
        <ListPelajar ref="loadDataKlasMember" />
      </div>
      <!-- List Pelajar -->
    </div>
  </div>
</template>
<script>
import ChartPelajar from "./ChartPelajar";
import ListPelajar from "./ListPelajar";
export default {
  name: "Klasmember",
  components: { ChartPelajar, ListPelajar },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    submit() {
      this.$refs.submitChartMember.submitChartMember();
      this.$refs.loadDataKlasMember.loadDataKlasMember();
    },
  },
};
</script>
