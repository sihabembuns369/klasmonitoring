<template>
  <div>
    <base-header type="gradient-success" class="container mb-4 pt-md-8">
      <div class="notification-refresh border p-2 mb-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/Logo-Onklas.png"
                alt="klaspustaka"
              />
              <span>KLASPUSTAKA</span>
            </div>
            <div class="information-notification ml-auto">
              <a href="javascript:;" @click="getData()">
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="getData()"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="perpustakaan/klaspustaka"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/PerpustakaanKP.png"
                alt="perpustakaan"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataSummary.dataSchoolLibrary }}
              </div>
              <div class="statistic-information text-muted">
                Perpustakaan
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="perpustakaan/jumlah-buku"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/PelajarKP.png"
                alt="jumlah buku"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataSummary.dataBookStok }}
              </div>
              <div class="statistic-information text-muted">
                Jumlah Buku
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="perpustakaan/buku-baru"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/Bukubaru.png"
                alt="buku baru"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataSummary.dataNewBook }}
              </div>
              <div class="statistic-information text-muted">
                Buku Baru
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="perpustakaan/buku-rusak"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/bukurusak.png"
                alt="buku rusak"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataSummary.dataBookUnavailable }}
              </div>
              <div class="statistic-information text-muted">
                Buku Rusak
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="mt-4">
        <div class="row mt-4">
          <!--  -->
          <div class="col-xl-9">
            <card header-classes="bg-transparent">
              <form @submit.prevent="submitChartLibrary">
                <div slot="header" class="header">
                  <div class="information-posting d-flex align-items-center">
                    <label class="label font-weight-bold text-dark">
                      Total peminjaman buku sekolah
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        class="filter d-flex align-items-center mt-3 float-right text-muted w-100"
                      >
                        <div class="form-check pl-0 mr-3">
                          <label class="form-check-label" for="radio1">
                            Filter
                          </label>
                        </div>
                        <select
                          class="form-control filter-assignment w-25 mr-auto"
                          v-model="filterLibrary"
                          required
                        >
                          <option value="lastyear">
                            Setahun terakhir
                          </option>
                          <option value="month">
                            Bulan
                          </option>
                          <option value="date">
                            Tanggal
                          </option>
                        </select>
                        <!-- <div class="form-check mr-3">
                        <label class="form-check-label" for="radio2">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="radio2"
                            name="optradio"
                            value="lastyear"
                          />Per/Tahun
                        </label>
                      </div> -->
                        <div v-if="filterLibrary == 'lastyear'">
                          <div
                            class="row d-flex align-items-center disabled-content"
                          >
                            <div class="form-check mr-3">
                              <label class="form-check-label" for="radio1">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  id="radio1"
                                  name="optradio"
                                  value="option1"
                                  checked
                                />Per/Bulan
                              </label>
                            </div>
                            <select
                              class="form-control filter-assignment mr-2"
                              v-model="selectedMonthLibrary"
                              style="width: 115px"
                            >
                              <option disabled value="">
                                Bulan
                              </option>
                              <option
                                v-for="monthFilter in month"
                                :key="monthFilter.id"
                              >
                                {{ monthFilter }}
                              </option>
                            </select>
                            <select
                              class="form-control filter-assignment mr-3"
                              v-model="selectedYearLibrary"
                              style="width: 115px"
                            >
                              <option disabled value="">
                                Tahun
                              </option>
                              <option
                                v-for="year in years"
                                :value="year"
                                :key="year.id"
                              >
                                {{ year }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div v-if="filterLibrary == 'month'">
                          <div class="row d-flex align-items-center">
                            <div class="form-check mr-3">
                              <label class="form-check-label" for="radio1">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  id="radio1"
                                  name="optradio"
                                  value="option1"
                                  checked
                                />Per/Bulan
                              </label>
                            </div>
                            <select
                              class="form-control filter-assignment mr-2"
                              v-model="selectedMonthLibrary"
                              style="width: 115px"
                            >
                              <option disabled value="">
                                Bulan
                              </option>
                              <option
                                v-for="monthFilter in month"
                                :key="monthFilter.id"
                              >
                                {{ monthFilter }}
                              </option>
                            </select>
                            <select
                              class="form-control filter-assignment mr-3"
                              v-model="selectedYearLibrary"
                              style="width: 115px"
                            >
                              <option disabled value="">
                                Tahun
                              </option>
                              <option
                                v-for="year in years"
                                :value="year"
                                :key="year.id"
                              >
                                {{ year }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div
                          v-if="filterLibrary == 'date'"
                          class="d-flex align-items-center"
                        >
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio2">
                              <input
                                type="radio"
                                class="form-check-input"
                                id="radio2"
                                name="optradio"
                                value="option2"
                              />Tanggal
                            </label>
                          </div>

                          <datepicker
                            class="my-datepicker"
                            input-class="form-control bg-white filter-datepicker_calendar"
                            placeholder="Tanggal"
                            v-model="selectedDateLibrary"
                            :format="formatDateDefault"
                            :calendar-class="`dashboard-datepicker`"
                            :required="true"
                            :readonly="false"
                          ></datepicker>
                        </div>
                        <button
                          type="submit"
                          class="btn ml-1 button-terapkan btn-outline-primary"
                        >
                          TETAPKAN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <highcharts :options="chartOptions"></highcharts>

              <!-- <div class="row">
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Peringkat pinjam/banyak :
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class=" float-left text-dark">
                        <b>1.SMA 1 Ngoro: (2.389) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left  text-dark">
                        <b>2.SD AL-HIDAYAH DLANGGU: (2.273) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left  text-dark">
                        <b>3.SMA Rahman Arif: (2.189) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left  text-dark">
                        <b>4.SD ISLAM DIPONEGORO: (1.217) </b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
            </card>
          </div>
          <div class="col-xl-3">
            <div class="box-information-onklas bg-white p-3 pb-5">
              <div class="list-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="school-information text-center p-0">
                      <h5>
                        <b>(%) Presentase perpustakaan</b>
                      </h5>

                      <radial-progress-bar
                        class="rounded-circle radialbar-klaspustaka mb-4 mt-4"
                        :diameter="200"
                        :completed-steps="klaspustaka.completedStepKlaspustaka"
                        :total-steps="klaspustaka.totalStepKlaspustaka"
                        startColor="#0054fe"
                        stopColor="#0054fe"
                        :innerStrokeWidth="10"
                        :strokeWidth="20"
                        innerStrokeColor="bg-transparent"
                      >
                        <p>{{ klaspustaka.completedStepKlaspustaka }}%</p>
                      </radial-progress-bar>
                    </div>
                    <div class="footer-information">
                      <div class="icon-information mb-3 text-center ml-2">
                        <img
                          lazy="loading"
                          v-once
                          style="width: 15px"
                          src="../../../assets/image/icons/Oval-blue-sea.png"
                          alt="peminjaman"
                        />
                        Peminjaman buku :
                        {{ klaspustaka.completedStepKlaspustaka }}%
                        <a
                          type="button"
                          @click="showModalPresentase = true"
                          class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 mt-3 ml-3"
                        >
                          <img
                            src="../../../assets/image/icons/materi.png"
                            alt=""
                          />
                          (%) Peminjaman buku
                        </a>
                        <modal-presentase-dashboard
                          v-if="showModalPresentase"
                          class="overlay"
                          @close="showModalPresentase = false"
                        ></modal-presentase-dashboard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
// import Vue from "vue";
// import VueClipboard from "vue-clipboard2";
// import BTooltipDirective from "bootstrap-vue/esm/directives/tooltip";
// Vue.use(VueClipboard);
// export default {
//   directives: {
//     "b-tooltip": BTooltipDirective,
//   },
//   data() {
//     return {};
//   },
//   methods: {
//     onCopy() {
//       this.$notify({
//         type: "success",
//         title: "Copied to clipboard",
//       });
//     },
//   },
// };
//
</script>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
// import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import Datepicker from "vuejs-datepicker";
import { Chart } from "highcharts-vue";
import ModalPresentaseDashboardPerpustakaan from "../../../components/Goverment/Modal/ModalPresentaseDashboardPerpustakaan";
import RadialProgressBar from "vue-radial-progress";
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";
// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
// import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  metaInfo: {
    title: "Dashboard Perpustakaan",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    // LineChart,
    BarChart,
    Datepicker,
    RadialProgressBar,
    highcharts: Chart,
    "modal-presentase-dashboard": ModalPresentaseDashboardPerpustakaan,
    // PageVisitsTable,
    // SocialTrafficTable,
  },
  data() {
    return {
      loading: false,

      klaspustaka: {
        completedStepKlaspustaka: 0,
        totalStepKlaspustaka: 100,
      },
      loadDataSummary: {
        dataSchoolLibrary: 0,
        dataBookStok: 0,
        dataBookUnavailable: 0,
        dataNewBook: 0,
      },

      showModalPresentase: false,
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
      },
      chartPie: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            colors: ["#4AB8FF", "#0054FE"],
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
              distance: -50,
              filter: {
                property: "percentage",
                operator: ">",
                value: 2,
              },
            },
          },
        },
        series: [
          {
            name: "Share",
            data: [
              { name: "Tidak Meminjam", y: 60 },
              { name: "Peminjaman Buku", y: 40 },
            ],
          },
        ],
      },
      month: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      filterLibrary: "lastyear",
      selectedMonthLibrary: "",
      selectedYearLibrary: "",
      selectedDateLibrary: "",

      chartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },

    async submitChartLibrary() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/book-rent/chart?filter=${self.filterLibrary}`;

      if (self.filterLibrary == "month") {
        if (self.selectedMonthLibrary == "" || self.selectedYearLibrary == "") {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthLibrary);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearLibrary}`;
        }
      } else if (self.filterLibrary == "date") {
        if (self.selectedDateLibrary == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&date=${self.formatDateDefault(
            self.selectedDateLibrary
          )}`;
        }
      }

      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              let text = "-";
              let dataTotal = item.total_rent;
              if (self.filterLibrary == "lastyear") {
                text = item.month + "/" + item.year;
              } else if (self.filterLibrary == "month") {
                text = item.date;
              } else if (self.filterLibrary == "date") {
                text = item.time;
              }

              self.chartOptions.xAxis.categories.push(text);
              self.chartOptions.series[0].data.push(dataTotal);
            });
          }
        })
        .catch((error) => {
          let message = "Opps! Terdapat kesalahan.";

          if (error.response) {
            if (error.response.data.errors) {
              message = self.handleErrorApi(
                error.response.data.errors,
                "string"
              );
            }
            self.$Swal.fire("Alert", message, "warning");
          }
        });
    },

    async loadDataPercentageDashboard() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/book-rent/percentage`;

      self.klaspustaka.completedStepKlaspustaka = 0;

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          let klaspustaka = res.data.data;

          self.klaspustaka.completedStepKlaspustaka = parseFloat(
            klaspustaka.percentage
          );
        }
      });
    },

    async loadSummaryData() {
      this.loading = true;

      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/summary`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.loadDataSummary.dataSchoolLibrary =
              res.data.data.school_library;
            self.loadDataSummary.dataBookStok = res.data.data.book_stock;
            self.loadDataSummary.dataBookUnavailable =
              res.data.data.book_unavailable;
            self.loadDataSummary.dataNewBook = res.data.data.new_book;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    async getData() {
      await this.loadSummaryData();
      await this.submitChartLibrary();
      await this.loadDataPercentageDashboard();
    },
  },

  activated() {},
  mounted() {
    this.initBigChart(0);
    this.getData();
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2017 },
        (value, index) => 2018 + index
      );
    },
  },
};
</script>
<style scoped>
.highcharts-figure,
.highcharts-data-table table {
  min-width: 200px;
  max-width: 660px;
  margin: 1em auto;
}
</style>
