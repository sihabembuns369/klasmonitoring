<template>
  <div>
    <div type="gradient-success" class="container mb-4 pt-md-8 p-4">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/klasmonitoring`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
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
              @click="showModalPresentase = true"
              class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 ml-3"
            >
              <img src="../../../assets/image/icons/materi.png" alt="" /> (%)
              Tugas
            </a>
            <modal-presentase-tugas
              v-if="showModalPresentase"
              class="overlay"
              @close="showModalPresentase = false"
            ></modal-presentase-tugas>

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
                        Data Tugas</b
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
                  <div class="table-wrapper table-responsive">
                    <table class="table table-hover table-information ">
                      <thead class="bg-dark text-white">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Judul Tugas</th>
                          <th scope="col" v-column-sortable:school_subject.name>
                            Mapel
                          </th>
                          <th scope="col" v-column-sortable:class.grade>
                            Grade
                          </th>
                          <th
                            scope="col"
                            v-column-sortable:class.major.name
                            class="text-center"
                          >
                            Jurusan
                          </th>
                          <th
                            scope="col"
                            v-column-sortable:uploaded_at
                            class="text-center"
                          >
                            Diupload
                          </th>
                          <th scope="col">Dikerjakan</th>
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
                      <tbody v-if="!searchLoading && assignment.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in reverse(assignment)"
                          :key="`${index}-assignment`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.title }}</td>
                          <td>{{ item.school_subject.name }}</td>
                          <td class="text-center">
                            {{ item.class.grade | romanizeNumber }}
                          </td>
                          <td
                            class="text-center"
                            v-if="item.class.major != null"
                          >
                            {{ item.class.major.name }}
                          </td>
                          <td class="text-center" v-else>
                            -
                          </td>
                          <td class="text-center">
                            {{ item.uploaded_at | formatDateTime }}
                          </td>
                          <td
                            class="text-center"
                            v-if="
                              item.student_assignment_total ==
                                item.student_assignment_done
                            "
                          >
                            <div class="non-active">
                              <i class="mr-1">{{
                                item.student_assignment_done
                              }}</i>
                              <span>/ {{ item.student_assignment_total }}</span>
                            </div>
                          </td>
                          <td v-else>
                            <div class="non-active">
                              <i
                                class="fas fa-exclamation-triangle text-danger mr-1"
                                >{{ item.student_assignment_done }}</i
                              >
                              <span>/ {{ item.student_assignment_total }}</span>
                            </div>
                          </td>
                          <td>{{ item.school.name }}</td>

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
                      <modal-detail-tugas
                        v-if="modalVisible"
                        @close="modalVisible = false"
                        :dataId="modalData"
                        class="overlay"
                      ></modal-detail-tugas>
                      <!-- END MODAL -->
                    </table>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalDetailTugas from "../../../components/Goverment/Modal/ModalDetailTugas";
import ModalPresentaseTugas from "../../../components/Goverment/Modal/ModalPresentaseTugas";
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  metaInfo: {
    title: "Monitoring Tugas",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-tugas": ModalDetailTugas,
    "modal-presentase-tugas": ModalPresentaseTugas,
    Loading: () => import("../../../components/Goverment/Loading"),
  },
  data() {
    return {
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      assignment: [],
      searchParams: "",
      nextLink: null,
      prevLink: null,
      sequence: 0,
      searchLoading: true,
      totalData: 0,
      toTotalData: 0,
      currentPage: 0,
      lastPage: 0,
      limit: 10,
    };
  },

  methods: {
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.assignment.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/assignment?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }
      endPoint += `&sort_field=upload_at`;
      endPoint += `&sort_dir=desc`;

      self.assignment = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.assignment = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.assignment.push(item);
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
      this.assignment = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/assignment?limit=10`;
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
