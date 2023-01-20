<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">PERSENTASE PERPUSTAKAAN</h4>
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
                <div class="header-presentase d-flex align-itemx-center">
                  <div class="title-presentase">
                    <h4 class="text-primary-blue">KEAKTIFAN PEMINJAMAN BUKU</h4>
                    <p class="text-muted">
                      Akumulasi peminjaman buku di sekolah
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="box-presentase mt-4 p-3">
                  <div class="filter-presentase  d-flex align-items-center">
                    <form action="" class="d-flex align-items-center">
                      <datepicker
                        class="my-datepicker"
                        input-class="form-control bg-white mr-2 filter-datepicker_calendar"
                        placeholder="Tanggal Mulai"
                        v-model="filter.start_date"
                        :format="formatDateDefault"
                        :calendar-class="`dashboard-datepicker`"
                        :required="true"
                        :readonly="false"
                      ></datepicker>
                      <span>Hingga</span>
                      <datepicker
                        class="my-datepicker"
                        input-class="form-control bg-white ml-2 filter-datepicker_calendar"
                        placeholder="Tanggal Akhir"
                        v-model="filter.end_date"
                        :format="formatDateDefault"
                        :calendar-class="`dashboard-datepicker`"
                        :required="true"
                        :readonly="false"
                      ></datepicker>
                      <button
                        type="button"
                        class="btn-sync ml-2 bg-success text-white"
                        title="Sinkrokinsasi Data"
                        @click="loadData()"
                      >
                        <i
                          class="fas fa-sync-alt"
                          title="Sinkrokinsasi Data"
                        ></i>
                      </button>
                    </form>
                    <!-- <select class="form-control ml-2">
                      <option>Terbanyak diunduh</option>
                    </select>
                    <select class="form-control ml-2">
                      <option>Semua Grade</option>
                    </select> -->
                  </div>
                  <div class="table-presentase border mt-3 overflow-auto">
                    <!-- V-FOR PADA ROW -->
                    <div class="row d-flex">
                      <div class="col-md-4 pr-0 ">
                        <radial-progress-bar
                          class="rounded-circle radialbar-perpustakaan ml-auto mr-auto"
                          :diameter="180"
                          :completed-steps="
                            percentagePerpustakaan.complatedStepPerpustakaan
                          "
                          :total-steps="
                            percentagePerpustakaan.totalStepPerpustakaan
                          "
                          startColor="#0054FE"
                          :strokeWidth="15"
                          stopColor="#0054FE"
                          innerStrokeColor="bg-transparent"
                        >
                          <p>
                            {{
                              percentagePerpustakaan.complatedStepPerpustakaan
                            }}%
                          </p>
                        </radial-progress-bar>
                        <div
                          class="information-posting mt-2 d-flex align-items-center"
                        >
                          <div
                            class="icon-information ml-2 mr-auto ml-auto"
                            style="font-size:12px;"
                          >
                            Peminjaman buku :
                            <b class="text-dark">
                              {{
                                percentagePerpustakaan.complatedStepPerpustakaan
                              }}% ({{ meta.total_student_on_school }} Siswa)</b
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div
                          class=" d-flex"
                          v-for="(item, index) in meta.data"
                          :key="`${index}-percentage`"
                        >
                          <div class="col-5 p-0">
                            <div
                              class="list-school text-left d-flex align-items-center"
                            >
                              <p class="mr-1 pl-1">{{ index + 1 }}.</p>
                              <p>{{ item.class_name }}</p>
                            </div>
                          </div>
                          <div class="col-7 pl-0">
                            <div
                              class="data-activity d-flex align-items-center"
                            >
                              <div class="activity-student mr-1">
                                <p>
                                  (Total Peminjaman: {{ item.total_book_rent }})
                                </p>
                              </div>
                              <div class="activity-download">
                                <p>
                                  (pinjam: {{ item.total_student_on_class }}/{{
                                    item.total_book_rent
                                  }})
                                </p>
                              </div>
                              <div
                                class="activity-presentase ml-auto text-primary-blue"
                              >
                                <p>({{ item.percentage }})</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--  -->
                  </div>
                </div>
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
import Datepicker from "vuejs-datepicker";
import broker from "../../../../utils/broker";
import RadialProgressBar from "vue-radial-progress";
// import * as chartConfigs from "@/components/Charts/config";

let date = new Date();

export default {
  name: "ModalPresentaseMateri",
  components: {
    Datepicker,
    RadialProgressBar,
  },
  props: ["schoolId"],
  data() {
    return {
      filter: {
        limit: 10,
        checkedDate: false,
        start_date: new Date(date.getFullYear(), date.getMonth(), 1),
        end_date: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
      meta: {
        queryParams: "",
        sequence: 0,
        searchLoading: true,
        data: [],
        total: 0,
        total_student_have_rent: 0,
        total_student_on_school: 0,
        percentage: "",
      },
      percentagePerpustakaan: {
        complatedStepPerpustakaan: 0,
        totalStepPerpustakaan: 100,
      },

      SchoolId: this.schoolId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },

    loadData() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.SchoolId}/book-percentage`;
      // endPoint += `?start_date=${self.formatDateDefault(
      //   self.filter.start_date
      // )}`;
      // endPoint += `&end_date=${self.formatDateDefault(self.filter.end_date)}`;

      self.meta.data = [];
      self.meta.searchLoading = true;
      self.percentagePerpustakaan.complatedStepPerpustakaan = 0;
      self.meta.total_student_on_school = 0;
      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.meta.searchLoading = false;
          self.meta.data = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.meta.data.push(item);
            });
          }
          if (res.data.meta) {
            self.meta.total_student_on_school =
              res.data.meta.total_student_on_school;
            self.meta.total_student_have_rent =
              res.data.meta.total_student_have_rent;
            self.percentagePerpustakaan.complatedStepPerpustakaan = parseFloat(
              res.data.meta.percentage
            );
            self.meta.total_student_on_school =
              res.data.meta.total_student_on_school;
          }
        })
        .catch((error) => {
          let message = "Opps! Ada kesalahan.";
          console.log("===schoolId", self.SchoolId);
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
    refreshData() {
      this.filter.limit = 10;
      this.filter.checkedDate = false;
      this.filter.start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter.end_date = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );
      this.meta.queryParams = "";
      this.meta.sequence = 0;
      this.meta.searchLoading = true;
      this.meta.data = [];
      this.meta.total = 0;
      this.meta.total_done_assignment = 0;
      this.meta.total_assignment = 0;
      this.meta.percentage = "";
    },
  },
  mounted() {
    this.refreshData();
    this.loadData();
  },
  created() {},
  activated() {},
  watch: {},
};
</script>
