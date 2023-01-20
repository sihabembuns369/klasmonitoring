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
          <div class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-book text-center ">
                  <img
                    class=""
                    src="../../../assets/image/book_cover.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md-9">
                <div class="overflow-auto ">
                  <div class="biodata">
                    <h3 class="text-primary">DETAIL</h3>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Nama Buku</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">ISBN</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Pengarang</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Penerbit</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Kategori</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Total Buku</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="nisn">Buku terdaftar per/sekolah</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Ponjaman/tahun</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
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
export default {
  name: "ModalDetailMateri",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
