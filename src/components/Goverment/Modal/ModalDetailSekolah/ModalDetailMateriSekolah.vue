<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">MATERI</h4>
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
          <div v-if="theoryDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-profile text-center ">
                  <img
                    class=""
                    :src="theoryDetail.school_subject.icon_image"
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
                        <label for="judulMateri">Judul Materi</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="judulMateri"
                          readonly
                          :value="theoryDetail.school_theory_name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="mataPelajaran">Mata Pelajaran</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="mataPelajaran"
                          readonly
                          :value="theoryDetail.school_subject.name"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Jurusan</label>
                        <input
                          v-if="theoryDetail.major_name != null"
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="theoryDetail.major_name"
                        />
                        <input
                          v-else
                          type="`text`"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          value="-"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="tanggalUpload">Tanggal Upload</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="tanggalUpload"
                          readonly
                          :value="theoryDetail.uploaded_at | formatDateTime"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namaSekolah">Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namaSekolah"
                          readonly
                          :value="theoryDetail.school_subject.school.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="pengupload">Pengupload</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="pengupload"
                          readonly
                          :value="theoryDetail.upload_by"
                        />
                      </div>
                    </div>
                    <!-- <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="totalUnduh">Total Unduh</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="totalUnduh"
                          readonly
                          :value="theoryDetail.download"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="jumlahView">Jumlah View</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="jumlahView"
                          :value="theoryDetail.view"
                        />
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <a
                  v-if="theoryDetail.school_theory_file.length > 0"
                  :href="theoryDetail.school_theory_file"
                  type="button"
                  target="_blank"
                  class="btn btn-primary text-white"
                >
                  Unduh Materi
                </a>
                <a
                  v-else
                  type="button"
                  disabled
                  class="btn btn-primary text-white"
                >
                  Materi Belum Tersedia
                </a>
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
import broker from "../../../../utils/broker";

export default {
  name: "ModalDetailMateri",
  props: ["dataId"],

  data() {
    return {
      theoryDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/theory/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.theoryDetail = res.data.data;
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
