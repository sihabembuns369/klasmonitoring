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
          <div v-if="examDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-profile text-center ">
                  <img
                    class=""
                    :src="examDetail.template.subject.icon_image"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md-9">
                <div class="overflow-auto ">
                  <div class="biodata">
                    <h3 class="text-primary-blue">DETAIL</h3>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="judulUjian">Judul Ujian</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="judulUjian"
                          readonly
                          :value="examDetail.template.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="mataPelajaran">Mata Pelajaran</label>
                        <input
                          type="text"
                          readonly
                          class="form-control  bg-white"
                          id="mataPelajaran"
                          :value="examDetail.template.subject.name"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="kelas">Kelas</label>
                        <input
                          v-if="examDetail.class.major != null"
                          type="text"
                          readonly
                          class="form-control  bg-white"
                          :value="
                            examDetail.class.name +
                              ' - ' +
                              examDetail.class.major.name
                          "
                        />

                        <input
                          v-else
                          type="text"
                          readonly
                          class="form-control  bg-white"
                          :value="examDetail.class.name + ' - '"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="tanggalUpload">Tanggal Upload</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="tanggalUpload"
                          readonly
                          :value="
                            examDetail.template.upload_at | formatDateTime
                          "
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="sekolah">Sekolah</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="sekolah"
                          :value="examDetail.template.subject.school.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="uploadBy">Pengupload</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="uploadBy"
                          readonly
                          :value="examDetail.template.upload_by"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="waktuUjian">Waktu Ujian</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="waktuUjian"
                          readonly
                          :value="examDetail.schedule_date | formatDateTime"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="totalPeserta">Total Peserta</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="totalPeserta"
                          readonly
                          :value="examDetail.student_exam_total"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="nilaiDiatas">Nilai diatas 60</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="nilaiDiatas"
                          readonly
                          :value="examDetail.score_high"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nilaiDibawah">Nilai dibawah 60</label>
                        <input
                          type="text"
                          class="form-control  bg-white"
                          id="nilaiDibawah"
                          readonly
                          :value="examDetail.score_low"
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
  name: "ModalDetailUjian",
  props: ["dataId"],

  data() {
    return {
      examDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/exam/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.examDetail = res.data.data;
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
