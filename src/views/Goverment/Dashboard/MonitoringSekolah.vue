<template>
  <div>
    <base-header
      type="gradient-success"
      class="container pb-6 pb-8 pt-5 pt-md-8"
    >
      <div class="row">
        <div class="col-sm-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/klasmonitoring`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Sekolah</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />
            <!-- <select class="form-control w-25 ml-3">
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SD">SD</option>
              <option value="SMK">SMK</option>
            </select> -->

            <!-- <div class="next-filter ml-auto">
              <button class="btn btn-filter-primary">Filter lanjutan</button>
            </div> -->
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="row">
          <div class="col-md-12">
            <Loading v-if="searchLoading" />
            <card header-classes="bg-transparent">
              <div class="d-flex align-items-center">
                <div class="col-sm-3">
                  <div class="header-table d-flex align-items-center">
                    <div class="information-data">
                      <b
                        >{{ toTotalData }} dari
                        <span class="text-primary-blue">{{ totalData }}</span>
                        Data Sekolah</b
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-9">
                  <div class="header-filter-table ">
                    <div class="row d-flex align-items-center ">
                      <div class="col-sm-10">
                        <form @submit.prevent="waitSearch">
                          <div class="row d-flex align-items-center">
                            <div class="col-sm-3">
                              <label
                                class="checkbox-inline d-flex align-items-center"
                              >
                                <input
                                  type="checkbox"
                                  class="mr-2"
                                  v-model.trim="filterActive"
                                  @change="waitSearch"
                                />Tampilkan hanya:
                              </label>
                            </div>
                            <div class="col-sm-3">
                              <select
                                class="form-control"
                                :disabled="!filterActive"
                                v-model="selectedFilterMedia"
                              >
                                <option value="webschool">Website</option>
                                <option value="socmed">Sosial Media</option>
                              </select>
                            </div>
                            <div class="col-sm-3">
                              <select
                                class="form-control"
                                :disabled="!filterActive"
                                v-model="selectedFilterResponse"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                            <div class="col-sm-3">
                              <button
                                class="btn w-100 btn-outline-primary"
                                :disabled="!filterActive"
                              >
                                Tetapkan
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="col-sm-2 p-0 d-flex align-items-center">
                        <div class="total-data ml-3 mr-2 ml-auto">
                          <b
                            ><span class="text-primary-blue">{{
                              currentPage
                            }}</span>
                            / {{ lastPage }}</b
                          >
                        </div>
                        <ul class="pagination justify-content-end mt-3">
                          <li class="page-item" v-if="prevLink">
                            <a
                              class="page-link pl-3 pr-3"
                              href="javascript:;"
                              @click="loadData(prevLink)"
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

                          <li class="page-item ml-2" v-if="nextLink">
                            <a
                              class="page-link pl-3 pr-3"
                              href="javascript:;"
                              @click="loadData(nextLink)"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class=" table-responsive table-wrapper">
                    <table class="table table-hover table-information">
                      <thead class="bg-dark text-white">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Sekolah</th>
                          <!-- <th scope="col">Status</th> -->
                          <th scope="col" v-column-sortable:teacher_staff>
                            Guru & Staff
                          </th>
                          <th scope="col" v-column-sortable:student>Pelajar</th>
                          <th scope="col" v-column-sortable:socmed>
                            Sosial Media
                          </th>
                          <th scope="col" v-column-sortable:webschool>
                            Website
                          </th>
                          <th scope="col">Alamat</th>
                          <th scope="col">Aksi</th>
                          <!-- <th scope="col">
                          <button
                            type="button"
                            class=" btn btn-sm bg-yellow text-white"
                            title="Cetak data"
                          >
                            <i class="fas fa-print"></i>
                          </button>
                        </th> -->
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
                      <tbody v-else-if="!searchLoading && school.length == 0">
                        <tr>
                          <td align="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in reverse(school)"
                          :key="`${index}-school`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.name }}</td>
                          <!-- <td>Otto</td> -->
                          <td class="text-center">{{ item.teacher_staff }}</td>
                          <td class="text-center">{{ item.student }}</td>
                          <td class="text-center" v-if="item.socmed == true">
                            Aktif
                          </td>
                          <td class="text-center" v-else>-</td>
                          <td class="text-center" v-if="item.webschool == true">
                            Aktif
                          </td>
                          <td class="text-center" v-else>-</td>
                          <td>{{ item.address }}</td>
                          <td>
                            <router-link
                              class="action-detail "
                              :to="`/detail/sekolah/${item.id}`"
                              >Lihat detail</router-link
                            >
                          </td>
                          <!-- <td></td> -->
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
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";
import BaseHeader from "../../../components/BaseHeader.vue";
export default {
  components: {
    BaseHeader,
    Loading: () => import("../../../components/Goverment/Loading"),
  },
  name: "MonitoringSekolah",
  metaInfo: {
    title: "Monitoring Sekolah",
    titleTemplate: "%s | Pemerintah",
  },
  data() {
    return {
      filterActive: null,
      selectedFilterMedia: "webschool",
      selectedFilterResponse: "active",
      showModel: false,
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      school: [],
      searchParams: "",
      nextLink: null,
      prevLink: null,
      sequence: 0,
      searchLoading: true,
      totalData: 0,
      toTotalData: 0,
      limit: 10,
      currentPage: 0,
      lastPage: 0,
    };
  },
  methods: {
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.school.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

      endPoint += `&sort_field=created_at`;
      endPoint += `&sort_dir=desc`;

      self.student = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.school = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.school.push(item);
            });
          }
          if (res.data.links) {
            self.prevLink = res.data.links.prev;
            self.nextLink = res.data.links.next;
          }
          if (res.data.meta) {
            self.sequence = res.data.meta.from - 1;
            self.totalData = res.data.meta.total;
            self.toTotalData = res.data.meta.to;
            self.currentPage = res.data.meta.current_page;
            self.lastPage = res.data.meta.last_page;
          }
        })
        .catch(() => {});
    },

    refreshData() {
      this.showModel = false;
      this.showModalPresentase = false;
      this.school = [];
      this.searchParams = "";
      (this.filterActive = null),
        (this.selectedFilterMedia = "webschool"),
        (this.selectedFilterResponse = "active"),
        (this.nextLink = null);
      this.prevLink = null;
      this.sequence = 0;
      this.searchLoading = true;
      this.totalData = 0;
      this.toTotalData = 0;
    },
    waitSearch() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school?limit=${self.limit}`;
      console.log("--filter", self.filterActive);
      if (self.filterActive != false && self.filterActive != null) {
        endPoint += `&${self.selectedFilterMedia}=${self.selectedFilterResponse}`;
      } else if (self.searchParams != null && self.searchParams != "") {
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
  },
};
</script>
