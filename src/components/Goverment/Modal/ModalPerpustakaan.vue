<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">PERPUSTAKAAN</h4>
            <button
              type="button"
              class="close"
              @click="close"
              data-dismiss="modal"
            >
              [x] Tutup
            </button>
          </div>
          <!-- Modal body -->
          <div v-if="libraryDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-12" align="center">
                <div class="overflow-auto ">
                  <div class="biodata text-left">
                    <h3 class="text-primary">DETAIL</h3>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Nama Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="namalengkap"
                          :value="libraryDetail.school_name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Total Buku</label>
                        <input
                          type="text"
                          readonly
                          class="form-control bg-white"
                          id="nisn"
                          :value="libraryDetail.book_stock.total_book_stock"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Peminjaman/tahun</label>
                        <input
                          type="text"
                          readonly
                          class="form-control bg-white"
                          id="namalengkap"
                          :value="libraryDetail.book_stock.total_book_stock"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Tanggal Terdaftar</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="nisn"
                          :value="
                            libraryDetail.klaspustaka_date_registered
                              | formatDateTime
                          "
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Buku Rusak</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="namalengkap"
                          value="-"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Kategori Populer</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="nisn"
                          readonly
                          :value="
                            libraryDetail.popular_book_subject != null
                              ? libraryDetail.popular_book_subject
                              : `-`
                          "
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <router-link
                          :to="
                            `/detail/sekolah/${libraryDetail.id}/buku-pustaka`
                          "
                          type="button"
                          class="btn btn-outline-primary"
                        >
                          Lihat daftar buku
                        </router-link>
                        <!-- <button type="button" class="btn btn-primary">
                          Unduh list buku
                        </button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <!-- <div class="modal-footer">
            <button
              type="button"
              @click="$emit('close')"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import broker from "../../../utils/broker";
export default {
  name: "ModalDetailMateri",
  props: ["dataId"],

  data() {
    return {
      libraryDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/school-library/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.libraryDetail = res.data.data;
        })
        .catch(() => {});
    },
  },
  activated() {},
  mounted() {
    this.loadDataDetail();
  },
};
</script>
