<template>
  <div>
    <div class="notification-refresh border p-2 mt-4">
      <div class="row">
        <div class="col-md-12 d-flex align-items-center">
          <div class="logo-notification">
            <img
              lazy="loading"
              v-once
              src="../../../../assets/image/logo/klaspresentase.png"
              alt="presentase"
            />
            <span>PERSENTASE</span>
          </div>
          <div class="information-notification ml-auto">
            <a href="javascript:;" @click="loadDataPercentageDashboard()">
              <span> Muat Ulang </span>
            </a>
            <button
              type="button"
              class="btn-sync ml-1 bg-success"
              title="Sinkrokinsasi Data"
              @click="loadDataPercentageDashboard()"
            >
              <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Data dashboard connect api ada pada dashboard vue -->
    <div class="row mt-4">
      <div class="col-md-4">
        <div class="presentase">
          <card header-classes="bg-transparent text-center">
            <p>(%) Mata pelajaran</p>
            <radial-progress-bar
              class="rounded-circle radialbar-mapel"
              :diameter="250"
              :completed-steps="0"
              :total-steps="100"
              startColor="#FF2E00"
              :strokeWidth="15"
              stopColor="#FF2E00"
              innerStrokeColor="bg-transparent"
            >
              <p>0%</p>
            </radial-progress-bar>
            <div class="information-posting mt-2 d-flex align-items-center">
              <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/red.svg" alt="" />
                  Penyerapan materi:
                  {{ percentageMapel.completedStepMapel }}%
                </div> -->
              <div
                class="font-weight-bold text-dark ml-auto"
                style="font-size: 14px"
              >
                <a
                  type="button"
                  @click="modal.showModalPresentaseMapelDashboard = true"
                  class="btn button-terapkan"
                  style="font-size: 12px"
                  >Detail</a
                >
                <ModalPersentaseDashboardMapel
                  v-if="modal.showModalPresentaseMapelDashboard"
                  class="overlay"
                  @close="modal.showModalPresentaseMapelDashboard = false"
                ></ModalPersentaseDashboardMapel>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div class="col-md-4">
        <div class="presentase">
          <card header-classes="bg-transparent">
            <p>(%) Perpustakaan</p>
            <radial-progress-bar
              class="rounded-circle radialbar-perpustakaan"
              :diameter="250"
              :completed-steps="
                percentagePerpustakaan.completedStepPerpustakaan
              "
              :total-steps="percentagePerpustakaan.totalStepPerpustakaan"
              startColor="#0054FE"
              :strokeWidth="15"
              stopColor="#0054FE"
              innerStrokeColor="bg-transparent"
            >
              <p>{{ percentagePerpustakaan.completedStepPerpustakaan }}%</p>
            </radial-progress-bar>
            <div class="information-posting mt-2 d-flex align-items-center">
              <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/Color.svg" alt="" />
                  Peminjaman buku:
                  {{ percentagePerpustakaan.completedStepPerpustakaan }}%
                </div> -->
              <div
                class=" font-weight-bold text-dark ml-auto"
                style="font-size: 14px"
              >
                <a
                  type="button"
                  @click="modal.showModalPresentasePerpustakaanDashboard = true"
                  class="btn button-terapkan"
                  style="font-size: 12px"
                  >Detail</a
                >
                <ModalPersentaseDashboardPerpustakaan
                  v-if="modal.showModalPresentasePerpustakaanDashboard"
                  class="overlay"
                  @close="
                    modal.showModalPresentasePerpustakaanDashboard = false
                  "
                ></ModalPersentaseDashboardPerpustakaan>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div class="col-md-4">
        <div class="presentase">
          <card header-classes="bg-transparent">
            <p>(%) Nilai Ujian</p>
            <RadialProgressBar
              class="rounded-circle radialbar-ujian"
              :diameter="250"
              :completed-steps="percentageUjian.completedStepUjian"
              :total-steps="percentageUjian.totalStepUjian"
              startColor="#34B53A"
              stopColor="#34B53A"
              :strokeWidth="15"
              innerStrokeColor="bg-transparent"
            >
              <p>{{ percentageUjian.completedStepUjian }}%</p>
            </RadialProgressBar>
            <div class="information-posting mt-2 d-flex align-items-center">
              <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/green.svg" alt="" />
                  Kelulusan :
                  {{ percentageUjian.completedStepUjian }}%
                </div> -->
              <div
                class=" font-weight-bold text-dark ml-auto"
                style="font-size: 14px"
              >
                <a
                  type="button"
                  @click="modal.showModalPresentaseUjianDashboard = true"
                  class="btn button-terapkan "
                  style="font-size: 12px"
                  >Detail</a
                >
                <ModalPersentaseDashboardUjian
                  v-if="modal.showModalPresentaseUjianDashboard"
                  class="overlay"
                  @close="modal.showModalPresentaseUjianDashboard = false"
                ></ModalPersentaseDashboardUjian>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RadialProgressBar from "vue-radial-progress";
import ModalPersentaseDashboardMapel from "../../../../../src/components/Goverment/Modal/PersentaseDashboard/ModalPersentaseMapelDashboard";
import ModalPersentaseDashboardUjian from "../../../../components/Goverment/Modal/PersentaseDashboard/ModalPersentaseNilaiUjianDashboard";
import ModalPersentaseDashboardPerpustakaan from "../../../../../src/components/Goverment/Modal/PersentaseDashboard/ModalPersentasePerpustakaanDashboard";
import broker from "../../../../utils/broker";
export default {
  name: `Persentase`,
  components: {
    RadialProgressBar,
    ModalPersentaseDashboardMapel,
    ModalPersentaseDashboardUjian,
    ModalPersentaseDashboardPerpustakaan,
  },
  data() {
    return {
      modal: {
        showModalPresentaseMapelDashboard: false,
        showModalPresentaseUjianDashboard: false,
        showModalPresentasePerpustakaanDashboard: false,
      },
      percentageMapel: {
        completedStepMapel: 0,
        totalStepMapel: 100,
      },

      percentagePerpustakaan: {
        completedStepPerpustakaan: 0,
        totalStepPerpustakaan: 100,
      },

      percentageUjian: {
        completedStepUjian: 0,
        totalStepUjian: 100,
      },
    };
  },
  mounted() {
    this.loadDataPercentageDashboard();
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2017 },
        (value, index) => 2018 + index
      );
    },
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
  methods: {
    async loadDataPercentageDashboard() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/percentage`;

      self.percentageMapel.completedStepMapel = 0;
      self.percentagePerpustakaan.completedStepPerpustakaan = 0;
      self.percentageUjian.completedStepUjian = 0;

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          let examData = res.data.data.exam;
          let libraryData = res.data.data.library;
          let theoryData = res.data.data.school_theory;

          self.percentageUjian.completedStepUjian = parseFloat(
            examData.percentage
          );
          self.percentagePerpustakaan.completedStepPerpustakaan = parseFloat(
            libraryData.percentage
          );

          self.percentageMapel.completedStepMapel = parseFloat(
            theoryData.percentage
          );
        }
      });
    },
  },
};
</script>
