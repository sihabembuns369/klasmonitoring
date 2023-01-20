<template>
  <div>
    <div class="box-information-onklas bg-white p-3 pb-5">
      <div class="header text-center font-weight-bold mt-2">
        <p>Hari ini</p>
        <div class="form-group">
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            @change="loadDataTotalAssignment"
          >
            <option>Pengerjaan tgs/sekolah</option>
          </select>
        </div>
      </div>
      <div class="list-data">
        <div class="row">
          <div class="col-md-12">
            <div class="school-information">
              <ul
                class="list-group list-group-unbordered"
                v-if="assignment.totalLimit.length > 0"
              >
                <li
                  class="list-group-item"
                  v-for="(item, index) in assignment.totalLimit"
                  :key="`${index}-total`"
                >
                  {{ index + 1 }}.
                  {{ item.school_name }}
                  <a class="float-right text-primary">
                    <b>({{ item.percentage_done }})</b>
                  </a>
                </li>
              </ul>
              <ul class="list-group list-group-unbordered mb-3" v-else>
                <li class="list-group-item text-center">
                  Tidak ditemukan data.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import broker from "../../../../../utils/broker";
export default {
  name: `ListTugasSekolah`,
  data() {
    return {
      assignment: {
        total: [],
        popular: [],
        percentage: [],
        totalLimit: [],
        popularLimit: [],
        percentageLimit: [],
        totalFilter: "today",
        popularFilter: "today",
        percentageFilter: "today",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async loadDataTotalAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/assignment/statistic`;
      self.assignment.total = [];
      self.assignment.totalLimit = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.assignment.total = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 10) {
                self.assignment.totalLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },
    async getData() {
      await this.loadDataTotalAssignment();
    },
  },
};
</script>
