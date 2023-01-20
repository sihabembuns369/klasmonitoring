<template>
  <div>
    <div class="notification-refresh border p-2 mt-4">
      <div class="row">
        <div class="col-md-12 d-flex align-items-center">
          <div class="logo-notification">
            <img
              lazy="loading"
              v-once
              src="../../../../assets/image/logo/klastugas.png"
              alt="tugas"
            />
            <span>TUGAS</span>
          </div>
          <div class="information-notification ml-auto">
            <a href="javascript:;" @click="submit()">
              <span> Muat Ulang </span>
            </a>
            <button
              type="button"
              class="btn-sync ml-1 bg-success"
              title="Sinkrokinsasi Data"
              @click="submit()"
            >
              <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <!--  -->
      <div class="col-xl-9">
        <!-- Chart Tugas Sekolah -->
        <ChartTugasSekolah ref="formChartAssignment" />
        <!-- Chart Tugas Sekolah -->
      </div>
      <!-- List Tugas Sekolah -->
      <div class="col-xl-3">
        <ListTugasSekolah ref="formListAssignment" />
      </div>
      <!-- List Tugas Sekolah -->
      <!--  -->
    </div>
  </div>
</template>
<script>
import ListTugasSekolah from "./ListSekolah";
import ChartTugasSekolah from "./PengerjaanTugas";

export default {
  name: `TugasDashboard`,
  data() {
    return {};
  },
  components: {
    ListTugasSekolah,
    ChartTugasSekolah,
  },
  computed: {},
  mounted() {},
  methods: {
    submit() {
      this.$refs.formChartAssignment.submitChartAssignment();
      this.$refs.formListAssignment.loadDataTotalAssignment();
    },
  },
};
</script>
