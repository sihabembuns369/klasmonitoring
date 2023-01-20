<template>
  <div>
    <base-header
      type="gradient-success"
      class="container pb-6 pb-8 pt-5 pt-md-8"
    >
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/klasmonitoring`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Pelajar</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />
            <!-- <select class="form-control w-25 ml-3">
              <option>Semua Grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
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
              <div class="row d-flex align-items-center">
                <div class="col-3">
                  <div class="header-table d-flex align-items-center">
                    <div class="information-data">
                      <b
                        >{{ toTotalData }} dari
                        <span class="text-primary-blue">{{ totalData }}</span>
                        Data Pelajar</b
                      >
                    </div>
                  </div>
                </div>
                <div class="col-9">
                  <div class="header-filter-table d-flex align-items-center ">
                    <!-- <form action="" class="d-flex align-items-center ml-auto">
                    <label class="checkbox-inline d-flex align-items-center">
                      <input type="checkbox" class="mr-2" value="" />Tampilkan
                      hanya:
                    </label>
                    <select class="form-control ml-2">
                      <option>Grade</option>
                      <option>Semua Grade</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                      <option value="X">X</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                      <option value="X">X</option>
                    </select>
                    <button class="btn btn-outline-primary">Tetapkan</button>
                  </form> -->
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
              <div class="row">
                <div class="col-md-12">
                  <div class=" table-responsive table-wrapper">
                    <table class="table table-hover table-information">
                      <thead class="bg-dark text-white">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama Pelajar</th>
                          <th scope="col" v-column-sortable:student.nisn>
                            NISN
                          </th>
                          <!-- <th scope="col">Tingkatan</th> -->
                          <th scope="col" v-column-sortable:student.grade>
                            Grade
                          </th>
                          <th scope="col" v-column-sortable:student.major.name>
                            Jurusan
                          </th>
                          <th scope="col" v-column-sortable:have_class>
                            Status
                          </th>
                          <th scope="col">Sekolah</th>
                          <th scope="col">Aksi</th>
                          <th scope="col">
                            <!-- <router-link
                            type="button"
                            class=" btn btn-sm bg-yellow text-white"
                            title="Cetak data"
                            to="/print/monitoring/pelajar"
                          >
                            <i class="fas fa-print"></i>
                          </router-link> -->
                            <!-- <button
                            type="button"
                            class=" btn btn-sm bg-yellow text-white"
                            title="Cetak data"
                          >
                            <i class="fas fa-print"></i>
                          </button> -->
                          </th>
                        </tr>
                      </thead>
                      <tbody v-if="searchLoading">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="!searchLoading && student.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in student"
                          :key="`${index}-student`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.student.name }}</td>
                          <td v-if="item.student.nisn == null">-</td>
                          <td v-else>{{ item.student.nisn }}</td>
                          <!-- <td class="text-center">
                          {{ item.school_name.slice(0, 3) }}
                        </td> -->
                          <td
                            v-if="item.student.grade == null"
                            class="text-center"
                          >
                            -
                          </td>
                          <td v-else class="text-center">
                            {{ item.student.grade | romanizeNumber }}
                          </td>

                          <td v-if="item.student.major == null">-</td>
                          <td v-else>{{ item.student.major.name }}</td>

                          <td v-if="item.have_class == false">
                            <div class="non-active text-danger">
                              <i class="fas fa-exclamation-triangle"></i> Non
                              active
                            </div>
                          </td>
                          <td v-else>
                            <div class="non-active">
                              active
                            </div>
                          </td>
                          <td>{{ item.school_name }}</td>
                          <td>
                            <a
                              class="action-detail text-primary-blue"
                              type="button"
                              @click="openModal(item.user_id)"
                            >
                              Biodata
                            </a>
                          </td>
                          <!-- <td></td> -->
                        </tr>
                      </tbody>
                      <modal-biodata-pelajar
                        v-if="modalVisible"
                        @close="modalVisible = false"
                        :dataId="modalData"
                        class="overlay"
                      ></modal-biodata-pelajar>
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
import ModalBiodataPelajar from "../../../components/Goverment/Modal/ModalBiodataPelajar";
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";
export default {
  name: "MonitoringPelajar",
  metaInfo: {
    title: "Monitoring Pelajar",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-biodata-pelajar": ModalBiodataPelajar,
    Loading: () => import("../../../components/Goverment/Loading"),
  },
  data() {
    return {
      showModel: false,
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      student: [],
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
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.student.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/student?limit=${self.limit}`;

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
          self.student = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.student.push(item);
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
      this.student = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/student?${self.limit}`;
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
  },
};
</script>
