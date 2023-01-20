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
            <label for="sekolah" class="mt-2">Total Data</label>
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
                      data kehadiran ditampilkan</b
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
                      ><span class="text-primary-blue">{{ toTotalData }}</span>
                      / {{ totalData }}</b
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
                <div class="table-information table-responsive table-wrapper">
                  <b-table
                    striped
                    :sticky-header="stickyHeader"
                    :no-border-collapse="noCollapse"
                    hover
                    :busy="loading"
                    responsive
                    :items="items"
                    :fields="fields"
                    class="table-total-data"
                    show-empty
                  >
                    <template #cell(aksi)="data">
                      <a
                        size="sm"
                        :href="
                          `/sosial-media/total-data/${data.item.id}/detail`
                        "
                        class="mr-1 pointer"
                      >
                        Detail
                      </a>
                    </template>
                  </b-table>
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
// import ModalDetailKehadiran from "../../../../components/Goverment/Modal/ModalPresensi/ModalDetailKehadiran";
import ModalPresentasePerpustakaan from "../../../../components/Goverment/Modal/ModalPresentasePerpustakaan";
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  name: "Perpustakaan",
  components: {
    // "modal-detail-kehadiran": ModalDetailKehadiran,
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
      sortDesc: false,
      loading: false,
      stickyHeader: true,
      noCollapse: true,
      fields: [
        { key: "no", sortable: false },
        { key: "Sekolah", sortable: false },
        { key: "Posting_pelajar", sortable: true },
        { key: "Posting_guru", sortable: true },
        { key: "Posting_ortu", sortable: true },
        { key: "Posting_staff", sortable: true },
        { key: "Jumlah_posting", sortable: true },
        { key: "Aksi", sortable: false },
      ],
      items: [
        {
          no: 1,
          Sekolah: "SMA BHY",
          Posting_pelajar: "1",
          Posting_guru: "1",
          Posting_ortu: "1",
          Posting_staff: "1",
          Jumlah_posting: "4",
        },
      ],
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
