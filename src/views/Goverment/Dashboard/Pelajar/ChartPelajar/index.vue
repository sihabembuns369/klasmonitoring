<template>
  <div>
    <card header-classes="bg-transparent">
      <form @submit.prevent="submitChartMember">
        <div slot="header" class="header">
          <div class="information-posting d-flex align-items-center">
            <div
              class="label font-weight-bold text-dark"
              style="font-size: 14px"
            >
              Jumlah Pelajar
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div
                class="filter d-flex align-items-center mt-3 pr-0 float-right text-muted w-100"
              >
                <div class="form-check pl-0 mr-3">
                  <label class="form-check-label" for="radio1">
                    Filter
                  </label>
                </div>
                <select
                  class="form-control filter-assignment w-25 mr-auto"
                  v-model="filterMember"
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
                <div v-if="filterMember == 'lastyear'">
                  <div class="row d-flex align-items-center disabled-content">
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
                      v-model="selectedMonthMember"
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
                      v-model="selectedYearMember"
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
                <div v-if="filterMember == 'month'">
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
                      v-model="selectedMonthMember"
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
                      v-model="selectedYearMember"
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
                  v-if="filterMember == 'date'"
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
                    v-model="selectedDateMember"
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
      <chart :options="chartMember"></chart>
      <!-- <div class="row">
              <div class="col-md-8 d-flex align-items-center">
                <chart
                  class="chart-figure-dashboard"
                  :options="chartPie"
                ></chart>
                <div class="teacher-count">
                  Total Guru: <br />
                  4.470
                </div>
              </div>
              <div class="col-md-4 filter-klasmember">
                <label for="grade-sd">Grade SD</label>
                <label for="grade-sd" class="float-right text-primary"
                  >25%</label
                >
                <div class="progress" id="grade-sd">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    style="width: 25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-smp">Grade SMP</label>
                <label for="grade-smp" class="float-right text-info">25%</label>
                <div class="progress" id="grade-smp">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style="width: 50%"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-sma">Grade SMA</label>
                <label for="grade-sma" class="float-right text-warning"
                  >25%</label
                >

                <div class="progress" id="grade-sma">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 75%"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-smk">Grade SMK</label>
                <label for="grade-smk" class="float-right text-danger"
                  >25%</label
                >

                <div class="progress" id="grade-smk">
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 100%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div> -->

      <!-- <div class="row">
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Grade SD:
                      <a class=" float-right text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMP:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMA:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMK:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4">
                <div class="periode-chart float-left">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSD }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMP }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMA }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMK }})</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="periode-chart float-left">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class=" float-right text-dark">
                        <b>staff : (6%) 505 / 8.431)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (8%) 877 / 5.733)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (2%) 168 / 5.733)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (4%) 337 / 8.431)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
    </card>
  </div>
</template>
<script>
import broker from "../../../../../utils/broker";
import { Chart } from "highcharts-vue";
import { _ } from "vue-underscore";

export default {
  name: "ChartPelajar",
  data() {
    return {
      filterMember: "lastyear",
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
      chartMember: {
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

      selectedMonthMember: "",
      selectedYearMember: "",
      selectedDateMember: "",
    };
  },
  components: {
    Chart,
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
  mounted() {
    this.getData();
  },
  methods: {
    async submitChartMember() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/member/chart?filter=${self.filterMember}`;

      if (self.filterMember == "month") {
        if (self.selectedMonthMember == "" || self.selectedYearMember == "") {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthMember);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearMember}`;
        }
      } else if (self.filterMember == "date") {
        if (self.selectedDateMember == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&date=${self.formatDateDefault(
            self.selectedDateMember
          )}`;
        }
      }

      self.chartMember.xAxis.categories = [];
      self.chartMember.series[0].data = [];

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          res.data.data.forEach((item) => {
            let text = "-";
            let dataTotal = item.student.total_student;
            if (self.filterMember == "lastyear") {
              text = item.month + "/" + item.year;
            } else if (self.filterMember == "month") {
              text = item.date;
            } else if (self.filterMember == "date") {
              text = item.time;
            }
            self.chartMember.xAxis.categories.push(text);
            self.chartMember.series[0].data.push(dataTotal);
          });
        }
      });
    },
    async getData() {
      await this.submitChartMember();
    },
  },
};
</script>
