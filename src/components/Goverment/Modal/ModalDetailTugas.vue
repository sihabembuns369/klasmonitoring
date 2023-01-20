<template>
  <transition name="fade">
    <div class="modal " id="modalFormSchedule" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">TUGAS</h4>
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
          <div v-if="assignmentDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-profile text-center ">
                  <div v-if="assignmentDetail.school_subject == null">
                    <img
                      class=""
                      src="../../../assets/image/book_notavailable.jpg"
                      alt=""
                    />
                  </div>
                  <div v-else>
                    <img
                      v-if="assignmentDetail.school_subject.icon_image == null"
                      class=""
                      src="../../../assets/image/book_notavailable.jpg"
                      alt=""
                    />
                    <img
                      v-else
                      class=""
                      :src="assignmentDetail.school_subject.icon_image"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="overflow-auto ">
                  <div class="biodata">
                    <h3 class="text-primary-blue">DETAIL</h3>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Judul Tugas</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          placeholder="Judul Tugas"
                          readonly
                          :value="assignmentDetail.title"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Mata Pelajaran</label>
                        <div v-if="assignmentDetail.school_subject == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="assignmentDetail.school_subject.name == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            value="Belum Tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            :value="assignmentDetail.school_subject.name"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Kelas</label>
                        <!-- <input
                          type="text"
                          class="form-control"
                          :value="
                            assignmentDetail.class.name +
                              ' - ' +
                              assignmentDetail.class.major
                          "
                        /> -->
                        <input
                          v-if="assignmentDetail.class.major != null"
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="
                            assignmentDetail.class.name +
                              ' - ' +
                              assignmentDetail.class.major.name
                          "
                        />

                        <input
                          v-else
                          type="text bg-white"
                          class="form-control"
                          readonly
                          :value="assignmentDetail.class.name + ' - '"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Tanggal Upload</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="assignmentDetail.uploaded_at | formatDateTime"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="assignmentDetail.school.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Pengupload</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="assignmentDetail.upload_by"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label>Dikerjakan</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="assignmentDetail.student_assignment_done"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>Belum Mengerjakan</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          readonly
                          :value="assignmentDetail.student_assignment_undone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-center">
                <!-- <a
                  :href="assignmentDetail.assignment_file"
                  type="button"
                  target="_blank"
                  class="btn bg-primary-blue text-white"
                >
                  Unduh Tugas
                </a> -->
                <a
                  v-if="assignmentDetail.assignment_file.length > 0"
                  :href="assignmentDetail.assignment_file"
                  type="button"
                  target="_blank"
                  class="btn bg-primary-blue text-white"
                >
                  Unduh Tugas
                </a>
                <a
                  v-else
                  type="button"
                  disabled
                  class="btn bg-primary-blue text-white"
                >
                  Tugas Belum Tersedia
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
import broker from "../../../utils/broker";
export default {
  name: "ModalDetailMateri",
  props: ["dataId"],
  data() {
    return {
      assignmentDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/assignment/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.assignmentDetail = res.data.data;
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
