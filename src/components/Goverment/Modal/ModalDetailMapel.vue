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

          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-wrapper table-responsive">
                  <table class="table table-hover table-information">
                    <thead class="bg-dark text-white">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Materi</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Pengupload</th>
                        <!-- <th scope="col">Total Download</th>
                        <th scope="col">Total View</th> -->
                        <th scope="col">Sekolah</th>
                        <th scope="col">File Materi</th>
                      </tr>
                    </thead>
                    <tbody v-if="searchLoading">
                      <tr>
                        <td valign="top" colspan="10" class="text-center">
                          Mengambil data . . .
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-if="!searchLoading && subjectDetail.length == 0">
                      <tr>
                        <td valign="top" colspan="10" class="text-center">
                          Tidak ditemukan data yang sesuai.
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr
                        v-for="(item, index) in subjectDetail"
                        :key="`${index}-subjectDetailTheory`"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.theory_name }}</td>
                        <td>{{ item.major_name }}</td>
                        <td>{{ item.upload_by }}</td>
                        <!-- <td>{{ item.download }}</td>
                        <td>{{ item.view }}</td> -->
                        <td>{{ item.school }}</td>
                        <td>
                          <a
                            v-if="item.file"
                            :href="item.file"
                            type="button"
                            target="_blank"
                            class="btn bg-primary-blue text-white"
                          >
                            Unduh Materi
                          </a>
                          <a
                            v-else
                            type="button"
                            disabled
                            class="text-danger disabled"
                          >
                            Materi Belum Tersedia
                          </a>
                        </td>
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
import broker from "../../../utils/broker";

export default {
  name: "ModalDetailMateri",
  props: ["dataId"],

  data() {
    return {
      subjectDetail: [],
      id: this.dataId,
      searchLoading: true,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/subject/${self.id}`;

      self.subjectDetail = [];
      (self.searchLoading = true),
        broker.fetch
          .get(endPoint)
          .then((res) => {
            (self.searchLoading = false), (self.subjectDetail = []);

            self.subjectDetail = res.data.data.school_theories;
          })
          .catch(() => {});
    },
    refreshData() {
      this.searchLoading = true;
    },
  },
  activated() {},
  mounted() {
    this.loadDataDetail();
    this.refreshData();
  },
};
</script>
