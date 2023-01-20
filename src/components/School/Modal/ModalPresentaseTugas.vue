<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">PRESENTASE TUGAS</h4>
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
              <div class="col-md-12">
                <div class="header-presentase d-flex align-itemx-center">
                  <div class="title-presentase">
                    <h4 class="text-primary">TUGAS SEKOLAH</h4>
                    <p class="text-muted">
                      Peringkat tugas sekolah
                    </p>
                  </div>
                  <div class="presentase-materi ml-auto">
                    50% <span class="font-weight-bold">Pengerjaan tugas</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="box-presentase mt-4 p-3">
                  <div class="filter-presentase  d-flex align-items-center">
                    <form action="" class="d-flex align-items-center">
                      <datepicker
                        class="my-datepicker"
                        input-class="form-control bg-white mr-2 filter-datepicker_calendar"
                        placeholder="Tanggal"
                        v-model="selectedDate"
                        :format="formatDateDefault"
                        :calendar-class="`dashboard-datepicker`"
                        :required="true"
                        :readonly="false"
                      ></datepicker>
                      <span>Hingga</span>
                      <datepicker
                        class="my-datepicker"
                        input-class="form-control bg-white ml-2 filter-datepicker_calendar"
                        placeholder="Tanggal"
                        v-model="selectedDate"
                        :format="formatDateDefault"
                        :calendar-class="`dashboard-datepicker`"
                        :required="true"
                        :readonly="false"
                      ></datepicker>
                      <button
                        type="button"
                        class="btn-sync ml-2 bg-success text-white"
                        title="Sinkrokinsasi Data"
                      >
                        <i
                          class="fas fa-sync-alt"
                          title="Sinkrokinsasi Data"
                        ></i>
                      </button>
                    </form>
                    <select class="form-control ml-2">
                      <option>Terbanyak diunduh</option>
                    </select>
                    <select class="form-control ml-2">
                      <option>Semua Grade</option>
                    </select>
                  </div>
                  <div class="table-presentase border mt-3 overflow-auto">
                    <!-- V-FOR PADA ROW -->

                    <div class="row d-flex align-items-center">
                      <div class="col-md-4 pr-0">
                        <div class="p-0" style="height:25px">
                          <div
                            class="progress-bar pl-1 pb-0 pr-0"
                            role="progressbar"
                            style="width: 100%;"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            SMA KEMALA BHAYANGKARI
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div
                          class="list-school text-left d-flex align-items-center"
                        >
                          <p class="mr-1 pl-1">1.</p>
                          <p>SMA Kemala Bhayangkari 1 Surabaya</p>
                        </div>
                      </div>
                      <div class="col-4 pl-0">
                        <div class="data-activity d-flex align-items-center">
                          <div class="activity-student mr-1">
                            <p>(jumlah tugas: 1210)</p>
                          </div>
                          <div class="activity-download">
                            <p>(dikerjakan: 51117)</p>
                          </div>
                          <div class="activity-presentase ml-auto text-primary">
                            <p>(100%)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row d-flex align-items-center">
                      <div class="col-md-4 pr-0">
                        <div class="p-0" style="height:25px">
                          <div
                            class="progress-bar pl-1 pb-0 pr-0"
                            role="progressbar"
                            style="width: 80%;"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            SMA KEMALA BHAYANGKARI
                          </div>
                        </div>
                      </div>
                      <div class="col-4 p-0">
                        <div
                          class="list-school text-left d-flex align-items-center"
                        >
                          <p class="mr-1 pl-1">2.</p>
                          <p>SMA Kemala Bhayangkari 1 Surabaya</p>
                        </div>
                      </div>
                      <div class="col-4 pl-0">
                        <div class="data-activity d-flex align-items-center">
                          <div class="activity-student mr-1">
                            <p>(jumlah tugas: 1210)</p>
                          </div>
                          <div class="activity-download">
                            <p>(dikerjakan: 51117)</p>
                          </div>
                          <div class="activity-presentase ml-auto text-primary">
                            <p>(100%)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--  -->
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
import Datepicker from "vuejs-datepicker";

export default {
  name: "ModalPresentaseMateri",
  components: {
    Datepicker,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
