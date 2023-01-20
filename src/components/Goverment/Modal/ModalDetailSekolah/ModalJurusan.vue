<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">JURUSAN</h4>
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
                <div class="information-data text-left">
                  <b
                    >{{ toTotalData }} dari
                    <span class="text-primary">{{ totalData }}</span> data tugas
                    ditampilkan</b
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive table-wrapper">
                  <table class="table table-hover table-information">
                    <thead class="bg-dark text-white">
                      <tr class="text-center">
                        <th>No</th>
                        <th>Jurusan</th>
                        <th>Kode Jurusan</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        class="text-center"
                        v-for="(item, index) in detailMajors[0]"
                        :key="`${index}-majors`"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.id }}</td>
                      </tr>
                    </tbody>
                  </table>
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
// import Datepicker from "vuejs-datepicker";

export default {
  name: "ModalPresentaseMapel",
  components: {
    // Datepicker,
  },
  data() {
    return {
      detailMajors: [],
      totalData: 0,
      toTotalData: 0,
      searchLoading: true,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadData() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school/${self.$route.params.id}`;

      broker.fetch.get(endPoint).then((res) => {
        self.searchLoading = false;

        self.detailMajors = [];
        self.totalData = 0;
        self.toTotalData = 0;

        self.detailMajors.push(res.data.data.school_major);
        self.toTotalData = res.data.data.school_major.length;
        self.totalData = res.data.data.school_major.length;
      });
    },
    refreshData() {
      this.detailMajors = [];
      this.totalData = 0;
      this.toTotalData = 0;
      this.searchLoading = true;
    },
  },
  activated() {},
  mounted() {
    this.loadData();
    this.refreshData();
  },
  watch: {
    searchParams() {
      this.debounceSearch();
    },
  },
};
</script>
