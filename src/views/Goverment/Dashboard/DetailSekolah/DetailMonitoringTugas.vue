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
            <label for="sekolah" class="mt-2">Tugas</label>
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

            <a
              type="button"
              class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 ml-3"
              @click="showModalPresentase = true"
            >
              <img src="../../../../assets/image/icons/materi.png" alt="" /> (%)
              Tugas
            </a>
            <modal-persentase-tugas-detail
              v-if="showModalPresentase"
              class="overlay"
              :schoolId="schoolId"
              @close="showModalPresentase = false"
            ></modal-persentase-tugas-detail>

            <!-- <div class="next-filter ml-auto">
              <button class="btn btn-filter-primary">Filter lanjutan</button>
            </div> -->
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
                  <span class="text-primary">{{ totalData }}</span> data tugas
                  ditampilkan</b
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
                  ><span class="text-primary">{{ currentPage }}</span> /
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
            <div class=" table-wrapper  table-responsive">
              <table class="table table-hover table-information">
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Judul Tugas</th>
                    <th v-column-sortable:school_subject.name scope="col">
                      Mapel
                    </th>
                    <th v-column-sortable:class.name scope="col">Kelas</th>
                    <th scope="col">Pengupload</th>
                    <th v-column-sortable:uploaded_at scope="col">
                      Tanggal Upload
                    </th>
                    <th scope="col">Dikerjakan</th>
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
                    <td valign="top" colspan="10" class="text-center"></td>
                  </tr>
                </tbody>
                <tbody v-if="!searchLoading && detailAssignment.length == 0">
                  <tr>
                    <td valign="top" colspan="10" class="text-center">
                      Tidak ditemukan data yang sesuai.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr
                    v-for="(item, index) in detailAssignment"
                    :key="`${index}-detailAssignment`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.school_subject.name }}</td>
                    <td class="text-center">{{ item.class.name }}</td>
                    <td>{{ item.upload_by }}</td>
                    <td>{{ item.uploaded_at | formatDateTime }}</td>
                    <td
                      v-if="
                        item.student_assignment_total ==
                          item.student_assignment_done
                      "
                    >
                      <div class="non-active text-center">
                        <i class="mr-1">{{ item.student_assignment_done }}</i>
                        <span>/ {{ item.student_assignment_total }}</span>
                      </div>
                    </td>
                    <td v-else>
                      <div class="non-active text-center">
                        <i
                          class="fas fa-exclamation-triangle text-danger mr-1"
                          >{{ item.student_assignment_done }}</i
                        >
                        <span>/ {{ item.student_assignment_total }}</span>
                      </div>
                    </td>
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

                <!-- MODAL -->
                <modal-detail-tugas-sekolah
                  v-if="modalVisible"
                  @close="modalVisible = false"
                  :dataId="modalData"
                  class="overlay"
                ></modal-detail-tugas-sekolah>
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
import ModalDetailTugasSekolah from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalDetailTugasSekolah";
import ModalPresentaseDetailTugasSekolah from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalPresentaseDetailTugasSekolah";

import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";
export default {
  metaInfo: {
    title: "Detail Tugas",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-tugas-sekolah": ModalDetailTugasSekolah,
    "modal-persentase-tugas-detail": ModalPresentaseDetailTugasSekolah,
    Loading: () => import("../../../../components/Goverment/Loading"),
  },
  data() {
    return {
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      detailAssignment: [],
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
  methods: {
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.detailAssignment.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/assignment?${self.limit}`;

      if (url) {
        endPoint = url;
      }

      endPoint += `&sort_field=upload_at`;
      endPoint += `&sort_dir=desc`;
      self.schoolId = self.$route.params.id;
      //
      self.detailAssignment = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.detailAssignment = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.detailAssignment.push(item);
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
      this.detailAssignment = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/assignment?${self.limit}`;
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
