<template>
  <div>
    <card header-classes="bg-transparent">
      <form @submit.prevent="submitChartAssignment">
        <div slot="header" class="header">
          <div class="information-posting d-flex align-items-center">
            <div
              class="label font-weight-bold text-dark"
              style="font-size: 14px"
            >
              Total (%) pengerjaan tugas
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
                  v-model="filterAssignment"
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
                <div v-if="filterAssignment == 'lastyear'">
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
                      v-model="selectedMonthAssignment"
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
                      v-model="selectedYearAssignment"
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
                <div v-if="filterAssignment == 'month'">
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
                      v-model="selectedMonthAssignment"
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
                      v-model="selectedYearAssignment"
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
                  v-if="filterAssignment == 'date'"
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
                    v-model="selectedDateAssignment"
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
      <chart :options="chartTugas"></chart>

      <div class="row">
        <div class="col-md-3">
          <div class="periode-chart">
            <ul class="list-group list-group-unbordered">
              <li class="list-group-item mb-1">
                Peringkat jumlah tugas:
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div
              class="col-md-4 p-0"
              v-for="(item, index) in assignment.assignmentBySubject.slice(
                0,
                12
              )"
              :key="`${index}-assignment`"
            >
              <div class="periode-chart">
                <ul class="list-group list-group-unbordered">
                  <li class="list-group-item text-dark">
                    <b
                      >{{ index + 1 }}. {{ item.subject_name }}: ({{
                        item.total
                      }})</b
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
import { _ } from "vue-underscore";
import broker from "../../../../../utils/broker";

export default {
  name: `ChartPengerjaanTugas`,
  data() {
    return {
      filterAssignment: "lastyear",
      selectedMonthAssignment: "",
      selectedYearAssignment: "",
      selectedDateAssignment: "",
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
      chartTugas: {
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
      modalAssignment: {
        type: 0,
        label: "",
        data: [],
      },
      assignment: { assignmentBySubject: [] },
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
    async submitChartAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/assignment/chart?filter=${self.filterAssignment}&progress=${self.assignmentStatus}`;

      if (self.assignmentClassroom) {
        if (self.assignmentClassroom.id != 0) {
          endPoint += `&class=${self.assignmentClassroom.id}`;
        }
      }

      if (self.filterAssignment == "month") {
        if (
          self.selectedMonthAssignment == "" ||
          self.selectedYearAssignment == ""
        ) {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthAssignment);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearAssignment}`;
        }
      } else if (self.filterAssignment == "date") {
        if (self.selectedDateAssignment == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&date=${self.formatDateDefault(
            self.selectedDateAssignment
          )}`;
        }
      }

      self.chartTugas.xAxis.categories = [];
      self.chartTugas.series[0].data = [];

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          res.data.data.assignment_percentages.forEach((item) => {
            let text = "-";
            let dataTotal = item.total_assignment;
            if (self.filterAssignment == "lastyear") {
              text = item.month + "/" + item.year;
            } else if (self.filterAssignment == "month") {
              text = item.date;
            } else if (self.filterAssignment == "date") {
              text = item.time;
            }

            self.chartTugas.xAxis.categories.push(text);
            self.chartTugas.series[0].data.push(dataTotal);
          });
        }
      });

      self.assignment.assignmentBySubject = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.assignment_by_subjects.forEach((item) => {
              self.assignment.assignmentBySubject.push(item);
            });
            // let assignmentSubject = res.data.data.assignment_by_subjects;
            // console.log('====',self.assignment.assignmentBySubject.push(assignmentSubject));
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

    async getData() {
      await this.submitChartAssignment();
    },
  },
};
</script>
