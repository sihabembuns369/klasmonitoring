<template>
  <div>
    <div type="gradient-success" class="mb-4 pt-md-7 p-2">
      <div class="row d-xl-none d-lg-none d-md-none">
        <div class="col-12 col-md-12 mb-3">
          <router-link
            :to="`/monitoring/sekolah`"
            class="btn back-detail w-100 button-terapkan btn-outline-primary"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </router-link>
        </div>
      </div>
      <card
        v-if="schoolDetail != null"
        header-classes="bg-transparent"
        class="detail p-0"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="information-media">
              <img
                v-if="schoolDetail.image != null"
                :src="schoolDetail.image"
                alt=""
                class="mr-2"
              />
              <img
                v-else
                src="../../../../assets/image/logo/sample-logo-school.png"
                alt=""
                class="mr-2"
              />
              <span>{{ schoolDetail.name }}</span>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-media ">
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Sosmed:
                </div>
                <!-- <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div> -->
                <div class="verified ml-auto">
                  -
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Perpustakaan:
                </div>
                <!-- <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div> -->
                <div class="verified ml-auto">
                  -
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Website:
                </div>
                <div
                  class="verified ml-auto"
                  v-if="schoolDetail.website != null"
                >
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div>
                <div v-else class="verified ml-auto">
                  -
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address">
                <tr>
                  <td class="text-muted">NSPN:</td>
                  <td class="address">-</td>
                </tr>
                <tr>
                  <td class="text-muted">Alamat:</td>
                  <td class="address">
                    {{ schoolDetail.address }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">Telepon:</td>
                  <td class="address">{{ schoolDetail.phone }}</td>
                </tr>
                <tr>
                  <td class="text-muted">Email:</td>
                  <td class="address">{{ schoolDetail.email }}</td>
                </tr>
                <tr>
                  <td class="text-muted">Url web:</td>
                  <td class="address" v-if="schoolDetail.website != null">
                    {{ schoolDetail.website }}
                  </td>
                  <td class="address" v-else>
                    -
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address w-100">
                <tr v-if="schoolDetail.school_major.length > 0">
                  <td class="text-muted">Jurusan:</td>
                  <td class="address">
                    {{ schoolDetail.school_major.length }}
                  </td>
                  <td class="address text-right">
                    <a
                      @click="showModalDetailMajor = true"
                      type="button"
                      class="text-primary"
                      >Detail</a
                    >
                    <modal-detail-jurusan
                      v-if="showModalDetailMajor"
                      class="overlay"
                      @close="showModalDetailMajor = false"
                    >
                    </modal-detail-jurusan>
                  </td>
                </tr>
                <tr v-else>
                  <td class="text-muted">Jurusan:</td>
                  <td class="address">
                    -
                  </td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
                <tr>
                  <td class="text-muted">Ekstrakulikuler:</td>
                  <td class="address">
                    -
                  </td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
                <tr v-if="schoolDetail.school_subject.length > 0">
                  <td class="text-muted">Mapel:</td>
                  <td class="address">
                    {{ schoolDetail.school_subject.length }}
                  </td>
                  <td class="address text-right">
                    <a
                      @click="showModalDetailSubject = true"
                      type="button"
                      class="text-primary"
                      >Detail</a
                    >
                    <modal-detail-mapel
                      v-if="showModalDetailSubject"
                      class="overlay"
                      @close="showModalDetailSubject = false"
                    ></modal-detail-mapel>
                  </td>
                </tr>
                <tr v-else>
                  <td class="text-muted">Mapel:</td>
                  <td class="address">-</td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
                <tr v-if="schoolDetail.school_class.length > 0">
                  <td class="text-muted">Kelas:</td>
                  <td class="address">
                    {{ schoolDetail.school_class.length }}
                  </td>
                  <td class="address text-right">
                    <a
                      @click="showModalDetailClass = true"
                      type="button"
                      class="text-primary"
                      >Detail</a
                    >
                    <modal-detail-kelas
                      v-if="showModalDetailClass"
                      class="overlay"
                      @close="showModalDetailClass = false"
                    ></modal-detail-kelas>
                  </td>
                </tr>
                <tr v-else>
                  <td class="text-muted">Kelas:</td>
                  <td class="address">-</td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </card>
      <card v-else header-classes="bg-transparent" class="detail p-0">
        <div class="row">
          <div class="col-md-12">
            <div class="information-media">
              <!-- <img
                src="../../../../assets/image/logo/sample-logo-school.png"
                alt=""
                class="mr-2"
              /> -->

              <span>-</span>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-media ">
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Sosmed:
                </div>
                <!-- <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div> -->
                <div class="verified ml-auto">
                  -
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Perpustakaan:
                </div>
                <!-- <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div> -->
                <div class="verified ml-auto">
                  -
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Website:
                </div>

                <div class="verified ml-auto">
                  -
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address">
                <tr>
                  <td class="text-muted">NSPN:</td>
                  <td class="address">-</td>
                </tr>
                <tr>
                  <td class="text-muted">Alamat:</td>
                  <td class="address">
                    -
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">Telepon:</td>
                  <td class="address">-</td>
                </tr>
                <tr>
                  <td class="text-muted">Email:</td>
                  <td class="address">-</td>
                </tr>
                <tr>
                  <td class="text-muted">Url web:</td>
                  <td class="address">
                    -
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address w-100">
                <tr>
                  <td class="text-muted">Jurusan:</td>
                  <td class="address">
                    -
                  </td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
                <tr>
                  <td class="text-muted">Ekstrakulikuler:</td>
                  <td class="address">
                    -
                  </td>
                  <td class="address text-right"><a>-</a></td>
                </tr>

                <tr>
                  <td class="text-muted">Mapel:</td>
                  <td class="address">-</td>
                  <td class="address text-right"><a>-</a></td>
                </tr>

                <tr>
                  <td class="text-muted">Kelas:</td>
                  <td class="address">-</td>
                  <td class="address text-right"><a>-</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </card>

      <div class="row mt-4">
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/pelajar`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-pelajar.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.student }}
              </div>
              <div class="statistic-information text-muted">
                Pelajar
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/pelajar`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/guru`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-gurustaff.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.teacher }}
              </div>
              <div class="statistic-information text-muted">
                Guru & Staff
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/guru`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/materi`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-materi.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.theory }}
              </div>
              <div class="statistic-information text-muted">
                Materi
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/materi`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/tugas`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-tugas.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.assignment }}
              </div>
              <div class="statistic-information text-muted">
                Tugas
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/tugas`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/ujian`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-ujian.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.exam }}
              </div>
              <div class="statistic-information text-muted">
                Ujian
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/ujian`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            :to="`/detail/sekolah/${detail.schoolId}/buku-pustaka`"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-perpustakaan.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : loadDataDetailSchool.book }}
              </div>
              <div class="statistic-information text-muted">
                Pustaka
              </div>
            </div>
            <router-link
              :to="`/detail/sekolah/${detail.schoolId}/buku-pustaka`"
              class="btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </router-link>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <div
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-presensi.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                <div
                  class="statistic-calculation font-weight-bold text-white bg-red text-center rounded-pill"
                >
                  SOON
                </div>
              </div>
              <div class="statistic-information text-muted">
                List presensi
              </div>
            </div>
            <a
              class="disabled btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </a>
          </div>
        </div>
        <div class="col-xl-3 col-lg-6">
          <div
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-kelulusan.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                <div
                  class="statistic-calculation font-weight-bold text-white bg-red text-center rounded-pill"
                >
                  SOON
                </div>
              </div>
              <div class="statistic-information text-muted">
                Kelulusan
              </div>
            </div>
            <a
              class=" disabled btn button-terapkan btn-outline-primary ml-auto p-2"
              style="width:80px !important;"
            >
              Detail
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-md-3">
        <card header-classes="bg-transparent"> </card>
      </div>
      <div class="col-md-3">
        <card header-classes="bg-transparent"> </card>
      </div>
      <div class="col-md-3">
        <card header-classes="bg-transparent"> </card>
      </div>
      <div class="col-md-3">
        <card header-classes="bg-transparent"> </card>
      </div>
    </div> -->
  </div>
</template>

<script>
import ModalDetailJurusan from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalJurusan";
import ModalDetailMapel from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalMapel";
import ModalDetailKelas from "../../../../components/Goverment/Modal/ModalDetailSekolah/ModalKelas";

import broker from "../../../../utils/broker";
export default {
  name: "DetailSekolah",
  metaInfo: {
    title: "Detail Sekolah",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    "modal-detail-jurusan": ModalDetailJurusan,
    "modal-detail-mapel": ModalDetailMapel,
    "modal-detail-kelas": ModalDetailKelas,
  },
  data() {
    return {
      loading: false,
      schoolDetail: null,
      showModalDetailMajor: false,
      showModalDetailSubject: false,
      showModalDetailClass: false,
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
    };
  },
  methods: {
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
