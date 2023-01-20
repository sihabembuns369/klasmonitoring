<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">UJIAN</h4>
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
                <div class="image-profile text-center ">
                  <img
                    class=""
                    src="../../../assets/image/icons/sejarah_icon.png"
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
                        <label for="namalengkap">Judul Ujian</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Mata Pelajaran</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Kelas</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Tanggal Upload</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Sekolah</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Pengupload</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="nisn">Waktu Ujian</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Total Peserta</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="nisn">Nilai diatas 60</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Nilai dibawah 60</label>
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
  name: "ModalDetailUjian",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
