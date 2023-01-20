<template>
  <div>
    <div class="box-information-onklas bg-white p-3 pb-5">
      <div class="header text-center font-weight-bold mt-2">
        <p>Jumlah Anggota</p>
        <div class="form-group">
          <select
            class="form-control"
            v-model="filterMemberStatistic"
            @change="loadDataKlasMember"
          >
            <option value="teacher">Guru Terbanyak</option>
            <option value="student">Siswa Terbanyak</option>
          </select>
        </div>
      </div>
      <div class="list-data">
        <div class="row">
          <div class="col-md-12">
            <div class="school-information">
              <ul
                class="list-group list-group-unbordered"
                v-if="member.activeUserMemberLimit.length > 0"
              >
                <li
                  class="list-group-item"
                  v-for="(item, index) in member.activeUserMemberLimit"
                  :key="`${index}-activeMember`"
                >
                  <a class="float-left text-muted" :title="item.school_name">
                    {{ index + 1 }}.
                    {{ item.school_name.slice(0, 18) + "..." }}
                  </a>

                  <a class="float-right text-primary">
                    <b>({{ item.total }})</b>
                  </a>
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
  name: "ListPelajar",
  data() {
    return {
      filterMemberStatistic: "teacher",
      member: {
        activeUserMember: [],
        activeUserMemberLimit: [],
        total: [],
        popular: [],
        percentage: [],
        totalLimit: [],
        popularLimit: [],
        percentageLimit: [],
        totalFilter: "today",
        popularFilter: "today",
        percentageFilter: "today",
        memberDataTeacherSD: [],
        memberPercentageTeacherSD: [],
        memberDataTeacherSMP: [],
        memberPercentageTeacherSMP: [],

        memberDataTeacherSMA: [],
        memberPercentageTeacherSMA: [],

        memberDataTeacherSMK: [],
        memberPercentageTeacherSMK: [],

        memberDataStudent: [],
        memberDataStaff: [],
      },
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    async loadDataKlasMember() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/member/statistic?filter=${self.filterMemberStatistic}`;
      self.member.activeUserMember = [];
      self.member.activeUserMemberLimit = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.member.activeUserMember = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 10) {
                self.member.activeUserMemberLimit.push(item);
                flag++;
              }
              self.$Progress.finish();
            });
          }
        })
        .catch(() => {});
    },
    async getData() {
      await this.loadDataKlasMember();
    },
  },
};
</script>
