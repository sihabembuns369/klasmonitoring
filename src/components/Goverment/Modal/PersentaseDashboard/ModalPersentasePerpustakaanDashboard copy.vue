<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-dark">PEMINJAMAN BUKU PERPUSTAKAAN</h4>
            <button
              type="button"
              class="close"
              @click="close"
              data-dismiss="modal"
            >
              [x] Tutup
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="header-presentase d-flex">
                  <!-- <div class="title-presentase ">
                    <select class="form-control" style="width:170px">
                      <option>Semua Grade</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                      <option value="X">X</option>
                    </select>
                  </div> -->
                  <div class="presentase-total text-muted border-0">
                    Total pelajar :
                    <span class="font-weight-bold text-dark"
                      >({{ totalStudent }})</span
                    >
                  </div>
                  <div
                    class="presentase-materi pb-2 d-flex align-items-center ml-auto"
                  >
                    <radial-progress-bar
                      class="rounded-circle radialbar-perpustakaan mr-2"
                      :diameter="50"
                      :completed-steps="percentageRentBook"
                      :total-steps="100"
                      startColor="#0054FE"
                      stopColor="#0054FE"
                      :strokeWidth="5"
                      innerStrokeColor="bg-transparent"
                    >
                      <!-- <p>{{ percentageRentBook }}</p> -->
                    </radial-progress-bar>
                    <span class="font-weight-bold"
                      >Peminjaman Buku Perpustakaan</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row chart-persentase-modal">
              <div class="col-md-12 border-top border-bottom mt-2 pt-2">
                <p class="text-muted">
                  Persentase pelajar dalam keaktifan peminjaman buku setiap
                  bulannya (1x peminjaman per/id pelajar - per/bulan)
                </p>
                <highcharts
                  style="height:250px"
                  :options="chartOptions"
                ></highcharts>
              </div>
            </div>
            <div class="row mt-2">
              <div
                class="col-md-4"
                v-for="(item, index) in listExamPercentage"
                :key="`${index}-listPercentage`"
              >
                <span> {{ item.month | formatDateMonth }}: </span>
                <span class="ml-2"
                  >({{ item.total_student_have_rent }}) pelajar ({{
                    item.percentage
                  }})</span
                >
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <!-- <div class="modal-footer">
            <button
              type="button"
              @click="$emit('close')"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { Chart } from "highcharts-vue";
import broker from "../../../../utils/broker";
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "ModalPresentasePerpustakaan",
  components: {
    highcharts: Chart,
    RadialProgressBar,
  },
  data() {
    return {
      month: [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      totalStudent: 0,
      listExamPercentage: [],
      percentageRentBook: 0,
      chartOptions: {
        colors: ["#4AB8FF"],

        chart: {
          type: "area",
        },
        title: {
          text: "",
        },
        subtitle: {
          //   text: "* Jane's banana consumption is unknown",
          //   align: "right",
          //   verticalAlign: "bottom",
        },
        legend: {
          layout: "vertical",
          align: "left",
          verticalAlign: "top",
          x: 100,
          y: 70,
          floating: true,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
        },
        xAxis: {
          categories: [],
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        plotOptions: {
          area: {
            fillOpacity: 0.5,
          },
        },
        credits: {
          enabled: false,
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
    close() {
      this.$emit("close");
    },

    async chartDetailExam() {
      let self = this;
      self.$Progress.start();
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/percentage/book-rent/detail`;

      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];
      self.listExamPercentage = [];
      self.totalStudent = 0;
      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.chartOptions.xAxis.categories.push(self.month[item.month]);
              self.chartOptions.series[0].data.push(item.total_student);
              self.listExamPercentage.push(item);
            });
          }
          self.totalStudent = res.data.meta.total_student;

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
    async percentageRentBookAll() {
      let self = this;
      self.$Progress.start();
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/percentage/book-rent`;

      self.percentageRentBook = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            let percentageData = res.data.data.percentage;
            self.percentageRentBook = parseFloat(percentageData);
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
    async getData() {
      await this.chartDetailExam();
      await this.percentageRentBookAll();
    },
  },
  mounted() {
    this.getData();
  },
  created() {},
  activated() {},
  watch: {},
};
</script>
