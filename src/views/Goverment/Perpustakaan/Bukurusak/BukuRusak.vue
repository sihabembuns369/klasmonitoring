<template>
  <div>
    <base-header type="gradient-success" class="container mb-4 pt-md-8">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/klaspustaka`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">Buku rusak</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />

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
                        Data Jumlah Buku Rusak</b
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
                      <option value="penerbit">Penerbit</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option value="buku aksara">Buku Aksara</option>
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
                          <th scope="col" v-column-sortable:book.isbn>ISBN</th>
                          <th scope="col"></th>
                          <th scope="col" v-column-sortable:book.book.title>
                            Judul Buku
                          </th>
                          <th scope="col" v-column-sortable:book.book.author>
                            Pengarang
                          </th>
                          <th scope="col" v-column-sortable:book.book.publisher>
                            Penerbit
                          </th>
                          <th scope="col">Kategori</th>
                          <th scope="col">Waktu nonaktif</th>
                          <th scope="col">Sekolah</th>
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
                      <tbody
                        v-if="!searchLoading && bookUnvailable.length == 0"
                      >
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in bookUnvailable"
                          :key="`${index}-bookUnvailable`"
                        >
                          <th scope="row">1</th>
                          <td>{{ item.book.isbn ? item.book.isbn : `-` }}</td>
                          <td v-if="item.book.cover_image_url">
                            <div class="image-book">
                              <img
                                style="width:50px; height:80px;"
                                :src="`${item.book.cover_image_url}`"
                                alt="cover"
                                lazy="loading"
                                v-once
                              />
                            </div>
                          </td>
                          <td v-else>
                            <div class="image-book">
                              <img
                                src="../../../../assets/image/book_notavailable.jpg"
                                style="width:50px; height:80px;"
                                alt="default cover"
                                lazy="loading"
                                v-once
                              />
                            </div>
                          </td>
                          <td :title="item.book.book.title">
                            {{ item.book.book.title.slice(0, 30) + "..." }}
                          </td>
                          <td :title="item.book.book.author">
                            {{ item.book.book.author.slice(0, 20) + `...` }}
                          </td>
                          <td>
                            {{
                              item.book.book
                                ? item.book.book.publisher.slice(0, 20) + `...`
                                : `-`
                            }}
                          </td>
                          <td>
                            {{
                              item.book.subject ? item.book.subject.name : `-`
                            }}
                          </td>
                          <td>
                            {{
                              item.unavailable_at
                                ? item.unavailable_at
                                : `-` | formatDateTime
                            }}
                          </td>
                          <td>
                            {{ item.book.school ? item.book.school.name : `-` }}
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
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  name: "Perpustakaan",
  metaInfo: {
    title: "Monitoring Buku Rusak",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    Loading: () => import("../../../../components/Goverment/Loading"),
  },
  data() {
    return {
      modalVisible: false,
      showModel: false,
      modalData: null,
      showModalPresentase: false,
      bookUnvailable: [],
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
      this.bookUnvailable.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/unavailable-book?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }
      endPoint += `&sort_field=upload_at`;
      endPoint += `&sort_dir=desc`;
      self.bookUnvailable = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.bookUnvailable = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.bookUnvailable.push(item);
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
      this.bookUnvailable = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/unavailable-book?limit=${self.limit}`;
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
