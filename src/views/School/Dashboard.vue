<template>
  <div>
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <!-- <div class="col-xl-3 col-lg-6">
          <router-link
            to="/sekolah"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Sekolah.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                1.931
              </div>
              <div class="statistic-information text-muted">
                Sekolah
              </div>
            </div>
          </router-link>
        </div> -->
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/pelajar"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Pelajar.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ summary.student }}
              </div>
              <div class="statistic-information text-muted">
                Jumlah Pelajar
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/guru-staff"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/GuruStaff.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ summary.teacherStaff }}
              </div>
              <div class="statistic-information text-muted">
                Guru & Staff
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/materi"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/materi.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ summary.theory }}
              </div>
              <div class="statistic-information text-muted">
                Materi
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/mata-pelajaran"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Perpustakaan.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ summary.subject }}
              </div>
              <div class="statistic-information text-muted">
                Mapel
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </base-header>
    <!--Charts-->
    <div class="container-fluid mt--8">
      <!-- PERSENTASE -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klaspresentase.png" alt="" />
              NILAI KRITERIA KETUNTASAN MINIMAL (KKM)
            </div>
            <div class="information-notification ml-auto">
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="loadDataKKM(null)"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!--  -->
        <div class="col-xl-12">
          <card header-classes="bg-transparent">
            <div class="row">
              <div class="col-12">
                <div class="header-information d-flex align-items-center mb-3">
                  <label class="mr-2 mt-1 font-weight-normal">
                    Nilai Minimal
                  </label>
                  <div>
                    <select class="form-control" v-model="filter.min_score">
                      <option value="55">55</option>
                      <option value="60">60</option>
                      <option value="65">65</option>
                      <option value="70">70</option>
                    </select>
                  </div>

                  <div class="ml-auto">
                    <div class="row">
                      <!-- <div
                        class="form-check check-filter mr-3 d-flex align-items-center"
                      >
                        <label class="form-check-label" for="radio1">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="radio1"
                            name="optradio"
                            value="option1"
                            v-model="filter.checkedDate"
                            checked
                          />
                          Tanggal:
                        </label>
                      </div> -->
                      <div class="filter">
                        <datepicker
                          class="my-datepicker"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal"
                          v-model="filter.start_date"
                          :format="formatDateDefault"
                          :calendar-class="`dashboard-datepicker`"
                          :required="true"
                          :readonly="false"
                        ></datepicker>
                      </div>
                      <div class="filter ml-2 mr-3">
                        <datepicker
                          class="my-datepicker"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal"
                          v-model="filter.end_date"
                          :format="formatDateDefault"
                          :calendar-class="`dashboard-datepicker`"
                          :required="true"
                          :readonly="false"
                        ></datepicker>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="btn mr-3 button-terapkan btn-outline-primary"
                          @click="loadDataKKM(null)"
                        >
                          TETAPKAN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="progress-bar-active-school"
              v-for="(item, index) in metaKKM.data"
              :key="`${index}-kkmExam`"
            >
              <div class="row">
                <div class="col-md-12 d-flex item-aligns-center">
                  <p
                    class="text-dark font-weight-bold"
                    style="font-size:14px !important;"
                  >
                    {{ item.subject_name }}
                  </p>
                  <p class="ml-auto" style="font-size:14px !important;">
                    <b class="text-primary-blue font-weight-bold">
                      {{ item.total_exam_with_min_score }}</b
                    >/
                    <b class="text-muted">{{ item.total_scored_exam }}</b>
                  </p>
                </div>
              </div>
              <div class="progress mt--3 mb-1" style="height:15px !important;">
                <div
                  v-if="item.percentage > 0 + '%' && item.percentage < 50 + '%'"
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width: item.percentage,
                    background: '#ff2e00 !important',
                  }"
                >
                  {{ item.percentage }}
                </div>
                <div
                  v-else-if="
                    item.percentage > 50 + '%' && item.percentage <= 60 + '%'
                  "
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width: item.percentage,
                    background: '#FFB200 !important',
                  }"
                >
                  {{ item.percentage }}
                </div>
                <div
                  v-else-if="
                    item.percentage > 60 + '%' && item.percentage <= 80 + '%'
                  "
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width: item.percentage,
                    background: '#04a4eb !important',
                  }"
                >
                  {{ item.percentage }}
                </div>
                <div
                  v-else
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width: item.percentage,
                    background: '#32BEA6 !important',
                  }"
                >
                  {{ item.percentage }}
                </div>
              </div>
            </div>
          </card>
        </div>

        <!--  -->
      </div>

      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/Logo-Onklas.png" alt="" />
              SOSIAL MEDIA
            </div>
            <div class="information-notification ml-auto">
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="submitChartFeed()"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!--  -->
        <div class="col-xl-12">
          <card header-classes="bg-transparent">
            <form @submit.prevent="submitChartFeed">
              <div slot="header" class="header p-2">
                <div class="information-posting d-flex align-items-center">
                  <div
                    class="label font-weight-bold text-dark"
                    style="font-size:14px;"
                  >
                    Sosial Media
                  </div>
                  <div class="icon-information ml-2">
                    <img src="../../assets/image/icons/Oval.png" alt="" />
                    status
                    <img
                      src="../../assets/image/icons/Oval-blue-sea.png"
                      alt=""
                    />
                    e-book
                  </div>
                  <div class="status-information ml-auto">
                    <span class="text-muted">Total :</span>
                    <span class="ml-2 font-weight-bold text-dark"
                      >status: ({{ totalStatusChartFeed }}) · e-book: ({{
                        totalEbookChartFeed
                      }})</span
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="filter d-flex align-items-center mt-3 float-right text-muted w-100"
                    >
                      <div class="form-check mr-3">
                        <label class="form-check-label" for="radio1">
                          Filter
                        </label>
                      </div>
                      <select
                        class="form-control filter-assignment w-25 mr-auto"
                        v-model="filterFeed"
                        required
                      >
                        <option value="lastyear">Setahun terakhir</option>
                        <option value="month">Bulan</option>
                        <option value="date">Tanggal</option>
                      </select>
                      <!-- <div class="form-check mr-3">
                        <label class="form-check-label" for="radio2">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="radio2"
                            name="optradio"
                            value="lastyear"
                          />Per/Tahun
                        </label>
                      </div> -->
                      <div v-if="filterFeed == 'month'">
                        <div class="row d-flex align-items-center">
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                id="radio1"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonth"
                            style="width:115px;"
                          >
                            <option disabled value="">Bulan</option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                              >{{ monthFilter }}</option
                            >
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYear"
                            style="width:115px;"
                          >
                            <option disabled value="">Tahun</option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                              >{{ year }}</option
                            >
                          </select>
                        </div>
                      </div>
                      <div
                        v-if="filterFeed == 'date'"
                        class="d-flex align-items-center"
                      >
                        <div class="form-check mr-3">
                          <label class="form-check-label" for="radio2">
                            <input
                              type="radio"
                              class="form-check-input"
                              id="radio2"
                              name="optradio"
                              value="option2"
                            />Tanggal
                          </label>
                        </div>

                        <datepicker
                          class="my-datepicker"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal"
                          v-model="selectedDate"
                          :format="formatDateDefault"
                          :calendar-class="`dashboard-datepicker`"
                          :required="true"
                          :readonly="false"
                        ></datepicker>
                      </div>
                      <button
                        type="submit"
                        class="btn ml-1 button-terapkan btn-outline-primary"
                      >
                        TETAPKAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <highcharts :options="chartOptions"></highcharts>

            <!-- <div class="row">
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Jan:
                      <a class=" float-right text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Feb:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Mar:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Apr:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Jan:
                      <a class=" float-right text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Feb:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Mar:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Apr:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Jan:
                      <a class=" float-right text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Feb:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Mar:
                      <a class="float-right  text-dark">
                        <b>status: (329) · e-book: (561)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Apr:
                      <a class="float-right  text-dark">
                        <b>status: (0) · e-book: (0)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
          </card>
        </div>
      </div>
      <!--  -->
      <!-- <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/Logo-Onklas.png" alt="" />
              HASTAG & PERSENTASE POSTING
            </div>
            <div class="information-notification ml-auto">
              update terakhir: 1 jan -  31 dec 2020, 12.00
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="reloadPage()"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row mt-4">
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>POSTING TERAKTIF</b></p>
              <p class="font-child">
                Posting status oleh pelajar / guru / staff sekolah
              </p>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="feed.activeUserFilter"
                  @change="loadDataActiveFeed"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
                </select>
              </div>
            </div>
            <div class="list-data">
              <div class="row">
                <div class="col-md-12">
                  <div class="school-information">
                    <ul
                      class="list-group list-group-unbordered"
                      v-if="feed.activeUserLimit.length > 0"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, index) in feed.activeUserLimit"
                        :key="`${index}-activeUser`"
                      >
                        <a class="float-left text-primary">
                          <b>{{ item.role }}</b>
                        </a>
                        <a class="ml-2">
                          {{ item.name }}
                        </a>
                        <a class="float-right text-primary">
                          <b>({{ item.total }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>
                  </div>
                  <router-link
                    class="btn btn-outline-success btn-block mt-4"
                    :to="`/dashboard-feed-active`"
                  >
                    SELENGKAPNYA
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>HASTAG TERPOPULER</b></p>
              <p class="font-child">
                Posting status tagar terpopuler
              </p>
              <div class="form-group">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="feed.popularHastagFilter"
                  @change="loadDataPopularFeed"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
                </select>
              </div>
            </div>
            <div class="list-data">
              <div class="row">
                <div class="col-md-12">
                  <div class="school-information">
                    <ul
                      class="list-group list-group-unbordered"
                      v-if="feed.popularHastagLimit.length > 0"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, index) in feed.popularHastagLimit"
                        :key="`${index}-activeUser`"
                      >
                        <a class="float-left text-primary">
                          <b>{{ item.hashtag }}</b>
                        </a>
                        <a class="float-right text-primary">
                          <b>({{ item.total }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>
                  </div>
                  <router-link
                    class="btn btn-outline-success btn-block mt-4"
                    :to="`/dashboard-feed-hastag`"
                  >
                    SELENGKAPNYA
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>POSTING TERBANYAK</b></p>
              <p class="font-child">
                Jumlah pemosting terbanyak
              </p>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="feed.percentageFilter"
                  @change="loadDataPercentageFeed"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
                </select>
              </div>
            </div>
            <div class="list-data">
              <div class="row">
                <div class="col-md-12">
                  <div class="school-information">
                    <ul
                      class="list-group list-group-unbordered"
                      v-if="feed.percentageLimit.length > 0"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, index) in feed.percentageLimit"
                        :key="`${index}-percentage`"
                      >
                        <a class="float-left">
                          <b>{{ item.class_name }}</b>
                        </a>
                        <a class="float-right text-primary">
                          <b>({{ item.percentage }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>
                  </div>
                  <router-link
                    class="btn btn-outline-success btn-block mt-4"
                    :to="`/dashboard-feed-posting-percentage`"
                  >
                    SELENGKAPNYA
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>

      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klastugas.png" alt="" />
              TUGAS & MATERI
            </div>
            <div class="information-notification ml-auto">
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="submitChartAssignment()"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!--  -->
        <div class="col-xl-12">
          <card header-classes="bg-transparent">
            <form @submit.prevent="submitChartAssignment">
              <div slot="header" class="p-2 header">
                <div class="information-posting d-flex align-items-center">
                  <div
                    class="label font-weight-bold text-dark"
                    style="font-size:14px;"
                  >
                    Total (%) pengerjaan tugas
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="filter d-flex align-items-center mt-3 float-right text-muted w-100"
                    >
                      <div class="form-check mr-3">
                        <label class="form-check-label" for="radio1">
                          Filter
                        </label>
                      </div>
                      <select
                        class="form-control filter-assignment w-25 mr-auto"
                        v-model="filterAssignment"
                        required
                      >
                        <option value="lastyear">Setahun terakhir</option>
                        <option value="month">Bulan</option>
                        <option value="date">Tanggal</option>
                      </select>
                      <!-- <div class="form-check mr-3">
                        <label class="form-check-label" for="radio2">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="radio2"
                            name="optradio"
                            value="lastyear"
                          />Per/Tahun
                        </label>
                      </div> -->
                      <div v-if="filterAssignment == 'month'">
                        <div class="row d-flex align-items-center">
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                id="radio1"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonthAssignment"
                            style="width:115px;"
                          >
                            <option disabled value="">Bulan</option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                              >{{ monthFilter }}</option
                            >
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYearAssignment"
                            style="width:115px;"
                          >
                            <option disabled value="">Tahun</option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                              >{{ year }}</option
                            >
                          </select>
                        </div>
                      </div>
                      <div
                        v-if="filterAssignment == 'date'"
                        class="d-flex align-items-center"
                      >
                        <div class="form-check mr-3">
                          <label class="form-check-label" for="radio2">
                            <input
                              type="radio"
                              class="form-check-input"
                              id="radio2"
                              name="optradio"
                              value="option2"
                            />Tanggal
                          </label>
                        </div>

                        <datepicker
                          class="my-datepicker"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal"
                          v-model="selectedDateAssignment"
                          :format="formatDateDefault"
                          :calendar-class="`dashboard-datepicker`"
                          :required="true"
                          :readonly="false"
                        ></datepicker>
                      </div>
                      <button
                        type="submit"
                        class="btn ml-1 button-terapkan btn-outline-primary"
                      >
                        TETAPKAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <highcharts :options="chartTugas"></highcharts>
            <!--
            <div class="row">
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Peringkat jumlah tugas:
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered float-right">
                    <li class="list-group-item mb-1 text-dark">
                      <b>1.Bahasa Indonesia:(1.189)-(Grade VI)</b>
                    </li>
                    <li class="list-group-item mb-1 text-dark">
                      <b>2.Geografi: (1.174) - (Grade VI) </b>
                    </li>
                    <li class="list-group-item mb-1 text-dark">
                      <b>3.Fisika: (1.162) - (Grade VII)</b>
                    </li>
                    <li class="list-group-item mb-1 text-dark">
                      <b>4.Sejarah: (1.156) - (Grade IX)</b>
                    </li>
                    <li class="list-group-item mb-1 text-dark">
                      <b>5.Matematika terapan: (1.152) - (Grade VII)</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
          </card>
        </div>

        <!--  -->
      </div>

      <!-- <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klaspresentase.png" alt="" />
              MAPEL TERPOPULER & PERSENTASE MAPEL
            </div>
            <div class="information-notification ml-auto">
              update terakhir: 1 jan -  31 dec 2020, 12.00
              <span>Muat Ulang</span>
              <button
                type="button"
                @click="reloadPage()"
                class="btn-sync ml-1 bg-success "
                title="Sinkrokinsasi Data"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div class="row mt-4"> -->
      <!--  -->
      <!-- <div class="col-md-4">
          <div class="presentase">
            <card header-classes="bg-transparent text-center">
              <p>(%) Mata pelajaran</p>
              <radial-progress-bar
                class="rounded-circle radialbar-mapel"
                :diameter="250"
                :completed-steps="completedStepMapel"
                :total-steps="totalStepMapel"
                startColor="#FF2E00"
                stopColor="#FF2E00"
                :innerStrokeWidth="10"
                :strokeWidth="20"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ completedStepMapel }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <div class="icon-information ml-2">
                  <img src="../../assets/image/icons/red.svg" alt="" />
                  Penyerapan materi: 25%
                </div>
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size:14px;"
                >
                  <a
                    href=""
                    class="btn btn-outline-primary"
                    style="font-size:12px;"
                    >Detail</a
                  >
                </div>
              </div>
            </card>
          </div>
        </div>
        <div class="col-md-4">
          <div class="presentase">
            <card header-classes="bg-transparent">
              <p>(%) Perpustakaan</p>
              <radial-progress-bar
                class="rounded-circle radialbar-perpustakaan"
                :diameter="250"
                :completed-steps="completedStepPerpustakaan"
                :total-steps="totalStepPerpustakaan"
                startColor="#0054FE"
                stopColor="#0054FE"
                :innerStrokeWidth="10"
                :strokeWidth="20"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ completedStepPerpustakaan }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <div class="icon-information ml-2">
                  <img src="../../assets/image/icons/Color.svg" alt="" />
                  Peminjaman buku: 25%
                </div>
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size:14px;"
                >
                  <a
                    href=""
                    class="btn btn-outline-primary"
                    style="font-size:12px;"
                    >Detail</a
                  >
                </div>
              </div>
            </card>
          </div>
        </div>
        <div class="col-md-4">
          <div class="presentase">
            <card header-classes="bg-transparent">
              <p>(%) Nilai Ujian</p>
              <radial-progress-bar
                class="rounded-circle radialbar-ujian"
                :diameter="250"
                :completed-steps="completedStepUjian"
                :total-steps="totalStepUjian"
                startColor="#34B53A"
                stopColor="#34B53A"
                :innerStrokeWidth="10"
                :strokeWidth="20"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ completedStepUjian }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <div class="icon-information ml-2">
                  <img src="../../assets/image/icons/green.svg" alt="" />
                  Kelulusan : 25%
                </div>
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size:14px;"
                >
                  <a
                    href=""
                    class="btn btn-outline-primary"
                    style="font-size:12px;"
                    >Detail</a
                  >
                </div>
              </div>
            </card>
          </div>
        </div> -->

      <!--  -->
      <!-- </div> -->
      <div class="row">
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>JUMLAH TUGAS</b></p>
              <p class="font-child">Total tugas diposting</p>
              <div class="form-group">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="assignment.totalFilter"
                  @change="loadDataTotalAssignment"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
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
                        {{ index + 1 }}. {{ item.subject_name }}
                        <a class="float-right text-primary">
                          <b>({{ item.total }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered mb-3" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>

                    <router-link
                      class="btn btn-outline-success btn-block mt-4"
                      :to="`/dashboard-assignment-total`"
                    >
                      SELENGKAPNYA
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>MAPEL TERPOPULER</b></p>
              <p class="font-child">
                Jumlah materi/mapel yang banyak diunduh/view
              </p>
              <div class="form-group">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="assignment.popularFilter"
                  @change="loadDataPopularAssignment"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
                </select>
              </div>
            </div>
            <div class="list-data">
              <div class="row">
                <div class="col-md-12">
                  <div class="school-information">
                    <ul
                      class="list-group list-group-unbordered"
                      v-if="assignment.popularLimit.length > 0"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, index) in assignment.popularLimit"
                        :key="`${index}-popular`"
                      >
                        <a class="float-left text-dark">
                          <b> {{ index + 1 }} </b>
                        </a>
                        <a class="float-left text-dark ml-3">
                          <b> {{ item.subject_name }} </b>
                        </a>
                        <a class="float-right text-primary">
                          <b>({{ item.total }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>
                  </div>
                  <router-link
                    class="btn btn-outline-success btn-block mt-4"
                    :to="`/dashboard-assignment-popular`"
                  >
                    SELENGKAPNYA
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 mt-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p><b>(%) TUGAS PER/KELAS</b></p>
              <p class="font-child">
                Jumlah persentase tugas per/kelas
              </p>
              <div class="form-group">
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="assignment.percentageFilter"
                  @change="loadDataPercentageAssignment"
                >
                  <option value="today">Hari ini</option>
                  <option value="lastweek">1 Minggu terakhir</option>
                  <option value="lastmonth">1 Bulan terakhir</option>
                  <option value="lastyear">1 Tahun terakhir</option>
                </select>
              </div>
            </div>
            <div class="list-data">
              <div class="row">
                <div class="col-md-12">
                  <div class="school-information">
                    <ul
                      class="list-group list-group-unbordered"
                      v-if="assignment.percentageLimit.length > 0"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, index) in assignment.percentageLimit"
                        :key="`${index}-percentage`"
                      >
                        <a class="float-left text-dark">
                          <b>{{ index + 1 }}</b>
                        </a>
                        <a class="float-left text-dark ml-3">
                          <b>{{ item.class_name }}</b>
                        </a>
                        <a class="float-right text-primary">
                          <b>({{ item.percentage }})</b>
                        </a>
                      </li>
                    </ul>
                    <ul class="list-group list-group-unbordered" v-else>
                      <li class="list-group-item text-center">
                        Tidak ditemukan data.
                      </li>
                    </ul>
                  </div>
                  <router-link
                    class="btn btn-outline-success btn-block mt-4"
                    :to="`/dashboard-assignment-percentage`"
                  >
                    SELENGKAPNYA
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
// import LineChart from "@/components/Charts/LineChart";
import Datepicker from "vuejs-datepicker";
import { Chart } from "highcharts-vue";
// import RadialProgressBar from "vue-radial-progress";
import broker from "../../utils/broker";
// import vSelect from "vue-select";
import { _ } from "vue-underscore";
let date = new Date();

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
// import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  metaInfo: {
    title: "Dashboard Klasmonitoring",
    titleTemplate: "%s | Sekolah",
  },
  components: {
    // LineChart,

    Datepicker,
    highcharts: Chart,
    // RadialProgressBar,
    // vSelect,
    // PageVisitsTable,
    // SocialTrafficTable,
  },
  data() {
    return {
      completedStepMapel: 25,
      totalStepMapel: 100,

      completedStepPerpustakaan: 25,
      totalStepPerpustakaan: 100,

      completedStepUjian: 25,
      totalStepUjian: 100,

      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
      },

      // Posting
      filterFeed: "lastyear",
      month: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      selectedMonth: "",
      selectedYear: "",
      selectedDate: "",
      totalStatusChartFeed: 0,
      totalEbookChartFeed: 0,
      chartOptions: {
        colors: ["#4AB8FF", "#0054FE"],
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: "Status",
            data: [],
          },

          {
            name: "E-book",
            data: [],
          },
        ],
      },

      chartPie: {
        colors: ["#4AB8FF", "#0054FE", "#"],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 250,
          width: 300,
          padding: 0,
        },
        title: {
          text: "",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            colors: ["#0054FE", "#FFB200", "#FF2E00", "#4AB8FF"],
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
              distance: -50,
              filter: {
                property: "percentage",
                operator: ">",
                value: 2,
              },
            },
          },
        },
        series: [
          {
            name: "Persentase",
            data: [
              { name: "Grade SD", y: 30 },
              { name: "Grade SMA", y: 30 },
              { name: "Grade SMK", y: 30 },
              { name: "Grade SMP", y: 10 },
            ],
          },
        ],
      },

      filterAssignment: "lastyear",
      selectedMonthAssignment: "",
      selectedYearAssignment: "",
      selectedDateAssignment: "",
      classrooms: [],
      assignmentStatus: "done",
      assignmentClassroom: {
        id: 0,
        name: "Semua Kelas",
      },

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

      modalAssignment: {
        type: 0,
        label: "",
        data: [],
      },

      chartTugas: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      feed: {
        activeUser: [],
        popularHastag: [],
        percentage: [],
        activeUserLimit: [],
        popularHastagLimit: [],
        percentageLimit: [],
        activeUserFilter: "today",
        popularHastagFilter: "today",
        percentageFilter: "today",
      },
      summary: {
        student: 0,
        teacherStaff: 0,
        theory: 0,
        subject: 0,
      },
      filter: {
        min_score: 60,
        checkedDate: true,
        start_date: new Date(date.getFullYear(), date.getMonth(), 1),
        end_date: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      },
      metaKKM: {
        data: [],
      },
    };
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2017 },
        (value, index) => 2018 + index
      );
    },
  },

  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    async loadDataKKM(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/exam/by-subject?min_score=${self.filter.min_score}`;

      if (url) {
        endPoint = url;
      } else {
        if (self.filter.checkedDate) {
          endPoint += `&start_date=${self.formatDateDefault(
            self.filter.start_date
          )}`;
          endPoint += `&end_date=${self.formatDateDefault(
            self.filter.end_date
          )}`;
        }
      }

      self.metaKKM.data = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.metaKKM.data = [];
          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.metaKKM.data.push(item);
            });
          }
        })
        .catch((error) => {
          let message = "Opps! Ada kesalahan.";

          if (error.response) {
            if (error.response.data.errors) {
              message = self.handleErrorApi(
                error.response.data.errors,
                "string"
              );
            }
            if (error.response.data.error) {
              message = error.response.data.message
            }

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    refreshData() {
      let self = this;

      self.filterFeed = "lastyear";
      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];
      self.chartOptions.series[1].data = [];

      self.filter.min_score = 60;
      self.filter.checkedDate = true;
      self.filter.start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      self.filter.end_date = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      self.metaKKM.data = [];
    },
    async submitChartFeed() {
      let self = this;

      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/feed?filter=${self.filterFeed}`;
      // let sum = 0;
      if (self.filterFeed == "month") {
        if (self.filterFeed == "" || self.selectedYear == "") {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan.", "warning");
          self.$Progress.fail();
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonth);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYear}`;
        }
      } else if (self.filterFeed == "date") {
        if (self.selectedDate == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
          self.$Progress.fail();
        } else {
          endPoint += `&date=${self.formatDateDefault(self.selectedDate)}`;
        }
      }

      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];
      self.chartOptions.series[1].data = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              let text = "-";
              let dataStatus = item.total_text;
              let dataEbook = item.total_ebook;

              self.totalStatusChartFeed += dataStatus;
              self.totalEbookChartFeed += dataEbook;

              if (self.filterFeed == "lastyear") {
                text = item.month + "/" + item.year;
              } else if (self.filterFeed == "month") {
                text = item.date;
              } else if (self.filterFeed == "date") {
                text = item.time;
              }

              self.chartOptions.xAxis.categories.push(text);
              self.chartOptions.series[0].data.push(dataStatus);
              self.chartOptions.series[1].data.push(dataEbook);
            });
          }
          self.$Progress.finish();
        })
        .catch((error) => {
          let message = "Opps! Terdapat kesalahan.";

          if (error.response) {
            if (error.response.data.errors) {
              message = self.handleErrorApi(
                error.response.data.errors,
                "string"
              );
            }
            if (error.response.data.error) {
              message = error.response.data.message
            }

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    reloadPage() {
      window.location.reload();
    },

    async loadDataActiveFeed() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/feed/most-active-user`;
      self.feed.activeUser = [];
      self.feed.activeUserLimit = [];

      endPoint += `?filter=${self.feed.activeUserFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.feed.activeUser = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 4) {
                self.feed.activeUserLimit.push(item);
                flag++;
              }
              self.$Progress.finish();
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPopularFeed() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/feed/popular-hashtag`;
      self.feed.popularHastag = [];
      self.feed.popularHastagLimit = [];

      endPoint += `?filter=${self.feed.popularHastagFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.feed.popularHastag = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 4) {
                self.feed.popularHastagLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPercentageFeed() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/feed/percentage-by-class`;

      self.feed.percentage = [];
      self.feed.percentageLimit = [];

      endPoint += `?filter=${self.feed.percentageFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.feed.percentage = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 4) {
                self.feed.percentageLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },

    async submitChartAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/assignment?filter=${self.filterAssignment}&progress=${self.assignmentStatus}`;

      if (self.assignmentClassroom) {
        if (self.assignmentClassroom.id != 0) {
          endPoint += `&class=${self.assignmentClassroom.id}`;
        }
      }

      if (self.filterAssignment == "month") {
        if (
          self.selectedMonthAssignment == "" ||
          self.selectedYearAssignment == ""
        ) {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthAssignment);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearAssignment}`;
        }
      } else if (self.filterAssignment == "date") {
        if (self.selectedDateAssignment == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&date=${self.formatDateDefault(
            self.selectedDateAssignment
          )}`;
        }
      }

      self.chartTugas.xAxis.categories = [];
      self.chartTugas.series[0].data = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              let text = "-";
              let dataTotal = item.total;

              if (self.filterAssignment == "lastyear") {
                text = item.month + "/" + item.year;
              } else if (self.filterAssignment == "month") {
                text = item.date;
              } else if (self.filterAssignment == "date") {
                text = item.time;
              }

              self.chartTugas.xAxis.categories.push(text);
              self.chartTugas.series[0].data.push(dataTotal);
            });
          }
        })
        .catch((error) => {
          let message = "Opps! Terdapat kesalahan.";

          if (error.response) {
            if (error.response.data.errors) {
              message = self.handleErrorApi(
                error.response.data.errors,
                "string"
              );
            }
            if (error.response.data.error) {
              message = error.response.data.message
            }
            self.$Swal.fire("Alert", message, "warning");
          }
        });
    },

    async loadDataTotalAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/assignment/total-by-subject`;
      self.assignment.total = [];
      self.assignment.totalLimit = [];

      endPoint += `?filter=${self.assignment.totalFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.assignment.total = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 4) {
                self.assignment.totalLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPopularAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/assignment/popular-by-subject`;

      self.assignment.popular = [];
      self.assignment.popularLimit = [];

      endPoint += `?filter=${self.assignment.popularFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.assignment.popular = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              // console.log("===item", item);
              if (flag < 4) {
                self.assignment.popularLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPercentageAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/assignment/percentage-by-class`;
      self.assignment.percentage = [];
      self.assignment.percentageLimit = [];

      endPoint += `?filter=${self.assignment.percentageFilter}`;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.assignment.percentage = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 4) {
                self.assignment.percentageLimit.push(item);
                flag++;
              }
            });
          }
        })
        .catch(() => {});
    },

    async loadDataSummary() {
      let self = this;

      let endPoint = `${process.env.VUE_APP_API_URL}/school/dashboard/summary`;

      self.summary.student = 0;
      self.summary.subject = 0;
      self.summary.theory = 0;
      self.summary.teacherStaff = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.summary.student = 0;
          self.summary.subject = 0;
          self.summary.theory = 0;
          self.summary.teacherStaff = 0;

          if (res.data.data) {
            self.summary.student = res.data.data.student;
            self.summary.subject = res.data.data.subject;
            self.summary.theory = res.data.data.theory;
            self.summary.teacherStaff = res.data.data.teacher_staff;
          }
        })
        .catch(() => {});
    },

    async getData() {
      await this.loadDataSummary();
      await this.loadDataKKM();
      await this.submitChartFeed();
      await this.loadDataActiveFeed();
      await this.loadDataPopularFeed();
      await this.loadDataPercentageFeed();
      await this.submitChartAssignment();
      await this.loadDataTotalAssignment();
      await this.loadDataPopularAssignment();
      await this.loadDataPercentageAssignment();
    },
  },
  mounted() {
    this.initBigChart(0);
    this.refreshData();
    // this.submitChartFeed();
    // this.loadDataActiveFeed();
    // this.loadDataPopularFeed();
    // this.loadDataPercentageFeed();
    // this.submitChartAssignment();
    // this.loadDataTotalAssignment();
    // this.loadDataPopularAssignment();
    // this.loadDataPercentageAssignment();
    // this.loadDataSummary();
    // this.loadDataKKM();
    this.getData();
  },
  activated() {},
  watch: {
    filterFeed() {
      this.selectedMonth = "";
      this.selectedYear = "";
      this.selectedDate = "";
    },
    filterAssignment() {
      this.selectedMonthAssignment = "";
      this.selectedYearAssignment = "";
      this.selectedDateAssignment = "";
    },
  },
};
</script>
<style scoped>
.highcharts-figure-dashboard,
.highcharts-data-table table {
  min-width: 100px;
  max-width: 300px;
}
.filter-option {
  background: #eef8ff;
  border-radius: 8px;
  /* height: 55px; */
  margin: auto;
  padding: 15px;
}
</style>
