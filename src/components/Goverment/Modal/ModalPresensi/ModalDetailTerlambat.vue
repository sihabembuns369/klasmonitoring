<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">TERLAMBAT</h4>
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
          <div v-if="lateDetail == null" class="modal-body">
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
                        <label for="namaSekolah">Nama Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namaSekolah"
                          readonly
                          :value="lateDetail.school_name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="totalTerlambat">Total Terlambat</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="totalTerlambat"
                          readonly
                          :value="lateDetail.total_late"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="totalPelajar">Pelajar</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="totalPelajar"
                          readonly
                          :value="lateDetail.student_late"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="teacher_late">Guru</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="teacher_late"
                          readonly
                          :value="lateDetail.teacher_late"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="staff_late">Staff</label>
                        <input
                          type="text"
                          class="form-control"
                          id="staff_late"
                          :value="lateDetail.staff_late"
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
import broker from "../../../../utils/broker";
export default {
  name: "ModalDetailKehadiran",
  props: ["dataId"],

  data() {
    return {
      lateDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/detail/late/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.lateDetail = res.data.data;
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
