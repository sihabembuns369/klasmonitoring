<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <!-- table -->

      <div class="notification-refresh border p-2 mb-3">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../../assets/image/logo/Logo-Onklas.png" alt="" />
              POSTING TERAKTIF
            </div>
            <div class="information-notification ml-auto">
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="reloadPage()"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="header-information d-flex align-items-center mb-3">
            <router-link
              :to="`/klasmonitoring/sekolah`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label class="mr-2 mt-1 font-weight-normal">
              Tampilkan hanya:
            </label>
            <div>
              <select class="form-control" v-model="filter.limit">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div class="ml-auto">
              <div class="row">
                <div
                  class="form-check check-filter mr-3 d-flex align-items-center"
                >
                  <label class="form-check-label" for="radio1">
                    <input
                      type="radio"
                      class="form-check-input"
                      id="radio1"
                      name="optradio"
                      value="option1"
                      v-model="filter.checkedDate"
                      checked
                    />
                    Tanggal:
                  </label>
                </div>
                <div class="filter">
                  <datepicker
                    class="my-datepicker"
                    input-class="form-control bg-white filter-datepicker_calendar"
                    placeholder="Tanggal"
                    v-model="filter.start_date"
                    :format="formatDateDefault"
                    :calendar-class="`dashboard-datepicker`"
                    :required="true"
                    :readonly="false"
                  ></datepicker>
                </div>
                <div class="filter ml-2 mr-3">
                  <datepicker
                    class="my-datepicker"
                    input-class="form-control bg-white filter-datepicker_calendar"
                    placeholder="Tanggal"
                    v-model="filter.end_date"
                    :format="formatDateDefault"
                    :calendar-class="`dashboard-datepicker`"
                    :required="true"
                    :readonly="false"
                  ></datepicker>
                </div>
                <div>
                  <button
                    type="button"
                    class="btn mr-3 button-terapkan btn-outline-primary"
                    @click="loadData(null)"
                  >
                    TETAPKAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <card header-classes="bg-transparent">
            <div class="information-data d-flex align-items-center pl-3 pr-3">
              <div class="total-mapel text-bold">
                {{ meta.toTotalData }} Ditampilkan
              </div>
              <div class="ml-auto d-flex align-items-center">
                <div class="total-data">
                  <span>{{ meta.toTotalData }}</span> / {{ meta.totalData }}
                </div>
                <div class="pagination-total mt-3 ml-3">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-end">
                      <li class="page-item" v-if="meta.prevLink">
                        <a
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          @click="loadData(meta.prevLink)"
                        >
                          <i class="fas fa-angle-left"></i>
                        </a>
                      </li>
                      <li class="page-item disabled" v-else>
                        <a
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          aria-disabled="true"
                        >
                          <i class="fas fa-angle-left"></i>
                        </a>
                      </li>
                      <li class="page-item ml-2" v-if="meta.nextLink">
                        <a
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          @click="loadData(meta.nextLink)"
                        >
                          <i class="fas fa-angle-right"></i>
                        </a>
                      </li>
                      <li class="page-item disabled ml-2" v-else>
                        <a
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          aria-disabled="true"
                        >
                          <i class="fas fa-angle-right"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover text-nowrap">
                <thead class="bg-dark text-white">
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Nama Lengkap</th>
                    <th>NISN / NIK</th>
                    <th>Kelas</th>
                    <th>Grade</th>
                    <th>Angkatan</th>
                    <th>Jurusan</th>
                    <th>Update terakhir</th>
                    <th>Total Posting</th>
                  </tr>
                </thead>
                <tbody v-if="meta.searchLoading">
                  <tr>
                    <td valign="top" colspan="10" class="text-center">
                      Mengambil data . . . . .
                    </td>
                  </tr>
                </tbody>
                <tbody v-if="!meta.searchLoading && meta.data.lenght == 0">
                  <tr>
                    <td valign="top" colspan="10" class="text-center">
                      Tidak menemukan data yang sesuai.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr
                    v-for="(item, index) in meta.data"
                    :key="`${index}-activeFeeds`"
                  >
                    <td>{{ meta.sequence + index + 1 }}</td>
                    <td>
                      <span
                        class="badge badge-primary badge-dashboard mr-2"
                        v-for="(role, indexRole) in item.role"
                        :key="`${indexRole}-${index}-role`"
                      >
                        {{ role.name }}
                      </span>
                    </td>
                    <td>{{ item.user_name }}</td>
                    <td>{{ item.nisn_nik }}</td>
                    <td>{{ item.class }}</td>
                    <td>{{ item.grade }}</td>
                    <td>{{ item.generation }}</td>
                    <td>{{ item.major }}</td>
                    <td>{{ item.latest_feed_date | formatDateTime }}</td>
                    <td>{{ item.total_feed | formatNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import broker from "../../../utils/broker";

let date = new Date();
export default {
  metaInfo: {
    title: "Detail Posting",
    titleTemplate: "%s | Sekolah",
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
        totalData: 0,
        toTotalData: 0,
        nextLink: null,
        prevLink: null,
      },
    };
  },
  components: {
    Datepicker,
  },
  computed: {},
  methods: {
    reloadPage() {
      window.location.reload();
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/feed/most-active-user/detail?limit=${self.filter.limit}`;

      if (url) {
        endPoint = url;
      } else {
        if (self.filter.checkedDate) {
          endPoint += `&start_date=${self.formatDateDefault(
            self.filter.start_date
          )}`;
          endPoint += `&end_date=${self.formatDateDefault(
            self.filter.end_date
          )}`;
        }
      }

      self.meta.data = [];
      self.meta.prevLink = null;
      self.meta.nextLink = null;
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
          if (res.data.links) {
            self.meta.prevLink = res.data.links.prev;
            self.meta.nextLink = res.data.links.next;
          }
          if (res.data.meta) {
            self.meta.sequence = res.data.meta.from - 1;
          }
          if (res.data.meta) {
            self.meta.totalData = res.data.meta.total;
            self.meta.toTotalData = res.data.meta.to;
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

    refreshData() {
      let self = this;

      self.filter.limit = 10;
      self.filter.checkedDate = false;
      self.filter.start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      self.filter.end_date = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );
      self.meta.queryParams = "";
      self.meta.sequence = 0;
      self.meta.searchLoading = true;
      self.meta.data = [];
      self.meta.total = 0;
      self.meta.nextLink = null;
      self.meta.prevLink = null;
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
