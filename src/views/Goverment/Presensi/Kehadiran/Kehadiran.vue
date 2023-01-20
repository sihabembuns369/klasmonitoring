<template>
  <div>
    <base-header type="gradient-success" class="container mb-4 pt-md-8">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/presensi`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Kehadiran</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />
            <!-- <select class="form-control ml-3" style="width:150px">
              <option>Semua Tingkatan</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select> -->

            <!-- <a
              type="button"
              @click="showModalPresentase = true"
              class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 ml-3"
            >
              <img src="../../../../assets/image/icons/materi.png" alt="" /> (%)
              Kehadiran Sekolah
            </a> -->
            <modal-presentase-perpustakaan
              v-if="showModalPresentase"
              class="overlay"
              @close="showModalPresentase = false"
            ></modal-presentase-perpustakaan>

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
                        Data Kehadiran</b
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
                      <option>Total buku</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option>200 - 500</option>
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
                          <th scope="col">Sekolah</th>
                          <th
                            scope="col"
                            class="text-center"
                            v-column-sortable:total_presence
                          >
                            Kehadiran
                          </th>
                          <th scope="col" v-column-sortable:student_presence>
                            Pelajar
                          </th>
                          <th scope="col" v-column-sortable:teacher_presence>
                            Guru
                          </th>
                          <th scope="col" v-column-sortable:staff_presence>
                            Staff
                          </th>
                          <th scope="col">Presentase</th>
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
                      <tbody v-if="!searchLoading && presence.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in presence"
                          :key="`${index}-presence`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.school_name }}</td>
                          <td class="text-center">{{ item.total_presence }}</td>
                          <td class="text-center">
                            {{ item.student_presence }} /
                            {{ item.student_attendance }}
                          </td>
                          <td class="text-center">
                            {{ item.teacher_presence }} /
                            {{ item.teacher_attendance }}
                          </td>
                          <td class="text-center">
                            {{ item.staff_presence }} /
                            {{ item.staff_attendance }}
                          </td>
                          <td>{{ item.percentage }}</td>

                          <td>
                            <a
                              class="action-detail"
                              type="button"
                              @click="openModal(item.school_uuid)"
                              >Detail</a
                            >
                          </td>
                          <!-- <td></td> -->
                        </tr>
                      </tbody>
                      <modal-detail-kehadiran
                        v-if="modalVisible"
                        @close="modalVisible = false"
                        :dataId="modalData"
                        class="overlay"
                      ></modal-detail-kehadiran>
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
import ModalDetailKehadiran from "../../../../components/Goverment/Modal/ModalPresensi/ModalDetailKehadiran";
import ModalPresentasePerpustakaan from "../../../../components/Goverment/Modal/ModalPresentasePerpustakaan";
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  name: "Perpustakaan",
  components: {
    "modal-detail-kehadiran": ModalDetailKehadiran,
    "modal-presentase-perpustakaan": ModalPresentasePerpustakaan,
    Loading: () => import("../../../../components/Goverment/Loading"),
  },
  data() {
    return {
      showModel: false,
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      presence: [],
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
      this.presence.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/detail/presence?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }
      endPoint += `&sort_field=update_at`;
      endPoint += `&sort_dir=desc`;
      self.presence = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.presence = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.presence.push(item);
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
      this.presence = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/detail/presence?limit=${self.limit}`;
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
