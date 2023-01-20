<template>
  <div>
    <div type="gradient-success" class="container mb-4 pt-md-7">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/sosial-media`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Postingan</label>
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
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <card header-classes="bg-transparent">
            <div class="row d-flex align-items-center">
              <div class="col-3">
                <div class="header-table d-flex align-items-center">
                  <div class="information-data">
                    <b
                      >{{ toTotalData }} dari
                      <span class="text-primary-blue">{{ totalData }}</span>
                      data total postingan ditampilkan</b
                    >
                  </div>
                </div>
              </div>
              <div class="col-9">
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
                              <option value="webschool">Kabupaten</option>
                              <option value="socmed">Kota</option>
                            </select>
                          </div>
                          <div class="col-sm-3">
                            <select
                              class="form-control"
                              :disabled="!filterActive"
                              v-model="selectedFilterResponse"
                            >
                              <option value="active">Manado</option>
                              <option value="inactive">Boolang Mongondow Utara</option>
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
                        <b><span class="text-primary-blue">1 </span> / 1</b>
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
                <div class="table-information table-responsive">
                  <table class="table table-hover">
                    <thead class="bg-dark text-white">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Foto Posting</th>
                        <th scope="col">Caption</th>
                        <th scope="col">Pemosting</th>
                        <th scope="col">Waktu</th>
                        <th scope="col">Sekolah</th>
                        <th scope="col">Total Suka</th>
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
                    <!-- <tbody v-if="searchLoading">
                      <tr>
                        <td valign="top" colspan="10" class="text-center">
                          Mengambil data . . .
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
                        <td>{{ item.total_presence }}</td>
                        <td>
                          {{ item.student_presence }} /
                          {{ item.student_attendance }}
                        </td>
                        <td>
                          {{ item.teacher_presence }} /
                          {{ item.teacher_attendance }}
                        </td>
                        <td>
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
                      </tr>
                    </tbody> -->
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          <div class="image-book">
                            <img
                              src="../../../../assets/image/example_photo_posting.png"
                              style="width:135px; height:80px;"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          Syukur puji Tuhan, hari ini kami dari SMA Katolik
                          Stella Maris Surabaya berhasil menjuarai olimp...
                        </td>
                        <td>
                          Selya Indah Puspita (PELAJAR)
                        </td>
                        <td>
                          21 Des 2021,08:16:22
                        </td>
                        <td>
                          SMA NEGERI 2 MANADO
                        </td>
                        <td>
                          27
                        </td>

                        <td>
                          <a class="action-detail" type="button">Detail</a>
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
      filterActive: null,
      selectedFilterMedia: "webschool",
      selectedFilterResponse: "active",
    };
  },
  methods: {
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/detail/presence?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

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
