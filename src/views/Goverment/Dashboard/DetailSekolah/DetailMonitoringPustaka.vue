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
            <label for="sekolah" class="mt-2">PERPUSTAKAAN</label>

            <!-- <select class="form-control ml-3" style="width:150px">
              <option>Semua Grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select> -->

            <div class="next-filter ml-auto d-flex aling-items-center">
              <a
                type="button"
                class="btn-materi book-rent bg-white pt-2 pb-2 pl-3 pr-3 mr-3"
                @click="showModalPresentase = true"
              >
                <img src="../../../../assets/image/icons/materi.png" alt="" />
                (%) Peminjaman Buku
              </a>
              <modal-persentase-pustaka-detail
                v-if="showModalPresentase"
                class="overlay"
                :schoolId="schoolId"
                @close="showModalPresentase = false"
              ></modal-persentase-pustaka-detail>

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
                  buku ditampilkan</b
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
            <div class=" table-wrapper table-responsive">
              <table class="table table-hover table-information">
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col"></th>
                    <th v-column-sortable:book.title scope="col">Judul Buku</th>
                    <th v-column-sortable:book.isbn scope="col">ISBN</th>
                    <th scope="col">Pengarang</th>
                    <th v-column-sortable:book.publisher scope="col">
                      Penerbit
                    </th>
                    <th v-column-sortable:stocks[0].status scope="col">
                      Status
                    </th>
                    <th v-column-sortable:total_rent scope="col">
                      Total Dipinjam
                    </th>
                    <th scope="col">Kategori</th>
                    <th scope="col">Stok Buku</th>
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
                <tbody v-if="!searchLoading && detailBook.length == 0">
                  <tr>
                    <td valign="top" colspan="10" class="text-center">
                      Tidak ditemukan data yang sesuai.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr
                    v-for="(item, index) in detailBook"
                    :key="`${index}-detailBook`"
                  >
                    <td>{{ index + 1 }}</td>
                    <td v-if="item.book.cover_image_url">
                      <div class="image-book">
                        <img
                          style="width:50px; height:80px;"
                          :src="`${item.book.cover_image_url}`"
                          alt=""
                        />
                      </div>
                    </td>
                    <td v-else>
                      <div class="image-book">
                        <img
                          src="../../../../assets/image/book_notavailable.jpg"
                          style="width:50px; height:80px;"
                          alt=""
                        />
                      </div>
                    </td>
                    <td :title="item.book.title">
                      {{ item.book.title.slice(0, 30) + "..." }}
                    </td>
                    <td>{{ item.book.isbn }}</td>
                    <td :title="item.book.author">
                      {{ item.book.author.slice(0, 20) }}
                    </td>
                    <td>{{ item.book.publisher }}</td>
                    <td v-if="item.stocks[0] == null">-</td>
                    <td v-else>
                      <span v-if="item.stocks[0].status == 'rented'">
                        Dipinjam</span
                      >
                      <span v-else-if="item.stocks[0].status == 'available'">
                        Tersedia</span
                      >
                    </td>
                    <td class="text-center">{{ item.total_rent }} x</td>
                    <td>{{ item.category }}</td>
                    <td class="text-center">
                      {{ item.stock_available }} / {{ item.stock_total }}
                    </td>
                    <!-- <td></td> -->
                  </tr>
                  <!-- <tr>
                    <th scope="row">1</th>
                    <td>
                      <div class="image-book">
                        <img
                          style="width:50px; height:80px;"
                          src="../../../../assets/image/book_cover.png"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <div
                        class="title-book mt-1"
                        title="Smk/Mak Kl.X Kimia, Bidang Keahlian Kesehatan & Pekerjaa..."
                      >
                        Smk/Mak Kl.X Kimia, Bidang..
                      </div>
                    </td>
                    <td>Mia Marlowe</td>
                    <td>Elex Media Komputindo</td>
                    <td>Novel</td>
                    <td>9 September 2021</td>
                    <td>SMA 10 NGORO</td>
                    <td></td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
// import ModalDetailBiodataPelajar from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalDetailBiodataPelajar";
import ModalPresentaseDetailPustakaSekolah from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalPresentaseDetailPustakaSekolah";

import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";
export default {
  metaInfo: {
    title: "Detail Buku Pustaka",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-persentase-pustaka-detail": ModalPresentaseDetailPustakaSekolah,
    Loading: () => import("../../../../components/Goverment/Loading"),
  },
  data() {
    return {
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      detailBook: [],
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
      this.detailBook.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/book?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

      endPoint += `&sort_field=created_at`;
      endPoint += `&sort_dir=desc`;

      self.schoolId = self.$route.params.id;
      //
      self.detailBook = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.detailBook = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.detailBook.push(item);
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
      this.detailBook = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/book?${self.limit}`;
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
  activated() {
    this.loadData();
    this.refreshData();
  },
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
