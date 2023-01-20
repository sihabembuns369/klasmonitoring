<template>
  <div>
    <base-header type="gradient-success" class="container mb-4 pt-md-8">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <router-link
              :to="`/klasmonitoring`"
              class="btn button-terapkan btn-outline-primary"
            >
              <i class="fas fa-arrow-left"></i>
            </router-link>
            <label for="sekolah" class="mt-2">{{ nameProduct }}</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
              v-model.trim="searchParams"
            />
          </div>
        </div>
      </div>

      <div class="mt-4">
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
                        Data {{ nameProduct }}</b
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
                          <th scope="col" v-column-sortable:name>Sekolah</th>
                          <!-- <th scope="col">Status</th> -->
                          <th scope="col" v-column-sortable:city_name>Kota</th>
                          <th scope="col" v-column-sortable:type>Tipe</th>
                          <th scope="col">Email</th>
                          <th scope="col">Website</th>
                          <th scope="col">Alamat</th>
                          <!-- <th scope="col">Aksi</th> -->
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
                            Mengambil data . . .
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="!searchLoading && product.length == 0">
                        <tr>
                          <td valign="top" colspan="10" class="text-center">
                            Tidak ditemukan data yang sesuai.
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr
                          v-for="(item, index) in product"
                          :key="`${index}-theory`"
                        >
                          <th scope="row">{{ index + 1 }}</th>
                          <td>{{ item.name }}</td>
                          <td>{{ item.city_name }}</td>
                          <td class="text-center">{{ item.type }}</td>
                          <td class="text-left" v-if="item.email != null">
                            {{ item.email }}
                          </td>
                          <td class="text-center" v-else>-</td>
                          <td class="text-center" v-if="item.webschool == true">
                            Aktif
                          </td>
                          <td class="text-center" v-else>-</td>
                          <td>{{ item.address }}</td>
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
import ModalDetailMateri from "../../../../components/Goverment/Modal/ModalDetailMateri";
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  name: "MonitoringTugas",
  metaInfo: {
    title: "Monitoring Materi",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-materi": ModalDetailMateri,
  },
  data() {
    return {
      modalVisible: false,
      showModel: false,
      showModalPresentase: false,
      product: [],
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
      nameProduct: this.$route.params.productName,
    };
  },
  methods: {
    openModal(data) {
      this.modalData = data;
      this.modalVisible = true;
    },
    orderBy(sortFn) {
      // sort your array data like this.userArray
      this.product.sort(sortFn);
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/product-school/${self.$route.params.id}/school?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }
      endPoint += `&sort_field=created_at`;
      endPoint += `&sort_dir=desc`;
      self.product = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.product = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.product.push(item);
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
      this.product = [];
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
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/product-school/${self.$route.params.id}/school?limit=${self.limit}`;
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
