<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">JUMLAH BUKU</h4>
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
          <div v-if="totalBookDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-book text-center ">
                  <img
                    v-if="totalBookDetail.book.cover_image_url"
                    class=""
                    :src="`${totalBookDetail.book.cover_image_url}`"
                    alt=""
                  />
                  <img
                    v-else
                    src="../../../assets/image/book_notavailable.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md-9">
                <div class="overflow-auto ">
                  <div class="biodata">
                    <h3 class="text-primary">DETAIL</h3>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="namalengkap">Nama Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="namalengkap"
                          :value="
                            totalBookDetail.school != null
                              ? totalBookDetail.school.name
                              : '-'
                          "
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Nama Buku</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="namalengkap"
                          :value="totalBookDetail.book.title"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">ISBN</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="nisn"
                          readonly
                          :value="
                            totalBookDetail.book.isbn != ''
                              ? totalBookDetail.book.isbn
                              : `-`
                          "
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Pengarang</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="totalBookDetail.book.author"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Penerbit</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="nisn"
                          :value="totalBookDetail.book.publisher"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Kategori</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="totalBookDetail.subject.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="totalBook">Total Buku</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="totalBook"
                          readonly
                          :value="totalBookDetail.book_stock_total"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="AcceptedSchool"
                          >Buku terdaftar per/sekolah</label
                        >
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="AcceptedSchool"
                          :value="totalBookDetail.school_have_this_book_total"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Ponjaman/tahun</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="totalBookDetail.rent_total"
                        />
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
      totalBookDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/library/book/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.totalBookDetail = res.data.data;
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
