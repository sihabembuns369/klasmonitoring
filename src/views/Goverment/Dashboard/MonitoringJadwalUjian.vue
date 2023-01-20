<template>
  <div>
    <base-header class="container mb-4 pt-md-8">
      <div class="row">
        <div class="col-sm-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/monitoring/ujian`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Jadwal Ujian</label>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-12">
            <Loading v-if="searchLoading" />

            <card header-classes="bg-transparent">
              <div class="row d-flex align-items-center mb-2">
                <div class="col-3">
                  <div class="header-table d-flex align-items-center">
                    <select
                      class="form-control"
                      v-model="filterDate"
                      @change="loadData"
                    >
                      <option value="today">Hari ini</option>
                      <option value="this_week">1 Minggu terakhir</option>
                      <option value="this_month">1 Bulan terakhir</option>
                    </select>
                  </div>
                </div>
                <div class="col-9">
                  <div class="header-filter-table d-flex align-items-center ">
                    <div class="total-data ml-3 mr-2 ml-auto">
                      <b
                        ><span class="text-primary-blue">{{
                          currentPage
                        }}</span>
                        / {{ lastPage }}</b
                      >
                    </div>
                    <ul class="pagination justify-content-end mt-3">
                      <li class="page-item">
                        <button
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          :disabled="currentPage <= 1"
                          @click="() => currentPage--"
                        >
                          <i class="fas fa-angle-left"></i>
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          class="page-link pl-3 pr-3"
                          href="javascript:;"
                          :disabled="currentPage >= lastPage"
                          @click="() => currentPage++"
                        >
                          <i class="fas fa-angle-right"></i>
                        </button>
                      </li>
                    </ul>
                    <!-- <div class="pagination">
                      <button
                        class="page-link pagination   pr-3"
                        :disabled="currentPage <= 1"
                        @click="() => currentPage--"
                      >
                        <span class="ml-1"
                          ><i class="fas fa-angle-left"></i
                        ></span>
                      </button>
                      <button
                        class="page-link pagination ml-2 pl-3"
                        :disabled="currentPage >= lastPage"
                        @click="() => currentPage++"
                      >
                        <span class="mr-1"
                          ><i class="fas fa-angle-right"></i
                        ></span>
                      </button>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class=" table-wrapper table-responsive">
                    <table class="table table-hover table-information">
                      <thead class="bg-dark text-white">
                        <tr>
                          <th scope="col" v-column-sortable:schedule_date>
                            Waktu ujian
                          </th>
                          <th scope="col">
                            Sekolah
                          </th>
                          <th scope="col">
                            Mapel
                          </th>
                          <th scope="col">
                            Kelas
                          </th>
                          <th scope="col">Grade</th>

                          <th scope="col">
                            Jam Ujian
                          </th>
                          <!-- <th scope="col">Status</th> -->
                          <th scope="col">Nilai rata-rata</th>
                        </tr>
                      </thead>
                      <tbody v-if="searchLoading">
                        <tr>
                          <td
                            valign="top"
                            colspan="10"
                            class="text-center"
                          ></td>
                        </tr>
                      </tbody>
                      <tbody v-if="!searchLoading && examSchedule.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <!-- <template v-for="(schedule_exam, index) in exams">
                          <tr
                            :key="index + 1"
                            class="td_sekolah"
                            @click="hideShow(schedule_exam.id)"
                          >
                            <td>{{ schedule_exam.date }}</td>
                            <td>{{ schedule_exam.sekolah }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <a
                                href="javascript: void(0);"
                                @click="hideShow(schedule_exam.id)"
                                class="text-white text"
                              >
                                <i
                                  :class="
                                    schedule_exam.show === true
                                      ? 'fas fa-sort-up'
                                      : 'fas fa-sort-down'
                                  "
                                ></i>
                              </a>
                            </td>
                          </tr>
                          <template
                            v-if="
                              schedule_exam.schedule_exams.length > 0 &&
                                schedule_exam.show === true
                            "
                          >
                            <template
                              v-for="(sub_schedule_exams,
                              no_sub_exam) in schedule_exam.schedule_exams"
                            >
                              <tr :key="index + 1 + `.` + no_sub_exam + 1">
                                <td></td>
                                <td>{{ sub_schedule_exams.assignment }}</td>
                                <td>{{ sub_schedule_exams.class }}</td>
                                <td class="text-center">
                                  {{ sub_schedule_exams.grade }}
                                </td>
                                <td>{{ sub_schedule_exams.time_exams }}</td>
                                <td class="text-center">
                                  {{ sub_schedule_exams.score }}
                                </td>
                                <td></td>
                              </tr>
                            </template>
                          </template>
                        </template> -->
                        <tr
                          v-for="(schedule_exam, index) in examSchedule"
                          :key="`${index}-schedule-exam`"
                        >
                          <td>
                            {{
                              schedule_exam.schedule_date
                                | formatDateTimeNonClock
                            }}
                          </td>
                          <td>
                            {{ schedule_exam.template.subject.school.name }}
                          </td>
                          <td>{{ schedule_exam.template.subject.name }}</td>
                          <td class="text-center">
                            {{ schedule_exam.class.name }}
                          </td>
                          <td class="text-center">
                            {{ schedule_exam.class.grade | romanizeNumber }}
                          </td>
                          <td>
                            {{ schedule_exam.schedule_time_start | formatTime }}
                            - {{ schedule_exam.schedule_time_end | formatTime }}
                          </td>
                          <td class="text-center">
                            {{
                              schedule_exam.average != null
                                ? schedule_exam.average
                                : `-`
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
import { _ } from "vue-underscore";
import broker from "../../../utils/broker";

export default {
  name: "MonitoringUjian",
  metaInfo: {
    title: "Monitoring Jadwal Ujian",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    Loading: () => import("../../../components/Goverment/Loading"),
  },
  data() {
    return {
      showModel: false,
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      examSchedule: [],
      filterDate: `today`,
      sort_field: `date`,
      sort_dir: `desc`,
      searchParams: "",
      nextLink: null,
      prevLink: null,
      sequence: 0,
      searchLoading: true,
      totalData: 0,
      toTotalData: 0,
      limit: 10,
      currentPage: 1,
      lastPage: 0,
      exams: [
        {
          id: 1,
          date: `9 Maret 2021`,
          sekolah: "SMA NEGERI 2 MANADO",
          schedule_exams: [
            {
              assignment: "Sejarah",
              class: `XII IPA A`,
              grade: "XII",
              time_exams: "09.30 - 10.30",
              status: `Ujian berakhir`,
              score: 78,
            },
            {
              assignment: "Matematika",
              class: `XI IPA A`,
              grade: "XI",
              time_exams: "09.30 - 10.30",
              status: `Ujian berakhir`,
              score: 78,
            },
          ],
        },
        {
          id: 2,
          date: `9 Maret 2021`,
          sekolah: "SMA NEGERI 1 MANADO",
          schedule_exams: [
            {
              assignment: "Sejarah",
              class: `XII IPA A`,
              grade: "XII",
              time_exams: "09.30 - 10.30",
              status: `Ujian berakhir`,
              score: 78,
            },
            {
              assignment: "Matematika",
              class: `XI IPA A`,
              grade: "XI",
              time_exams: "09.30 - 10.30",
              status: `Ujian berakhir`,
              score: 78,
            },
          ],
        },
      ],
    };
  },

  methods: {
    // hideShow(kode) {
    //   let dataItems = this.exams;
    //   for (var i = 0; i < dataItems.length; i++) {
    //     if (dataItems[i].id === kode) {
    //       dataItems[i].show = !dataItems[i].show;
    //     }
    //   }
    //   this.exams = [];
    //   this.exams = dataItems;
    // },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.exam.sort(sortFn);
    },

    // getItems() {
    //   try {
    //     let self = this;
    //     self.searchLoading = true;

    //     for (let i = 0; i < self.exams.length; i++) {
    //       self.exams[i][`no`] = i + 1;
    //       self.exams[i][`show`] = true;
    //     }
    //   } catch (error) {
    //     let message = "Opps ! terdapat kesalahan.";
    //     if (error.response) {
    //       if (error.response.data.errors) {
    //         message = this.handleErrorApi(error.response.data.errors, "string");
    //       }
    //       this.$setSwal.fire("Alert", message, "warning");
    //     }
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async loadData() {
      try {
        let self = this;
        self.searchLoading = true;
        self.examSchedule = [];

        let params = {
          limit: self.limit,
          schedule_date: self.filterDate,
          sort_field: self.sort_field,
          sort_dir: self.sort_dir,
          page: self.currentPage,
        };

        let resp = await broker.fetch.get(
          `/government/dashboard/detail/exam/schedule`,
          {
            params: params,
          }
        );

        // let groupBySchool = _.groupBy(resp.data.data, function(element) {
        //   return element.template.subject.school["name"];
        // });
        // console.log(`===== self.examSchedule`, groupBySchool);

        self.examSchedule = resp.data.data;

        if (resp.data.links) {
          self.prevLink = resp.data.links.prev;
          self.nextLink = resp.data.links.next;
        }
        if (resp.data.meta) {
          self.sequence = resp.data.meta.from - 1;
          self.totalData = resp.data.meta.total;
          self.toTotalData = resp.data.meta.to;
          self.lastPage = resp.data.meta.last_page;
          //   self.currentPage = resp.data.meta.current_page;
        }
      } catch (error) {
        let message = "Opps ! terdapat kesalahan.";
        let self = this;
        if (error.response) {
          if (error.response.data.errors) {
            message = self.handleErrorApi(error.response.data.errors, "string");
          }
          self.$Swal.fire("Alert", message, "warning");
        }
      } finally {
        let self = this;
        self.searchLoading = false;
      }
      //   let self = this;
      //   let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/exam/schedule?limit=${self.limit}`;
      //   if (url) {
      //     endPoint = url;
      //   }
      //   endPoint += `&filter=${self.filterDate}`;
      //   endPoint += `&sort_field=created_at`;
      //   endPoint += `&sort_dir=desc`;

      //   console.log(`====endpoint`, endPoint);
      //   self.examSchedule = [];

      //   await broker.fetch
      //     .get(endPoint)
      //     .then((res) => {
      //       self.searchLoading = false;
      //       self.examSchedule = [];

      //       if (res.data.data) {
      //         res.data.data.forEach((item) => {
      //           self.examSchedule.push(item);
      //         });
      //       }
      //       if (res.data.links) {
      //         self.prevLink = res.data.links.prev;
      //         self.nextLink = res.data.links.next;
      //       }
      //       if (res.data.meta) {
      //         self.sequence = res.data.meta.from - 1;
      //         self.totalData = res.data.meta.total;
      //         self.toTotalData = res.data.meta.to;
      //         self.currentPage = res.data.meta.current_page;
      //         self.lastPage = res.data.meta.last_page;
      //       }
      //     })
      //     .catch(() => {});
    },

    refreshData() {
      this.showModel = false;
      this.showModalPresentase = false;
      this.exam = [];
      this.searchParams = "";
      this.nextLink = null;
      this.prevLink = null;
      this.sequence = 0;
      this.searchLoading = true;
      this.totalData = 0;
      this.toTotalData = 0;
    },
    waitSearch() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/exam?${self.limit}`;
      if (self.searchParams != null && self.searchParams != "") {
        endPoint += `&q=${self.searchParams}`;
      }
      self.searchLoading = true;
      self.loadData(endPoint);
    },
  },
  created() {
    this.debounceSearch = _.debounce(this.waitSearch, 1000);
  },
  activated() {},
  mounted() {
    this.loadData();
    this.refreshData();
  },
  watch: {
    searchParams() {
      this.debounceSearch();
    },
    currentPage: function() {
      this.loadData();
    },
  },
};
</script>
<style lang="scss">
.td_sekolah {
  background-color: #3a62ff !important;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    color: #ffffff !important;
  }
}
</style>
