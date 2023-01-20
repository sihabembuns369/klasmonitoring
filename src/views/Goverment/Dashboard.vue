<template>
  <div>
    <base-header
      type="gradient-success"
      class="container pb-6 pb-8 pt-5 pt-md-8"
    >
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/sekolah"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/Sekolah.png"
                alt="sekolah"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summarySchool }}
              </div>
              <div class="statistic-information text-muted">
                Sekolah
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/pelajar"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/Pelajar.png"
                alt="pelajar"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryStudent }}
              </div>
              <div class="statistic-information text-muted">
                Pelajar
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/guru-staff"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/GuruStaff.png"
                alt="guru staff"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryTeacher }}
              </div>
              <div class="statistic-information text-muted">
                Guru & Staff
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/materi"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/materi.png"
                alt="materi"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryTheory }}
              </div>
              <div class="statistic-information text-muted">
                Materi
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row ">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/tugas"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/Tugas.png"
                alt="tugas"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryAssignment }}
              </div>
              <div class="statistic-information text-muted">
                Tugas
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/ujian"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/Ujian.png"
                alt="ujian"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryExam }}
              </div>
              <div class="statistic-information text-muted">
                Ujian
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/mapel"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/Perpustakaan.png"
                alt="mapel"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summarySubject }}
              </div>
              <div class="statistic-information text-muted">
                Mapel
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <div
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../assets/image/logo/kelulusan.png"
                alt="website"
              />
            </div>
            <div class="statistic ml-4">
              <div
                class="statistic-calculation font-weight-bold text-white bg-red text-center rounded-pill"
              >
                SOON
              </div>
              <div class="statistic-information text-muted">
                Website
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Charts-->
      <div class="mt-4">
        <!-- Keaktifan sekolah -->
        <div class="notification-refresh border p-2">
          <div class="row">
            <div class="col-md-12 d-flex align-items-center">
              <div class="logo-notification">
                <img
                  lazy="loading"
                  v-once
                  src="../../assets/image/logo/Logo-Onklas.png"
                  alt="keaktifan sekolah"
                />
                <span>KEAKTIFAN SEKOLAH</span>
              </div>
              <div class="information-notification ml-auto">
                <a href="javascript:;" @click="loadDataActiveSchool">
                  <span> Muat Ulang </span>
                </a>
                <button
                  type="button"
                  class="btn-sync ml-1 bg-success"
                  title="Sinkrokinsasi Data"
                  @click="loadDataActiveSchool"
                >
                  <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <!--  -->
          <div class="col-xl-12">
            <card header-classes="bg-transparent">
              <!-- V-FOR -->
              <div
                class="progress-bar-active-school "
                v-for="(item, index) in progress.progressItem"
                :key="`${index}-activeSchool`"
              >
                <div class="row mb-2">
                  <div class="col-md-2">
                    <div class="product-school">
                      <p class="text-muted name-product">
                        {{
                          item.product_display_name == null
                            ? item.product_name
                            : item.product_display_name
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="progress progress-custome mt-2">
                      <div
                        v-if="
                          (item.total_school / progress.totalSchool) * 100 < 50
                        "
                        class="progress-bar bg-progress"
                        role="progressbar"
                        :style="{
                          width:
                            (item.total_school / progress.totalSchool) * 100 +
                            '%',
                          background: '#ff2e00 !important',
                        }"
                        :aria-valuenow="item.total_school"
                        aria-valuemin="0"
                        :aria-valuemax="progress.totalSchool"
                      ></div>
                      <div
                        v-else-if="
                          (item.total_school / progress.totalSchool) * 100 >
                            50 &&
                            (item.total_school / progress.totalSchool) * 100 <=
                              60
                        "
                        class="progress-bar bg-progress"
                        role="progressbar"
                        :style="{
                          width:
                            (item.total_school / progress.totalSchool) * 100 +
                            '%',
                          background: '#FFB200 !important',
                        }"
                        :aria-valuenow="item.total_school"
                        aria-valuemin="0"
                        :aria-valuemax="progress.totalSchool"
                      ></div>
                      <div
                        v-else-if="
                          (item.total_school / progress.totalSchool) * 100 >
                            60 &&
                            (item.total_school / progress.totalSchool) * 100 <=
                              80
                        "
                        class="progress-bar bg-progress"
                        role="progressbar"
                        :style="{
                          width:
                            (item.total_school / progress.totalSchool) * 100 +
                            '%',
                          background: '#04a4eb !important',
                        }"
                        :aria-valuenow="item.total_school"
                        aria-valuemin="0"
                        :aria-valuemax="progress.totalSchool"
                      ></div>
                      <div
                        v-else-if="
                          (item.total_school / progress.totalSchool) * 100 >
                            80 &&
                            (item.total_school / progress.totalSchool) * 100 <=
                              100
                        "
                        class="progress-bar bg-progress"
                        role="progressbar"
                        :style="{
                          width:
                            (item.total_school / progress.totalSchool) * 100 +
                            '%',
                          background: '#32BEA6 !important',
                        }"
                        :aria-valuenow="item.total_school"
                        aria-valuemin="0"
                        :aria-valuemax="progress.totalSchool"
                      ></div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="product-school">
                      <div class="row">
                        <div class="col-md-6 pl-0">
                          <span
                            >(<b
                              class="text-primary-blue font-weight-bold"
                              :title="
                                item.total_school + ' Sekolah yang memakai'
                              "
                              >{{ item.total_school }}</b
                            >/
                            <b
                              class="text-muted"
                              :title="
                                progress.totalSchool +
                                  ' Total sekolah keseluruhan'
                              "
                            >
                              {{ progress.totalSchool }}</b
                            >)</span
                          >
                          <span class="ml-1 text-dark font-weight-bold"
                            >({{
                              ((item.total_school / progress.totalSchool) *
                                100)
                                | formatNumberDecimal
                            }}%)</span
                          >
                        </div>

                        <div class="col-md-6">
                          <router-link
                            :to="
                              `/detail/${item.product_id}/product/${item.product_name}`
                            "
                            class="btn btn-custom-detail btn-outline-primary w-100"
                            >Detail</router-link
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="row">
                <div class="col-md-12 d-flex item-aligns-center">
                  <p
                    class="text-dark font-weight-bold"
                    style="font-size: 14px !important"
                  >
                    {{
                      item.product_display_name == null
                        ? item.product_name
                        : item.product_display_name
                    }}
                  </p>
                  <p class="ml-auto" style="font-size: 14px !important">
                    <b
                      class="text-primary-blue font-weight-bold"
                      :title="item.total_school + ' Sekolah yang memakai'"
                      >{{ item.total_school }}</b
                    >/
                    <b
                      class="text-muted"
                      :title="
                        progress.totalSchool + ' Total sekolah keseluruhan'
                      "
                    >
                      {{ progress.totalSchool }}</b
                    >
                  </p>
                </div>
              </div> -->
              </div>
            </card>
          </div>

          <!--  -->
        </div>
        <!-- End Keaktifan sekolah -->

        <!-- ONKLAS -->
        <div class="notification-refresh border p-2 mt-4">
          <div class="row">
            <div class="col-md-12 d-flex align-items-center">
              <div class="logo-notification">
                <img
                  lazy="loading"
                  v-once
                  src="../../assets/image/logo/Logo-Onklas.png"
                  alt="onklas"
                />
                <span>ONKLAS</span>
              </div>
              <div class="information-notification ml-auto">
                <a
                  href="javascript:;"
                  @click="
                    submitChartFeed();
                    loadDataActiveFeed();
                  "
                >
                  <span> Muat Ulang </span>
                </a>
                <button
                  type="button"
                  class="btn-sync ml-1 bg-success"
                  title="Sinkrokinsasi Data"
                  @click="
                    submitChartFeed();
                    loadDataActiveFeed();
                  "
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
            <card header-classes="bg-transparent">
              <form @submit.prevent="submitChartFeed">
                <div slot="header" class="header">
                  <div class="information-posting d-flex align-items-center">
                    <span class="label font-weight-bold text-dark">
                      Posting
                    </span>
                    <div class="icon-information ml-2">
                      <img
                        lazy="loading"
                        v-once
                        src="../../assets/image/icons/Oval.png"
                        alt="status ebook"
                      />
                      status
                      <img
                        lazy="loading"
                        v-once
                        src="../../assets/image/icons/Oval-blue-sea.png"
                        alt="ebook"
                      />
                      e-book
                    </div>
                    <div class="status-information ml-auto">
                      <span class="text-muted">Total :</span>
                      <span class="ml-2 font-weight-bold text-dark"
                        >status: ({{ totalStatusChartFeed }}) · e-book: ({{
                          totalEbookChartFeed
                        }})</span
                      >
                    </div>
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
                          v-model="filterFeed"
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
                        <div v-if="filterFeed == 'lastyear'">
                          <div
                            class="row d-flex align-items-center disabled-content"
                          >
                            <div class="form-check mr-3">
                              <label class="form-check-label" for="radio1">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="optradio"
                                  value="option1"
                                  checked
                                />Per/Bulan
                              </label>
                            </div>
                            <select
                              class="form-control filter-assignment mr-2"
                              v-model="selectedMonth"
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
                              v-model="selectedYear"
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
                        <div v-if="filterFeed == 'month'">
                          <div class="row d-flex align-items-center">
                            <div class="form-check mr-3">
                              <label class="form-check-label" for="radio1">
                                <input
                                  type="radio"
                                  class="form-check-input"
                                  name="optradio"
                                  value="option1"
                                  checked
                                />Per/Bulan
                              </label>
                            </div>
                            <select
                              class="form-control filter-assignment mr-2"
                              v-model="selectedMonth"
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
                              v-model="selectedYear"
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
                          v-if="filterFeed == 'date'"
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
                            v-model="selectedDate"
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

              <div class="row">
                <div
                  v-for="(item, index) in listChartFeed.slice(1, 13)"
                  :key="`${index}-listFeed`"
                  class="col-md-4 text-center"
                >
                  <div class="periode-chart">
                    <ul class="list-group list-group-unbordered">
                      <li class="list-group-item mb-1">
                        {{ item.month | formatDateMonth }}:
                        <a class=" text-dark">
                          <b
                            >status: ({{ item.total_text }}) . e-book: ({{
                              item.total_ebook
                            }})</b
                          >
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </card>
          </div>
          <div class="col-xl-3">
            <div class="box-information-onklas bg-white p-3 pb-5">
              <div class="header text-center font-weight-bold mt-2">
                <p>Hari ini</p>
                <div class="form-group">
                  <select
                    class="form-control"
                    v-model="filterFeedStatistic"
                    @change="loadDataActiveFeed"
                    required
                  >
                    <option value="school">Posting/Sekolah</option>
                    <option value="student">Posting/Pelajar</option>
                    <option value="teacher">Posting/Guru</option>
                  </select>
                </div>
              </div>
              <div class="list-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="school-information">
                      <ul
                        class="list-group list-group-unbordered"
                        v-if="feed.activeUserLimit.length > 0"
                      >
                        <li
                          class="list-group-item"
                          v-for="(item, index) in feed.activeUserLimit"
                          :key="`${index}-activeUser`"
                        >
                          <a class="float-left text-muted">
                            <b>{{ index + 1 }}</b>
                          </a>
                          <a class="ml-2">
                            {{ item.school_name }}
                          </a>
                          <a class="float-right text-primary-blue">
                            <b>({{ item.total }})</b>
                          </a>
                        </li>
                      </ul>
                      <ul class="list-group list-group-unbordered" v-else>
                        <li class="list-group-item text-center">
                          Tidak ditemukan data.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
        <!-- End ONKLAS -->

        <!-- Klasmember -->
        <Pelajar />
        <!--End Klasmember-->

        <!-- Tugas -->
        <Tugas />
        <!-- End Tugas -->

        <!-- Persentase -->
        <Persentase />
        <!-- End Persentase -->

        <!-- Map  -->
        <PetaPersebaran />
        <!-- Map  -->
      </div>
    </base-header>
  </div>
</template>
<style lang="scss">
.highcharts-figure-dashboard {
  .highcharts-data-table table {
    min-width: 100px;
    max-width: 300px;
  }
}

// .map-indonesia {
//   .icon-guru {
//     $num-colors: 100;
//     $base-color: red;
//     $spectrum: 360deg;
//     $offset: 50deg;

//     @for $i from 0 to $num-colors {
//       &:nth-child(#{$i}) {
//         $background-color: rgb(
//           random(255),
//           random(255),
//           random(255)
//         ) !important;
//         background-color: $background-color;
//         border: $background-color;
//         .popup-tip-custome {
//           background-color: $background-color;
//           border: $background-color;
//         }
//       }
//     }
//   }
// }
</style>

<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
// Map
import PetaPersebaran from "../Goverment/Dashboard/PetaPersebaran";
// Persentase
import Persentase from "../Goverment/Dashboard/Persentase";
// Tugas
import Tugas from "./Dashboard/Tugas";
// Member
import Pelajar from "./Dashboard/Pelajar";
// import LineChart from "@/components/Charts/LineChart";
import Datepicker from "vuejs-datepicker";
import { Chart } from "highcharts-vue";
import broker from "../../utils/broker";
import { _ } from "vue-underscore";

import dataLocation from "./data/id.json";

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
// import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  metaInfo: {
    title: "Dashboard",
    titleTemplate: "%s | Klasmonitoring Pemerintah",
  },
  components: {
    PetaPersebaran,
    Persentase,
    Datepicker,
    Tugas,
    Pelajar,
    highcharts: Chart,
    // PageVisitsTable,
    // SocialTrafficTable,
  },

  data() {
    return {
      loading: false,
      dataLocation,
      filterFeed: "lastyear",
      filterFeedStatistic: "school",
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
      selectedMonth: "",
      selectedYear: "",
      selectedDate: "",
      totalStatusChartFeed: 0,
      totalEbookChartFeed: 0,
      listChartFeed: [],
      filterAssignment: "lastyear",
      selectedMonthAssignment: "",
      selectedYearAssignment: "",
      selectedDateAssignment: "",
      classrooms: [],
      assignmentStatus: "done",
      assignmentClassroom: {
        id: 0,
        name: "Semua Kelas",
      },

      feed: {
        activeUser: [],
        popularHastag: [],
        percentage: [],
        activeUserLimit: [],
        popularHastagLimit: [],
        percentageLimit: [],
        activeUserFilter: "today",
        popularHastagFilter: "today",
        percentageFilter: "today",
      },

   

      loadData: {
        assignment: 0,
        theory: 0,
        student: 0,
        teacherStaff: 0,
        exam: 0,
        subject: 0,
        school: 0,
      },

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

      chartOptions: {
        colors: ["#4AB8FF", "#0054FE"],
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Status",
            data: [],
          },

          {
            name: "E-book",
            data: [],
          },
        ],
      },

      chartPie: {
        colors: ["#4AB8FF", "#0054FE", "#"],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 250,
          width: 300,
          padding: 0,
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
            colors: ["#0054FE", "#FFB200", "#FF2E00", "#4AB8FF"],
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
            data: [],
          },
        ],
      },

     
      progress: {
        totalSchool: 0,
        progressItem: [],
        summarySchool: 0,
        summaryStudent: 0,
        summaryTeacher: 0,
        summaryTheory: 0,
        summaryAssignment: 0,
        summaryExam: 0,
        summarySubject: 0,
      },
    };
  },
  mounted() {
    this.initBigChart(0);
    // this.submitChartAssignment();
    // this.loadDataTotalAssignment();
    // this.submitChartFeed();
    // this.loadDataActiveFeed();
    // this.loadDataPercentageDashboard();
    // this.loadDataKlasMember();
    // this.submitChartMember();
    // this.loadDataAssignment();
    // this.loadDataExam();
    // this.loadDataSubject();
    // this.loadDataTheory();
    // this.loadDataSchool();
    // this.loadDataStudent();
    // this.loadDataTeacher();
    // this.loadDataActiveSchool();
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
    // filterLocation() {
    //   // return this.dataLocation.filter(
    //   //   (location) => location.admin_name == "Sulawesi Utara"
    //   // );

    //   return this.cityLocationByLocation.filter();
    // },
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

    async listChartFeedPosting() {
      let self = this;

      self.$Progress.start();
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/chart?filter=${self.filterFeed}`;
      self.listChartFeed = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.listChartFeed.push(item);
            });
          }
          self.$Progress.finish();
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

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    async submitChartFeed() {
      let self = this;

      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/chart?filter=${self.filterFeed}`;
      // let sum = 0;
      if (self.filterFeed == "month") {
        if (self.filterFeed == "" || self.selectedYear == "") {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan.", "warning");
          self.$Progress.fail();
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonth);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYear}`;
        }
      } else if (self.filterFeed == "date") {
        if (self.selectedDate == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
          self.$Progress.fail();
        } else {
          endPoint += `&date=${self.formatDateDefault(self.selectedDate)}`;
        }
      }

      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];
      self.chartOptions.series[1].data = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              let text = "-";
              let dataStatus = item.total_text;
              let dataEbook = item.total_ebook;

              self.totalStatusChartFeed += dataStatus;
              self.totalEbookChartFeed += dataEbook;

              // console.log(
              //   "dataStatus",
              //   item.reduce((acc, items) => acc + items.total_text, 0)
              // );
              // console.log('dataEbook', dataEbook);

              if (self.filterFeed == "lastyear") {
                text = item.month + "/" + item.year;
              } else if (self.filterFeed == "month") {
                text = item.date;
              } else if (self.filterFeed == "date") {
                text = item.time;
              }

              self.chartOptions.xAxis.categories.push(text);
              self.chartOptions.series[0].data.push(dataStatus);
              self.chartOptions.series[1].data.push(dataEbook);
            });
          }
          self.$Progress.finish();
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

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    async loadDataActiveFeed() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/statistic?filter=${self.filterFeedStatistic}`;
      self.feed.activeUser = [];
      self.feed.activeUserLimit = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.feed.activeUser = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 10) {
                self.feed.activeUserLimit.push(item);
                flag++;
              }
              self.$Progress.finish();
            });
          }
        })
        .catch(() => {});
    },

   

    
    async loadDataActiveSchool() {
      this.loading = true;

      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/summary`;

      self.progress.totalSchool = 0;
      self.progress.progressItem = [];
      self.progress.summarySchool = 0;
      self.progress.summaryStudent = 0;
      self.progress.summaryTeacher = 0;
      self.progress.summaryTheory = 0;
      self.progress.summaryAssignment = 0;
      self.progress.summaryExam = 0;
      self.progress.summarySubject = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.progress.totalSchool = 0;
          self.progress.summarySchool = 0;
          self.progress.summaryStudent = 0;
          self.progress.summaryTeacher = 0;
          self.progress.summaryTheory = 0;
          self.progress.summaryAssignment = 0;
          self.progress.summaryExam = 0;
          self.progress.summarySubject = 0;
          self.progress.progressItem = [];

          if (res.data.data) {
            self.progress.totalSchool = res.data.data.school;
            self.progress.summarySchool = res.data.data.school;
            self.progress.summaryStudent = res.data.data.student;
            self.progress.summaryTeacher = res.data.data.teacher_staff;
            self.progress.summaryTheory = res.data.data.theory;
            self.progress.summaryAssignment = res.data.data.assignment;
            self.progress.summaryExam = res.data.data.exam;
            self.progress.summarySubject = res.data.data.subject;
            // console.log("ACTIVE", self.progress.totalSchool);

            res.data.data.products.forEach((item) => {
              self.progress.progressItem.push(item);
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    async getData() {
      await this.loadDataActiveSchool();
      await this.submitChartFeed();
      await this.listChartFeedPosting();
      await this.loadDataActiveFeed();
    },
  },
};
</script>
<style scoped>
.highcharts-figure-dashboard,
.highcharts-data-table table {
  min-width: 100px;
  max-width: 300px;
}
</style>
