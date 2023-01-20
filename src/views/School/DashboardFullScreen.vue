<template>
  <div>
    <div class="page_full_layer">
      <dashboard-navbar-full-screen></dashboard-navbar-full-screen>
      <div class="toogleSidebar">
        <div style="height: 88vh;padding: 0 !important;">
          <!-- Card stats -->
          <div class="row pt-2 justify-content-center">
            <div class="col-md-12 text-center">
              <h2 class="text_monitoring">Monitoring Presensi</h2>
            </div>
            <div v-b-tooltip.hover title="Presensi: Total Keseluruhan siswa yang memiliki kelas" class="col-xl-2 col-lg-2 col-md-2">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3 " style="background: #B6E2A1">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ totalSiswa }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Jumlah Siswa
                  </div>
                </div>
              </div>
            </div>
            <div v-b-tooltip.hover title="Presensi: Datang melebihi batas kehadiran sekolah" class="col-xl-2 col-lg-2 col-md-2">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3 " style="background: rgb(215 161 226)">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ terlambatSiswa }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Terlambat
                  </div>
                </div>
              </div>
            </div>
            <div v-b-tooltip.hover title="Presensi: Siswa meninggalkan sekolah tidak pada waktunya" class="col-xl-2 col-lg-2 col-md-2">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3" style="background: #FFFBC1;">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ pulangAwal }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Pulang Awal
                  </div>
                </div>
              </div>
            </div>
            <div v-b-tooltip.hover title="Presensi: Ketika siswa & guru tidak absen saat meninggalkan sekolah" class="col-xl-2 col-lg-2 col-md-2">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3 " style="background: #FEBE8C">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ tidakAbsenPulang }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Tidak Absen Pulang
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="position-relative overflow-hidden py-3">
            <div
                class="row flex-row flex-nowrap top-0"
                :class="( listLate.length > 6 ) ? 'marquee-content play_' : 'marquee-content justify-content-center' "
                ref="original">
              <CardProfileMonitoring
                  v-for="(item, index) of listLate"
                  :key="index"
                  :label-kondisi="item.name_class.name" label-status="Siswa" :jml-presensi="item.name" :label-nama="item.name" title=""/>
            </div> 
          </div>  -->

          
          <div class="position-relative overflow-hidden py-3">
            <VueSlickCarousel v-bind="settings">  
              <CardProfileMonitoring
                  v-for="(item, index) of listLate"
                  :key="index"
                  :label-kondisi="item.name_class.name" label-status="Siswa" :jml-presensi="item.name" :label-nama="item.name" title=""/>

            </VueSlickCarousel>
        </div>
          



          <!-- Card stats -->
          <div class="row justify-content-center pt-1">
            <div class="col-md-12 text-center">
              <h3 class="text_monitoring">Monitoring Kelas</h3>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3" style="background: #E8F3D6">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ classActive }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Kelas Aktif
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3" style="background: #FFDCA9">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ studentActive }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Siswa Aktif
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4">
              <div class="monitoring_ card d-flex flex-row align-items-center p-3" style="background: #FAAB78">
                <div class="statistic m-auto">
                  <div class="statistic-calculation font-weight-bold text-dark text-center black-1 fs-22-px">
                    {{ studentNotActive }}
                  </div>
                  <div class="statistic-information black-2 text-center fs-18-px">
                    Siswa Tidak Aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--card profil-->
          <!-- <div class="justify-content-center scrolling-wrapper row flex-row flex-nowrap py-3" style="overflow: scroll;">
            <CardKelasMonitoring
                v-for="(item, index) of listClass"
                :key="index"
                status="Aktif"
                :name-class="item.class_name"
                :name-major="item.school_major_name"
                :name-teacher="item.teacher_name"
                :tot-student-active="item.siswaAktif"
                :tot-student-not-active="(item.totalSiswa-item.siswaAktif)"
                title="Presensi: Datang melebihi batas kehadiran sekolah"
            />
          </div> -->
          <!---akhir-->

<VueSlickCarousel v-bind="settings">  
  <CardKelasMonitoring
                v-for="(item, index) of listClass"
                :key="index"
                status="Aktif"
                :name-class="item.class_name"
                :name-major="item.school_major_name"
                :name-teacher="item.teacher_name"
                :tot-student-active="item.siswaAktif"
                :tot-student-not-active="(item.totalSiswa-item.siswaAktif)"
                title="Presensi: Datang melebihi batas kehadiran sekolah"
            />
</VueSlickCarousel>


        </div>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
    <div class="footer_full_layer">
      <div class="text_time">{{ startTime }}</div>
      <marquee width="100%" direction="left" height="100%" class="fs-35-px">
        {{ stringBannerInfo }}
      </marquee>
    </div>
  </div>
</template>
<script>
import DashboardNavbarFullScreen from "@/layout/School/DashboardNavbarFullScreen";
import ContentFooter from "@/layout/School/ContentFooter";
import CardProfileMonitoring from "@/components/CardProfileMonitoring";
import CardKelasMonitoring from "@/components/CardKelasMonitoring";
import broker from "../../utils/broker";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  metaInfo: {
    title: "Monitoring", titleTemplate: "%s | Sekolah",
  }, name: "DashboardFullScreen", components: {
    CardKelasMonitoring, CardProfileMonitoring, DashboardNavbarFullScreen, ContentFooter, VueSlickCarousel
  }, data() {
    return {
      settings: {
                "arrows": false,
                "dots": false,
                "infinite": true,
                "slidesToShow": 3,
                "slidesToScroll": 1,
                "autoplay": true,
                "speed": 2000,
                "autoplaySpeed": 2000,
                "cssEase": "linear"
            },
      loading: false,
      timePresensi: "",
      timeClass: "",
      startTime: "00:00:00",
      totalSiswa: 0,
      jumlahSiswa: 0,
      terlambatSiswa: 0,
      pulangAwal: 0,
      tidakAbsenPulang: 0,
      tidakMasuk: 0,
      siswaMasuk: 0,
      classActive: 0,
      studentActive: 0,
      studentNotActive: 0,
      stringBannerInfo: "Informasi tentang sekolah",
      listLate: [
        {
          "id": 32834,
          "name": "Artyaningsih, S.Pd",
          "nisn": "1401207008890000",
          "nis": "1401207008890000",
          "place_of_birth": null,
          "date_of_birth": null,
          "gender": null,
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2022",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 421
          },
          "name_class": {
            "id": 75,
            "name": "10 IPA IPA AN",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 32835,
          "name": "Darwin",
          "nisn": "1401021901690000",
          "nis": "1401021901690000",
          "place_of_birth": null,
          "date_of_birth": null,
          "gender": null,
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2022",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 422
          },
          "name_class": {
            "id": 75,
            "name": "10 IPA IPA AN",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 32836,
          "name": "Dwi May Herlis",
          "nisn": "1401204205970000",
          "nis": "1401204205970000",
          "place_of_birth": null,
          "date_of_birth": null,
          "gender": null,
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2022",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 423
          },
          "name_class": {
            "id": 75,
            "name": "10 IPA IPA AN",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 32837,
          "name": "Endon Dwi Astuti",
          "nisn": "1401204311930000",
          "nis": "1401204311930000",
          "place_of_birth": null,
          "date_of_birth": null,
          "gender": null,
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2022",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 424
          },
          "name_class": {
            "id": 75,
            "name": "10 IPA IPA AN",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 2844,
          "name": "oki",
          "nisn": "111115",
          "nis": "1235",
          "place_of_birth": "Malang",
          "date_of_birth": "2020-09-10",
          "gender": "Perempuan",
          "religion": null,
          "blood_type": "A",
          "height": 180,
          "weight": 80,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 217,
            "name": "JUR BAHASA"
          },
          "current_class": {
            "id": 90
          },
          "name_class": {
            "id": 43,
            "name": "XI BAHASA",
            "grade": 11
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 2845,
          "name": "oka",
          "nisn": "111116",
          "nis": "1236",
          "place_of_birth": "Malang",
          "date_of_birth": "2020-09-11",
          "gender": "Perempuan",
          "religion": null,
          "blood_type": "A",
          "height": 180,
          "weight": 80,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 217,
            "name": "JUR BAHASA"
          },
          "current_class": {
            "id": 91
          },
          "name_class": {
            "id": 43,
            "name": "XI BAHASA",
            "grade": 11
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 112,
          "name": "Agus",
          "nisn": "100100102",
          "nis": null,
          "place_of_birth": null,
          "date_of_birth": "1997-05-31",
          "gender": "PEREMPUAN",
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 95
          },
          "name_class": {
            "id": 13,
            "name": "X-1",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": "2021-01-30T17:00:00.000000Z"
        },
        {
          "id": 114,
          "name": "hasan",
          "nisn": "100100104",
          "nis": null,
          "place_of_birth": null,
          "date_of_birth": null,
          "gender": null,
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 299
          },
          "name_class": {
            "id": 13,
            "name": "X-1",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 116,
          "name": "akuikialienkok",
          "nisn": "100100106",
          "nis": "10111992",
          "place_of_birth": "Surabaya",
          "date_of_birth": "1992-10-10",
          "gender": "Laki-laki",
          "religion": "Protestan",
          "blood_type": "O",
          "height": 165,
          "weight": 70,
          "uniform_size": "L",
          "sport_shirt_size": "L",
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 205,
            "name": "JUR IPA"
          },
          "current_class": {
            "id": 403
          },
          "name_class": {
            "id": 71,
            "name": "X-5",
            "grade": 10
          },
          "school_fee": null,
          "school_fee_mitigation": null
        },
        {
          "id": 121,
          "name": "Ryan",
          "nisn": "100100111",
          "nis": null,
          "place_of_birth": "surabaya",
          "date_of_birth": "2012-02-22",
          "gender": "laki-laki",
          "religion": null,
          "blood_type": null,
          "height": null,
          "weight": null,
          "uniform_size": null,
          "sport_shirt_size": null,
          "previous_school": null,
          "previous_class": null,
          "class": "2020",
          "grade": 10,
          "major": {
            "id": 207,
            "name": "JUR UMUM"
          },
          "current_class": {
            "id": 7
          },
          "name_class": {
            "id": 13,
            "name": "X-1",
            "grade": 10
          },
          "school_fee": 13500,
          "school_fee_mitigation": null
        }
      ],
      listClass: [
          {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "XI BAHASA",
            "school_major_name": "JUR BAHASA",
            "subject_name": "BAHASA INGGRIS 2",
            "teacher_name": "ADITYA PUTRA",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 10,
            "totalSiswa": 11
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "X-1",
            "school_major_name": "JUR IPA",
            "subject_name": "MATEMATIKA DASAR",
            "teacher_name": "AGUS BUDIAWAN",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 2,
            "totalSiswa": 15
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "XI BAHASA",
            "school_major_name": "JUR BAHASA",
            "subject_name": "MATEMATIKA DASAR",
            "teacher_name": "AGUS BUDIAWAN",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 1,
            "totalSiswa": 11
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "X-1",
            "school_major_name": "JUR IPA",
            "subject_name": "BAHASA INGGRIS 2",
            "teacher_name": "ADITYA PUTRA",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 1,
            "totalSiswa": 15
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "XI BAHASA",
            "school_major_name": "JUR BAHASA",
            "subject_name": "KOMPUTER DAN JARINGAN",
            "teacher_name": "AFIF",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 9,
            "totalSiswa": 11
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "X-1",
            "school_major_name": "JUR IPA",
            "subject_name": "AGAMA BUDHA",
            "teacher_name": "abdur rohman",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 2,
            "totalSiswa": 15
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "XI BAHASA",
            "school_major_name": "JUR BAHASA",
            "subject_name": "AGAMA BUDHA",
            "teacher_name": "abdur rohman",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 5,
            "totalSiswa": 11
          }, {
            "created_at": "2023-01-20 07:00:00",
            "class_name": "X-1",
            "school_major_name": "JUR IPA",
            "subject_name": "KOMPUTER DAN JARINGAN",
            "teacher_name": "AFIF",
            "school_name": "SMA ONKLAS PRIMA INDONESIA",
            "siswaAktif": 6,
            "totalSiswa": 15
          }
          ],
      listBanner: [
        {
          "id": 4,
          "content": "Percobaan Data",
          "created_at": "2023-01-16T03:13:05.000000Z",
          "updated_at": "2023-01-16T03:13:05.000000Z"
        },
        {
          "id": 5,
          "content": "Sudahkah Anda Sholat 5 Waktu?",
          "created_at": "2023-01-17T04:31:15.000000Z",
          "updated_at": "2023-01-17T04:31:15.000000Z"
        }
      ],
    }
  }, computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from({length: year - 2017}, (value, index) => 2018 + index);
    },
  }, methods: {
    set(e) {
      e = e < 10 ? '0' + e : e;
      return e;
    }, jam() {
      const d = new Date()
      const h = d.getHours()
      const m = this.set(d.getMinutes())
      const s = this.set(d.getSeconds())
      this.startTime = h + ':' + m + ':' + s
    }, renderMarquee() {
      const root = document.documentElement;
      const marqueeContent = document.querySelector('.marquee-content');
      setTimeout(() => {
        root.style.setProperty('--marquee-elements', marqueeContent.children.length);
        this.cloneNodeJs()
      }, 1000)
    }, async loadDataPresensiMonitoring() {
      let self = this;
      let params = ""
      if (this.timePresensi !== "") {
        params = `?time=${this.timePresensi}`
      }

      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/monitoring${params}`;

      await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              if (res.data.data.detail.length) {
                if (self.listLate.length) {
                  self.listLate.unshift(...res.data.data.detail)
                } else {
                  self.listLate = res.data.data.detail;
                }
                this.renderMarquee()
                this.timePresensi = res.data.data.time
                self.totalSiswa = res.data.data.presensi.total_student;
                self.siswaMasuk = res.data.data.presensi.present;
                self.terlambatSiswa = res.data.data.presensi.late;
                self.tidakAbsenPulang = res.data.data.presensi.present_no_absen_out;
                self.pulangAwal = res.data.data.presensi.early_out;
                self.tidakMasuk = res.data.data.presensi.alpha;
                self.listBanner = res.data.data.banner;
                this.stringBanner()
              }
            }
            // self.callFunction('monitoring')
            self.loading = false
          })
          .catch(() => {
            // self.callFunction('monitoring')
          });
    }, async callFunction(jenis) {
      if (jenis == "monitoring") {
        setTimeout(async () => {
          await this.loadDataPresensiMonitoring()
        }, 5000)
      } else {
        setTimeout(async () => {
          await this.loadDataPresensiKelas()
        }, 5000)
      }
    }, async loadDataPresensiKelas() {
      let self = this;
      let params = ""
      if (this.timeClass !== "") {
        params = `?time=${this.timeClass}`
      }
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/monitoring/active-student${params}`;

      await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              if (res.data.data.detail_classes.length) {
                self.listClass = res.data.data.detail_classes
                self.classActive = res.data.data.active_Student
                self.studentActive = res.data.data.active_class
              }
            }
            this.timeClass = res.data.time
            // self.callFunction('activeClass')
          })
          .catch(() => {
            // self.callFunction('activeClass')
          });
    }, stringBanner() {
      this.stringBannerInfo = " "
      Object.keys(this.listBanner).map((key) => {
        this.stringBannerInfo += this.listBanner[key].content + " "
      });
      console.log(this.stringBannerInfo)
    }, callInterval() {
      this.loadDataPresensiMonitoring()
      this.loadDataPresensiKelas()
      this.studentNotActive = this.siswaMasuk - this.studentActive
    }, cloneNodeJs() {
      const marqueeContent = this.$refs.original;
      for (let i = 0; i < 8; i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        // console.log(marqueeContent.children[i])
        // console.log(original)
        // const cloned = original.children[i].cloneNode(true);
      }
    },
  }, mounted() {
    setInterval(() => {
      this.jam()
    }, 1000)
    setTimeout(()=>{
      this.renderMarquee()
    },1000)
    // this.callInterval()

  }, created() {

  }, activated() {
  },
};
</script>
<style lang="scss">
.black-1 {
  color: #1f2933;
}

.black-2 {
  color: #323f4b;
}

.black-3 {
  color: #475a6b;
}

.black-4 {
  color: #7b8794;
}

.black-5 {
  color: #9aa5b1;
}

.black-6 {
  color: #cbd2d9;
}

.black-7 {
  color: #e4e7eb;
}

.black-8 {
  color: #f2f3f5;
}

.black-9 {
  color: #f8f9fa;
}

.black-10 {
  color: #ffffff;
}
</style>
<style lang="css" scoped>

</style>
<style lang="scss" scoped>
:root {
  --marquee-width: 100%;
  --marquee-height: 20vh;
  /* --marquee-elements: 12; */
  /* defined with JavaScript */
  --marquee-elements-displayed: 6;
  --marquee-element-width: calc(var(--marquee-width) / var(--marquee-elements-displayed));
  --marquee-animation-duration: calc(var(--marquee-elements) * 3s);
}

$hit-sec: 3s;

$marquee-width: 100%;
$mew: calc($marquee-width / var(--marquee-elements));
$hit: calc(var(--marquee-elements) * $hit-sec);

.marquee-content.play_ {
  animation: scrolling $hit linear infinite;
}

.marquee-content.play_:hover {
  animation-play-state: paused;
}

@keyframes scrolling {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-1 * ($mew * 8.18)));
  }
}

@keyframes Gradient {
  0% {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0 50%
  }
}

.navbar.navbar-expand-md {
  background: linear-gradient(-50deg, rgba(236, 124, 119, 0.27), rgba(243, 129, 173, 0.3), rgba(32, 170, 219, 0.34), rgba(35, 224, 179, 0.99));
  background-size: 320% 200%;
  animation: Gradient 15s ease infinite;

  span {
    color: #414141;
  }
}


.fs-18-px {
  font-size: 2.5vh;
}

.fs-22-px {
  font-size: 2.7vh;
}

.fs-35-px {
  font-size: 3.8vh;
}

.fs-30-px {
  font-size: 30px;
}

.page_full_layer {
  height: 95vh;

  nav {
    &#navbar-main {
      height: 7vh;
      margin: 0 !important;
    }
    &> div {
      margin: 0 20px 0 20px
    }

    h2 {
      font-size: 4vh;
    }
  }

  .toogleSidebar {
    min-height: 88vh;

    .monitoring_ {
      height: 100%;
    }

    .logo_ {
      .card {
        height: 25vh;
      }
    }
  }

  .text_monitoring {
    font-size: 2.5vh;
  }
}

.footer_full_layer {
  height: 5vh;
  position: relative;

  .text_time {
    position: absolute;
    left: 1vh;
    bottom: -0.5vh;
    color: white;
    font-size: 3.7vh;
    z-index: 2;
  }

  marquee {
    background: aquamarine;
    box-shadow: -1px 7px 49px -9px rgba(0, 0, 0, 0.5) inset;
    -webkit-box-shadow: -6px 5px 20px 0px rgba(0, 0, 0, 0.5) inset;
    -moz-box-shadow: -1px 7px 49px -9px rgba(0, 0, 0, 0.5) inset;

    &::before {
      content: '';
      background: indigo;
      width: 20vh;
      height: 5vh;
      position: absolute;
      left: -18px;
      z-index: 1;
      transform: skew(328deg, 0deg);
      border-radius: 7px;
    }

    &::after {
      content: 'INFORMASI';
      background: indigo;
      font-size: 2.8vh;
      color: white;
      text-align: center;
      width: 20vh;
      height: 5vh;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      border-radius: 0.8vh 0 0 0.8vh;
      padding-top: 8px;
    }
  }
}
</style>
