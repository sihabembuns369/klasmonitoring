<template>
  <div>
    <div type="gradient-success" class="mb-4 pt-md-7 p-4">
      <div class="row d-xl-none d-lg-none d-md-none">
        <div class="col-12 col-md-12 mb-3">
          <router-link
            :to="`/detail/sekolah/${schoolId}`"
            class="btn back-detail w-100 button-terapkan btn-outline-primary"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <label for="sekolah" class="mt-2">Guru & Staff</label>

            <!-- <select class="form-control ml-3" style="width:150px">
              <option>Semua Grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select> -->

            <div class="next-filter ml-auto d-flex aling-items-center">
              <input
                id="sekolah"
                type="text"
                name="table_search"
                class="form-control input-search mr-3"
                placeholder="Ketik pencarian..."
                v-model.trim="searchParams"
              />
              <!-- <button class="btn btn-filter-primary">Filter lanjutan</button> -->
            </div>
          </div>
        </div>
      </div>
      <Loading v-if="searchLoading" />

      <card header-classes="bg-transparent" class="detail p-0 mt-3">
        <div class="row d-flex align-items-center">
          <div class="col-3">
            <div class="header-table d-flex align-items-center">
              <div class="information-data">
                <b
                  >{{ toTotalData }} dari
                  <span class="text-primary-blue">{{ totalData }}</span> data
                  tugas ditampilkan</b
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
                  ><span class="text-primary-blue">{{ currentPage }}</span> /
                  {{ lastPage }}</b
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
            <div class="table-wrapper table-responsive">
              <table class="table table-hover table-information">
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Lengkap</th>
                    <th scope="col">Usia</th>
                    <th scope="col">NIP</th>
                    <th v-column-sortable:role scope="col">Profesi</th>
                    <th v-column-sortable:subject scope="col">Mapel</th>
                    <th v-column-sortable:classes scope="col">
                      Kelas Mengajar
                    </th>
                    <th scope="col">Status</th>
                    <th scope="col">Aksi</th>
                    <th scope="col">
                      <button
                        type="button"
                        class=" btn btn-sm bg-yellow text-white"
                        title="Cetak data"
                        @click="csvExport(csvData)"
                      >
                        <i class="fas fa-print"></i>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="searchLoading">
                  <tr>
                    <td valign="top" colspan="10" class="text-center"></td>
                  </tr>
                </tbody>
                <tbody v-if="!searchLoading && detailTeacher.length == 0">
                  <tr>
                    <td valign="top" colspan="10" class="text-center">
                      Tidak ditemukan data yang sesuai.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr
                    v-for="(item, index) in detailTeacher"
                    :key="`${index}-detailTeacher`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                      {{
                        item.date_of_birth != null
                          ? ageTeacher(item.date_of_birth) + ` Tahun`
                          : `-`
                      }}
                    </td>
                    <td>{{ item.nip }}</td>
                    <td v-if="item.role == 0">-</td>
                    <td v-else>
                      <span
                        v-for="(role, indexRole) in item.role"
                        :key="`${indexRole}-detailRole`"
                      >
                        {{ indexRole + 1 }}. {{ role.name }}
                        <br />
                      </span>
                    </td>
                    <td v-if="item.subject == 0">-</td>
                    <td v-else>
                      <span
                        v-for="(subject, indexSubject) in item.subject"
                        :key="`${indexSubject}-detailSubject`"
                      >
                        {{ indexSubject + 1 }}. {{ subject }}
                        <br />
                      </span>
                    </td>
                    <td class="text-center" v-if="item.classes == 0">-</td>
                    <td class="text-center" v-else>{{ item.classes }}</td>
                    <td v-if="item.nip == 0">
                      <div class="non-active">
                        <i
                          class="fas fa-exclamation-triangle text-danger mr-1"
                        ></i>
                        <span>Non Aktif</span>
                      </div>
                    </td>
                    <td v-else>Aktif</td>
                    <td>
                      <a
                        class="action-detail"
                        type="button"
                        @click="openModal(item.user_id)"
                      >
                        Biodata
                      </a>
                    </td>
                    <td></td>
                  </tr>
                </tbody>

                <!-- MODAL -->
                <modal-detail-biodata-guru-sekolah
                  v-if="modalVisible"
                  @close="modalVisible = false"
                  :dataId="modalData"
                  class="overlay"
                ></modal-detail-biodata-guru-sekolah>
                <!-- END MODAL -->
              </table>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import ModalDetailBiodataGuruStaff from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalDetailBiodataGuruStaff";
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  metaInfo: {
    title: "Detail Guru & Staff",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-biodata-guru-sekolah": ModalDetailBiodataGuruStaff,
    Loading: () => import("../../../../components/Goverment/Loading"),
  },
  data() {
    return {
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      detailTeacher: [],
      exportTeacher: [],
      searchParams: "",
      nextLink: null,
      prevLink: null,
      sequence: 0,
      searchLoading: true,
      totalData: 0,
      toTotalData: 0,
      limit: 10,
      schoolId: "",
      currentPage: 0,
      lastPage: 0,
    };
  },
  computed: {
    csvData() {
      return this.exportTeacher.map((item, index) => ({
        NO: index + 1,
        NAMA_LENGKAP: item.name,
        USIA:
          item.date_of_birth != null
            ? this.ageTeacher(item.date_of_birth) + ` Tahun`
            : `-`,
        NIP: item.nip,
        PROFESI: item.role[0].name,
        MAPEL: item.subject[0],
        KELAS_MENGAJAR:
          item.classes != 0 ? item.classes + ` Kelas` : `Belum Mengajar`,
        STATUS: item.nip != 0 ? `Aktif` : `Non Aktif`,
      }));
    },
  },
  methods: {
    ageTeacher(date) {
      let today = new Date();
      let birthday = new Date(date);
      let year = 0;
      if (today.getMonth() < birthday.getMonth()) {
        year = 1;
      } else if (
        today.getMonth() == birthday.getMonth() &&
        today.getDate() < birthday.getDate()
      ) {
        year = 1;
      }
      let age = today.getFullYear() - birthday.getFullYear() - year;

      if (age < 0) {
        age = 0;
      }
      return age;
    },

    csvExport(arrData) {
      let date = new Date().toISOString().substr(0, 10);
      let csvContent = "data:text/xlsx;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map((item) => Object.values(item).join(";")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", `Data_Guru` + `_` + date + `.xlsx`);
      link.click();
    },

    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.detailTeacher.sort(sortFn);
    },
    geteDataExport(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/teacher`;

      if (url) {
        endPoint = url;
      }

      self.schoolId = self.$route.params.id;
      //
      self.exportTeacher = [];
      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.exportStudent = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.exportTeacher.push(item);
            });
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
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/teacher?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

      self.schoolId = self.$route.params.id;
      //
      self.detailTeacher = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.detailTeacher = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.detailTeacher.push(item);
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
      this.detailTeacher = [];
      this.exportTeacher = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/teacher?${self.limit}`;
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
    this.geteDataExport();
  },
  watch: {
    searchParams() {
      this.debounceSearch();
    },
  },
};
</script>
