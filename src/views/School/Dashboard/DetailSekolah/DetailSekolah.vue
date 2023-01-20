<template>
  <div>
    <base-header type="gradient-success" class="mb-4 pt-md-7">
      <card header-classes="bg-transparent" class="detail p-0">
        <div class="row">
          <div class="col-xl-4 col-md-4">
            <div class="information-media ">
              <img
                src="../../../../assets/image/logo/sample-logo-school.png"
                alt=""
                class="mr-2"
              />
              <span>SMA 1 NGORO MOJOKERTO</span>

              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Sosmed:
                </div>
                <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Perpustakaan:
                </div>
                <div class="verified ml-auto">
                  onklas verified
                  <img
                    src="../../../../assets/image/icons/verified.svg"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="information-sosial-media  w-100 d-flex align-items-center mt-2"
              >
                <div class="sosial-media text-muted">
                  Website::
                </div>
                <div class="verified ml-auto">
                  onklas verified
                  <img src="../../../../assets/image/icons/verified.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address">
                <tr>
                  <td class="text-muted">NSPN:</td>
                  <td class="address">69817812</td>
                </tr>
                <tr>
                  <td class="text-muted">Alamat:</td>
                  <td class="address">
                    Jalan Candi Jolotundo, Kutogirang, Ngoro, Kutogirang, Ngoro,
                    Mojokerto, Jawa Timur 61385, Indonesia
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">Telepon:</td>
                  <td class="address">(0321) 6819922</td>
                </tr>
                <tr>
                  <td class="text-muted">Email:</td>
                  <td class="address">info@admin@smangoro10</td>
                </tr>
                <tr>
                  <td class="text-muted">Url web:</td>
                  <td class="address">www.smpngoro10@onklas.co.id</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-xl-4 col-md-4">
            <div class="information-address ">
              <table class="table-address w-100">
                <tr>
                  <td class="text-muted">Jurusan:</td>
                  <td class="address">4</td>
                  <td class="address text-right"><a href="">Detail</a></td>
                </tr>
                <tr>
                  <td class="text-muted">Ekstrakulikuler:</td>
                  <td class="address">
                    7
                  </td>
                  <td class="address text-right"><a href="">Detail</a></td>
                </tr>
                <tr>
                  <td class="text-muted">Mapel:</td>
                  <td class="address">32</td>
                  <td class="address text-right"><a href="">Detail</a></td>
                </tr>
                <tr>
                  <td class="text-muted">Kelas:</td>
                  <td class="address">16</td>
                  <td class="address text-right"><a href="">Detail</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </card>
      <div class="row mt-4">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/sekolah"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../../assets/image/logo/detail-pelajar.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                1.931
              </div>
              <div class="statistic-information text-muted">
                Pelajar
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/pelajar"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-gurustaff.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                124.155
              </div>
              <div class="statistic-information text-muted">
                Guru & Staff
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/guru-staff"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../../assets/image/logo/detail-materi.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                12.901
              </div>
              <div class="statistic-information text-muted">
                Materi
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/materi"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../../assets/image/logo/detail-tugas.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                747.531
              </div>
              <div class="statistic-information text-muted">
                Tugas
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/sekolah"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../../assets/image/logo/detail-ujian.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                1.931
              </div>
              <div class="statistic-information text-muted">
                Ujian
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/pelajar"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-perpustakaan.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                124.155
              </div>
              <div class="statistic-information text-muted">
                Buku pustaka
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/guru-staff"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-presensi.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                12.901
              </div>
              <div class="statistic-information text-muted">
                List presensi
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/materi"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../../assets/image/logo/detail-kelulusan.png"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                747.531
              </div>
              <div class="statistic-information text-muted">
                Kelulusan
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </base-header>

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

<script></script>
