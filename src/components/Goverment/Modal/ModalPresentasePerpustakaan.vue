<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">PRESENTASE PEMINJAMAN BUKU SEKOLAH</h4>
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
                    <h4 class="text-primary">PERPUSTAKAAN</h4>
                    <p class="text-muted">
                      Peringkat perpustakaan sekolah
                    </p>
                  </div>
                  <div class="presentase-materi ml-auto">
                    {{ meta.percentage }}
                    <span class="font-weight-bold"
                      >Peminjaman buku sekolah</span
                    >
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
                    <div class="row d-flex align-items-center">
                      <div class="col-md-4 pr-0">
                        <div class="p-0" style="height:25px">
                          <div
                            class="progress-bar pl-1 pb-0 pr-0"
                            role="progressbar"
                            :style="{ width: 100 }"
                            :aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            SMA ONKLAS
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div
                          class="list-school text-left d-flex align-items-center"
                        >
                          <p class="mr-1 pl-1">1.</p>
                          <p>SMA ONKLAS</p>
                        </div>
                      </div>
                      <div class="col-4 pl-0">
                        <div class="data-activity d-flex align-items-center">
                          <div class="activity-student mr-1">
                            <p>(Pinjam/tahun:1)</p>
                          </div>
                          <div class="activity-download">
                            <p>
                              (Total pinjam:2)
                            </p>
                          </div>
                          <div
                            class="activity-presentase ml-auto text-primary-blue"
                          >
                            <p>(100%)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- V-FOR PADA ROW -->
                    <div
                      class="row d-flex align-items-center"
                      v-for="(item, index) in meta.data"
                      :key="`${index}-percentage`"
                    >
                      <div class="col-md-4 pr-0">
                        <div class="p-0" style="height:25px">
                          <div
                            class="progress-bar pl-1 pb-0 pr-0"
                            role="progressbar"
                            :style="{ width: item.percentage }"
                            :aria-valuenow="item.percentage"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {{ item.school_name }}
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div
                          class="list-school text-left d-flex align-items-center"
                        >
                          <p class="mr-1 pl-1">1.</p>
                          <p>{{ item.school_name }}</p>
                        </div>
                      </div>
                      <div class="col-4 pl-0">
                        <div class="data-activity d-flex align-items-center">
                          <div class="activity-student mr-1">
                            <p>(Pinjam/tahun:{{ item.rent_per_year }})</p>
                          </div>
                          <div class="activity-download">
                            <p>
                              (Total pinjam:{{ item.total_student_have_rent }})
                            </p>
                          </div>
                          <div class="activity-presentase ml-auto text-primary">
                            <p>({{ item.percentage }})</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
import broker from "../../../utils/broker";
let date = new Date();
export default {
  name: "ModalPresentaseMateri",
  components: {
    Datepicker,
  },
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
        total_download: 0,
        total_view: 0,
        percentage: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },

    loadData() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/book-rent/percentage/detail`;

      endPoint += `?start_date=${self.formatDateDefault(
        self.filter.start_date
      )}`;
      endPoint += `&end_date=${self.formatDateDefault(self.filter.end_date)}`;

      self.meta.data = [];
      self.meta.searchLoading = true;

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
            self.meta.total_download = res.data.meta.total_download;
            self.meta.total_view = res.data.meta.total_view;
            self.meta.percentage = res.data.meta.percentage;
          }
        })
        .catch((error) => {
          let message = "Opps! Ada kesalahan.";

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
    loadDataPercentage() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/book-rent/percentage`;
      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.meta.percentage = res.data.data.percentage;
        })
        .catch((error) => {
          let message = "Opps! Ada kesalahan.";

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
      this.meta.total_download = 0;
      this.meta.total_view = 0;
      this.meta.percentage = "";
    },
  },
  mounted() {
    this.refreshData();
    this.loadData();
    this.loadDataPercentage();
  },
  created() {},
  activated() {},
  watch: {},
};
</script>
