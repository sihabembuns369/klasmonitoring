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
            <label for="sekolah" class="mt-2">Materi</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />
            <!-- <select class="form-control ml-3" style="width:150px">
              <option>Semua Grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select> -->

            <!-- <a
              type="button"
              @click="showModalPresentase = true"
              class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 ml-3"
            >
              <img src="../../../assets/image/icons/materi.png" alt="" /> (%)
              Materi
            </a> -->
            <!-- <modal-presentase-materi
              v-if="showModalPresentase"
              class="overlay"
              @close="showModalPresentase = false"
            ></modal-presentase-materi> -->

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
                        Data Materi</b
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
                      <option>Mapel</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option value="sejarah">Sejarah</option>
                      <option value="biologi">Biologi</option>
                      <option value="Agama Islam">Agama Islam</option>
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
                  <div class=" table-wrapper table-responsive">
                    <table class="table table-hover table-information">
                      <thead class="bg-dark text-white">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Judul Materi</th>
                          <th scope="col" v-column-sortable:grade>Grade</th>
                          <th scope="col" v-column-sortable:school_subject>
                            Mapel
                          </th>
                          <th scope="col" v-column-sortable:major_name>
                            Jurusan
                          </th>
                          <th scope="col">Diupload</th>
                          <!-- <th scope="col">Diunduh</th>
                        <th scope="col">View</th> -->
                          <th scope="col">Sekolah</th>
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
                          <td valign="top" colspan="10" class="text-center">
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="!searchLoading && theory.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in theory"
                          :key="`${index}-theory`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td :title="item.theory_name">
                            {{ item.theory_name.slice(0, 30) + `...` }}
                          </td>
                          <td class="text-center">
                            {{ item.grade | romanizeNumber }}
                          </td>
                          <td>{{ item.school_subject }}</td>
                          <td v-if="item.major_name != null">
                            {{ item.major_name }}
                          </td>
                          <td v-else>-</td>
                          <td>{{ item.uploaded_at | formatDateTime }}</td>
                          <!-- <td class="text-center" v-if="item.download > 0">
                          <div class="non-active">
                            {{ item.download }}
                          </div>
                        </td>
                        <td v-else>
                          <div class="non-active text-danger text-center">
                            <i class="fas fa-exclamation-triangle"></i>
                            {{ item.download }}
                          </div>
                        </td>
                        <td class="text-center">{{ item.view }}</td> -->

                          <td>{{ item.school }}</td>
                          <td>
                            <a
                              class="action-detail"
                              type="button"
                              @click="openModal(item.id)"
                            >
                              Detail
                            </a>
                          </td>
                          <!-- <td></td> -->
                        </tr>
                      </tbody>
                      <modal-detail-materi
                        v-if="modalVisible"
                        class="overlay"
                        :dataId="modalData"
                        @close="modalVisible = false"
                      ></modal-detail-materi>
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
import ModalDetailMateri from "../../../components/Goverment/Modal/ModalDetailMateri";
// import ModalPresentaseMateri from "../../../components/Goverment/Modal/ModalPresentaseMateri";
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  name: "MonitoringTugas",
  metaInfo: {
    title: "Monitoring Materi",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-materi": ModalDetailMateri,
    Loading: () => import("../../../components/Goverment/Loading"),

    // "modal-presentase-materi": ModalPresentaseMateri,
  },
  data() {
    return {
      modalVisible: false,

      showModel: false,
      showModalPresentase: false,
      theory: [],
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
      this.theory.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/theory?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

      endPoint += `&sort_field=created_at`;
      endPoint += `&sort_dir=desc`;
      self.theory = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.theory = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.theory.push(item);
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
      this.theory = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/theory?${self.limit}`;
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
