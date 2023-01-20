<template>
  <div>
    <base-header type="gradient-success" class="mb-4 pt-md-7">
      <div class="row">
        <div class="col-12 col-md-12 mb-3">
          <router-link
            to="/sosial-media/total-data"
            class="btn button-terapkan btn-outline-primary"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </router-link>
        </div>
      </div>

      <card header-classes="bg-transparent" class="detail p-0">
        <div class="row d-flex align-items-center">
          <div class="col-md-2">
            <div class="information-media">
              <span class="font-size-14">SMA NEGERI 2 WARU</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="information-media">
              <b-card no-body class="border-0">
                <b-tabs v-model="tabIndex" align="center" card>
                  <b-tab
                    title="POSTINGAN"
                    :title-link-class="linkClass(0)"
                    class="p-2"
                  ></b-tab>
                  <b-tab
                    :title-link-class="linkClass(1)"
                    title="POSTINGAN E-BOOK"
                    class="p-2"
                  ></b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
          <div class="col-md-2  border-right">
            <div class="information-media d-flex align-items-center">
              <span class="font-size-12 text-muted">Postingan:</span>
              <span class="font-size-14 ml-auto">12</span>
            </div>
          </div>
          <div class="col-md-2  border-right">
            <div class="information-media d-flex align-items-center">
              <span class="font-size-12 text-muted">Posting E-book:</span>
              <span class="font-size-14 ml-auto">12</span>
            </div>
          </div>
          <div class="col-md-2  border-right">
            <div class="information-media d-flex align-items-center">
              <span class="font-size-12 text-muted">Total Data:</span>
              <span class="font-size-14 ml-auto">12</span>
            </div>
          </div>
        </div>
      </card>
      <div class="information-media">
        <b-tabs v-model="tabIndex" class="tabs-ebook" align="center">
          <b-tab>
            <div class="card text-left">
              <div class="card-body">
                <form action="">
                  <div class="row">
                    <div class="col-sm-3">
                      <div
                        class="filter-sosial-media d-flex align-items-center"
                      >
                        <span class="font-size-14">Tampilkan:</span>
                        <select
                          class="form-control filter-assignment w-100 ml-1"
                          required
                        >
                          <option value="school">
                            Postingan terbanyak per/sekolah
                          </option>
                          <option value="student">
                            Postingan terbanyak per/pelajar
                          </option>
                          <option value="teacher">
                            Postingan terbanyak per/guru
                          </option>
                          <option value="hastag">
                            Postingan hastag dengan suka terbanyak
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">
                      <div class="row d-flex align-items-center">
                        <div class="col-sm-3">
                          <label class="font-size-12">
                            Mulai:
                          </label>
                        </div>
                        <div class="col-sm-9">
                          <div class="filter">
                            <datepicker
                              class="my-datepicker w-100"
                              input-class="form-control bg-white filter-datepicker_calendar"
                              placeholder="Tanggal Mulai"
                              v-model="selectedStartDatePresence"
                              :format="formatDateDefault"
                              :calendar-class="`dashboard-datepicker`"
                              :required="true"
                              :readonly="false"
                            ></datepicker>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="row d-flex align-items-center">
                        <div class="col-sm-2">
                          <label class="form-check-label font-size-12">
                            Hingga:
                          </label>
                        </div>
                        <div class="col-sm-4">
                          <div class="filter">
                            <datepicker
                              class="my-datepicker w-100"
                              input-class="form-control bg-white filter-datepicker_calendar"
                              placeholder="Tanggal Akhir"
                              v-model="selectedEndDatePresence"
                              :format="formatDateDefault"
                              :calendar-class="`dashboard-datepicker`"
                              :required="true"
                              :readonly="false"
                            ></datepicker>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <button
                            type="submit"
                            class="btn w-100 font-size-12 btn-outline-primary"
                          >
                            TETAPKAN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <div class="row">
                  <div class="col-sm-4"></div>
                  <div class="col-sm-4">
                    <div class="date-posting">
                      <div class="card p-2">
                        <span
                          class="text-center font-size-12 font-weight-bold text-dark"
                          >7 April 2021</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4"></div>
                </div>
              </div>
              <div class="col-sm-4"></div>
            </div>
            <div class="row mt-4">
              <!-- V-FOR -->
              <div class="col-sm-3">
                <div class="card-box p-3 bg-white">
                  <b-card
                    img-src="https://placekitten.com/500/350"
                    img-alt="Image"
                    img-top
                    class="card-posting"
                  >
                    <div class="d-flex align-items-center">
                      <b-avatar
                        src="https://placekitten.com/300/300"
                      ></b-avatar>
                      <div class="ml-2 title-profile">
                        <span class="font-size-14 font-weight-bold text-dark">
                          Selyaindahpuspitar
                        </span>
                        <br />
                        <span class="small text-muted">4 menit yang lalu </span>
                      </div>
                    </div>
                    <b-card-text class="mt-2 font-size-14 justify"
                      >{{ lorem.slice(0, 95) }}
                      <a href="#">Selengkapnya ...</a></b-card-text
                    >
                    <div class="d-flex align-items-center">
                      <div class="col-sm-4 p-0">
                        <b-avatar-group size="30px" class="mr-2">
                          <b-avatar
                            src="https://placekitten.com/300/300"
                            variant="info"
                          ></b-avatar>
                          <b-avatar
                            src="https://placekitten.com/320/320"
                            variant="dark"
                          ></b-avatar>
                          <b-avatar
                            src="https://placekitten.com/320/320"
                            variant="dark"
                          ></b-avatar>
                        </b-avatar-group>
                      </div>
                      <div class="col-sm-8">
                        <div class="d-flex align-items-center">
                          <a class="text-primary font-size-12">15 Suka</a>
                          <span class="text-primary ml-2 mr-2 font-size-12"
                            >-</span
                          >
                          <a class="text-primary font-size-12">15 Komentar</a>
                        </div>
                      </div>
                    </div>
                  </b-card>
                </div>
              </div>
              <!-- V-FOR -->
            </div>
          </b-tab>
          <b-tab>
            <div class="card text-left">
              <div class="card-body">
                <form action="">
                  <div class="row">
                    <div class="col-sm-3">
                      <div
                        class="filter-sosial-media d-flex align-items-center"
                      >
                        <span class="font-size-14">Tampilkan:</span>
                        <select
                          class="form-control filter-assignment w-100 ml-1"
                          required
                        >
                          <option value="school">
                            Postingan terbanyak per/sekolah
                          </option>
                          <option value="student">
                            Postingan terbanyak per/pelajar
                          </option>
                          <option value="teacher">
                            Postingan terbanyak per/guru
                          </option>
                          <option value="hastag">
                            Postingan hastag dengan suka terbanyak
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-2"></div>
                    <div class="col-sm-2">
                      <div class="row d-flex align-items-center">
                        <div class="col-sm-3">
                          <label class="font-size-12">
                            Mulai:
                          </label>
                        </div>
                        <div class="col-sm-9">
                          <div class="filter">
                            <datepicker
                              class="my-datepicker w-100"
                              input-class="form-control bg-white filter-datepicker_calendar"
                              placeholder="Tanggal Mulai"
                              v-model="selectedStartDatePresence"
                              :format="formatDateDefault"
                              :calendar-class="`dashboard-datepicker`"
                              :required="true"
                              :readonly="false"
                            ></datepicker>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="row d-flex align-items-center">
                        <div class="col-sm-2">
                          <label class="form-check-label font-size-12">
                            Hingga:
                          </label>
                        </div>
                        <div class="col-sm-4">
                          <div class="filter">
                            <datepicker
                              class="my-datepicker w-100"
                              input-class="form-control bg-white filter-datepicker_calendar"
                              placeholder="Tanggal Akhir"
                              v-model="selectedEndDatePresence"
                              :format="formatDateDefault"
                              :calendar-class="`dashboard-datepicker`"
                              :required="true"
                              :readonly="false"
                            ></datepicker>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <button
                            type="submit"
                            class="btn w-100 font-size-12 btn-outline-primary"
                          >
                            TETAPKAN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                <div class="row">
                  <div class="col-sm-4"></div>
                  <div class="col-sm-4">
                    <div class="date-posting">
                      <div class="card p-2">
                        <span
                          class="text-center font-size-12 font-weight-bold text-dark"
                          >7 April 2021</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4"></div>
                </div>
              </div>
              <div class="col-sm-4"></div>
            </div>
            <div class="row mt-4">
              <!-- V-FOR -->
              <div class="col-sm-3">
                <div class="card-box p-3 bg-white">
                  <b-card class="card-posting">
                    <div class="row pb-4">
                      <div class="col-sm-4">
                        <div class="image-ebook">
                          <img
                            src="../../../../../assets/image/book_cover_example.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="title-ebook">
                          <h4 class="text-dark">Si Biru & Si Merah</h4>
                          <span class="small text-muted">By Selya Indah Puspita ukuran 2.5 mb </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center border-top border-bottom pb-2 pt-2"
                    >
                      <b-avatar
                        src="https://placekitten.com/300/300"
                      ></b-avatar>
                      <div class="ml-2 title-profile">
                        <span class="font-size-14 font-weight-bold text-dark">
                          Selyaindahpuspitar
                        </span>
                        <br />
                        <span class="small text-muted">4 menit yang lalu </span>
                      </div>
                    </div>
                    <div
                      class="d-flex align-items-center border-top border-bottom pb-3 pt-3"
                    >
                      <div class="col-sm-4 p-0">
                        <b-avatar-group size="30px" class="mr-2">
                          <b-avatar
                            src="https://placekitten.com/300/300"
                            variant="info"
                          ></b-avatar>
                          <b-avatar
                            src="https://placekitten.com/320/320"
                            variant="dark"
                          ></b-avatar>
                          <b-avatar
                            src="https://placekitten.com/320/320"
                            variant="dark"
                          ></b-avatar>
                        </b-avatar-group>
                      </div>
                      <div class="col-sm-8">
                        <div class="d-flex align-items-center">
                          <a class="text-primary font-size-12">15 Suka</a>
                          <span class="text-primary ml-2 mr-2 font-size-12"
                            >-</span
                          >
                          <a class="text-primary font-size-12">15 Komentar</a>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-sm-12">
                        <button class="btn btn-outline-primary  p-1  w-100">
                          LIHAT E-BOOK
                        </button>
                      </div>
                    </div>
                  </b-card>
                </div>
              </div>
              <!-- V-FOR -->
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </base-header>
  </div>
</template>

<script>
// import ModalDetailJurusan from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalJurusan";
// import ModalDetailMapel from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalMapel";
// import ModalDetailKelas from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalKelas";

import broker from "../../../../../utils/broker";
import Datepicker from "vuejs-datepicker";
let date = new Date();
export default {
  name: "DetailTotalData",
  metaInfo: {
    title: "Detail Sekolah",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    Datepicker,
    // "modal-detail-jurusan": ModalDetailJurusan,
    // "modal-detail-mapel": ModalDetailMapel,
    // "modal-detail-kelas": ModalDetailKelas,
  },
  data() {
    return {
      loading: false,
      tabIndex: 0,
      schoolDetail: null,
      showModalDetailMajor: false,
      showModalDetailSubject: false,
      showModalDetailClass: false,
      lorem:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi tempora nam vero voluptatibus necessitatibus consectetur porro ut explicabo. Consequatur facere nisi iste nesciunt accusantium repudiandae laborum itaque non tempore",
      detail: {
        schoolId: "",
      },
      loadDataDetailSchool: {
        assignment: 0,
        book: 0,
        exam: 0,
        theory: 0,
        student: 0,
        teacher: 0,
      },
      selectedStartDatePresence: new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ),
      selectedEndDatePresence: new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ),
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return [
          "bg-success",
          "text-white",
          "font-weight-bold",
          "mr-2",
          "btn btn-outline-success",
        ];
      } else {
        return [
          "bg-white",
          "font-weight-bold",
          "text-success",
          "btn btn-outline-success",
          "border border-success",
          "mr-2",
          // "p-2",
        ];
      }
    },
    async loadDataSummary() {
      this.loading = true;

      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/school/${self.$route.params.id}/summary`;

      self.loadDataDetailSchool.assignment = 0;
      self.loadDataDetailSchool.book = 0;
      self.loadDataDetailSchool.exam = 0;
      self.loadDataDetailSchool.theory = 0;
      self.loadDataDetailSchool.student = 0;
      self.loadDataDetailSchool.teacher = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.loadDataDetailSchool.assignment = res.data.data.assignment;
            self.loadDataDetailSchool.book = res.data.data.school_book;
            self.loadDataDetailSchool.exam = res.data.data.exam;
            self.loadDataDetailSchool.theory = res.data.data.theory;
            self.loadDataDetailSchool.student = res.data.data.student;
            self.loadDataDetailSchool.teacher = res.data.data.teacher_staff;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
    async loadDataDetailSekolah() {
      this.loading = true;

      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school/${self.$route.params.id}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.schoolDetail = res.data.data;
          self.detail.schoolId = res.data.data.id;
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    async getData() {
      await this.loadDataDetailSekolah();
      await this.loadDataSummary();
    },
  },

  mounted() {
    this.getData();
  },
};
</script>
