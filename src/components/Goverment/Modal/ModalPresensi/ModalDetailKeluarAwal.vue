<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">KELUAR AWAL</h4>
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
          <div v-if="earlyOutDetail == null" class="modal-body">
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
                        <label for="school_name">Nama Sekolah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="school_name"
                          readonly
                          :value="earlyOutDetail.school_name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="total_early_out">Total Terlambat</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="total_early_out"
                          readonly
                          :value="earlyOutDetail.total_early_out"
                        />
                      </div>
                    </div>
                    <!-- <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Pelajar</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="earlyOutDetail.student_late"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="teacherPresence">Guru</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="teacherPresence"
                          readonly
                          :value="earlyOutDetail.teacher_late"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="staffPresence">Staff</label>
                        <input
                          type="text"
                          class="form-control"
                          id="staffPresence"
                          :value="earlyOutDetail.staff_late"
                        />
                      </div>
                    </div> -->
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
  name: "ModalDetailKeluarAwal",
  props: ["dataId"],

  data() {
    return {
      earlyOutDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/detail/early-out/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.earlyOutDetail = res.data.data;
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
