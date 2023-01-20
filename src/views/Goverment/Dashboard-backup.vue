<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/sekolah"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Sekolah.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summarySchool }}
              </div>
              <div class="statistic-information text-muted">
                Sekolah
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
              <img src="../../assets/image/logo/Pelajar.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryStudent }}
              </div>
              <div class="statistic-information text-muted">
                Pelajar
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
              <img src="../../assets/image/logo/GuruStaff.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryTeacher }}
              </div>
              <div class="statistic-information text-muted">
                Guru & Staff
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
              <img src="../../assets/image/logo/materi.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryTheory }}
              </div>
              <div class="statistic-information text-muted">
                Materi
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/tugas"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Tugas.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryAssignment }}
              </div>
              <div class="statistic-information text-muted">
                Tugas
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/ujian"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Ujian.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summaryExam }}
              </div>
              <div class="statistic-information text-muted">
                Ujian
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="monitoring/mapel"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../assets/image/logo/Perpustakaan.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : progress.summarySubject }}
              </div>
              <div class="statistic-information text-muted">
                Mapel
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <div class="card d-flex flex-row align-items-center p-3">
            <div class="card-logo">
              <img src="../../assets/image/logo/kelulusan.png" alt="" />
            </div>
            <div class="statistic ml-4">
              <div
                class="statistic-calculation font-weight-bold text-white bg-red text-center rounded-pill"
              >
                SOON
              </div>
              <div class="statistic-information text-muted">
                Website
              </div>
            </div>
          </div>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <!-- Keaktifan sekolah -->
      <div class="notification-refresh border p-2">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/Logo-Onklas.png" alt="" />
              KEAKTIFAN SEKOLAH
            </div>
            <div class="information-notification ml-auto">
              <a href="javascript:;" @click="loadDataActiveSchool">
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="loadDataActiveSchool"
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
            <!-- V-FOR -->
            <div
              class="progress-bar-active-school"
              v-for="(item, index) in progress.progressItem"
              :key="`${index}-activeSchool`"
            >
              <div class="row">
                <div class="col-md-12 d-flex item-aligns-center">
                  <p
                    class="text-dark font-weight-bold"
                    style="font-size: 14px !important"
                  >
                    {{
                      item.product_display_name == null
                        ? item.product_name
                        : item.product_display_name
                    }}
                  </p>
                  <p class="ml-auto" style="font-size: 14px !important">
                    <b
                      class="text-primary-blue font-weight-bold"
                      :title="item.total_school + ' Sekolah yang memakai'"
                      >{{ item.total_school }}</b
                    >/
                    <b
                      class="text-muted"
                      :title="
                        progress.totalSchool + ' Total sekolah keseluruhan'
                      "
                    >
                      {{ progress.totalSchool }}</b
                    >
                  </p>
                </div>
              </div>
              <div class="progress mt--3 mb-1" style="height: 15px !important">
                <div
                  v-if="(item.total_school / progress.totalSchool) * 100 < 50"
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width:
                      (item.total_school / progress.totalSchool) * 100 + '%',
                    background: '#ff2e00 !important',
                  }"
                  :aria-valuenow="item.total_school"
                  aria-valuemin="0"
                  :aria-valuemax="progress.totalSchool"
                >
                  {{
                    ((item.total_school / progress.totalSchool) * 100)
                      | formatNumberDecimal
                  }}
                  %
                </div>
                <div
                  v-else-if="
                    (item.total_school / progress.totalSchool) * 100 > 50 &&
                      (item.total_school / progress.totalSchool) * 100 <= 60
                  "
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width:
                      (item.total_school / progress.totalSchool) * 100 + '%',
                    background: '#FFB200 !important',
                  }"
                  :aria-valuenow="item.total_school"
                  aria-valuemin="0"
                  :aria-valuemax="progress.totalSchool"
                >
                  {{
                    ((item.total_school / progress.totalSchool) * 100)
                      | formatNumberDecimal
                  }}
                  %
                </div>
                <div
                  v-else-if="
                    (item.total_school / progress.totalSchool) * 100 > 60 &&
                      (item.total_school / progress.totalSchool) * 100 <= 80
                  "
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width:
                      (item.total_school / progress.totalSchool) * 100 + '%',
                    background: '#04a4eb !important',
                  }"
                  :aria-valuenow="item.total_school"
                  aria-valuemin="0"
                  :aria-valuemax="progress.totalSchool"
                >
                  {{
                    ((item.total_school / progress.totalSchool) * 100)
                      | formatNumberDecimal
                  }}
                  %
                </div>
                <div
                  v-else-if="
                    (item.total_school / progress.totalSchool) * 100 > 80 &&
                      (item.total_school / progress.totalSchool) * 100 <= 100
                  "
                  class="progress-bar bg-progress"
                  role="progressbar"
                  :style="{
                    width:
                      (item.total_school / progress.totalSchool) * 100 + '%',
                    background: '#32BEA6 !important',
                  }"
                  :aria-valuenow="item.total_school"
                  aria-valuemin="0"
                  :aria-valuemax="progress.totalSchool"
                >
                  {{
                    ((item.total_school / progress.totalSchool) * 100)
                      | formatNumberDecimal
                  }}
                  %
                </div>
              </div>
            </div>
          </card>
        </div>

        <!--  -->
      </div>
      <!-- End Keaktifan sekolah -->

      <!-- ONKLAS -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/Logo-Onklas.png" alt="" />
              ONKLAS
            </div>
            <div class="information-notification ml-auto">
              <a
                href="javascript:;"
                @click="
                  submitChartFeed();
                  loadDataActiveFeed();
                "
              >
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="
                  submitChartFeed();
                  loadDataActiveFeed();
                "
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!--  -->
        <div class="col-xl-9">
          <card header-classes="bg-transparent">
            <form @submit.prevent="submitChartFeed">
              <div slot="header" class="header p-2">
                <div class="information-posting d-flex align-items-center">
                  <div
                    class="label font-weight-bold text-dark"
                    style="font-size: 14px"
                  >
                    Posting
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
                      <div class="form-check pl-0 mr-3">
                        <label class="form-check-label" for="radio1">
                          Filter
                        </label>
                      </div>
                      <select
                        class="form-control filter-assignment w-25 mr-auto"
                        v-model="filterFeed"
                        required
                      >
                        <option value="lastyear">
                          Setahun terakhir
                        </option>
                        <option value="month">
                          Bulan
                        </option>
                        <option value="date">
                          Tanggal
                        </option>
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
                      <div v-if="filterFeed == 'lastyear'">
                        <div
                          class="row d-flex align-items-center disabled-content"
                        >
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonth"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Bulan
                            </option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                            >
                              {{ monthFilter }}
                            </option>
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYear"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Tahun
                            </option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                            >
                              {{ year }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div v-if="filterFeed == 'month'">
                        <div class="row d-flex align-items-center">
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonth"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Bulan
                            </option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                            >
                              {{ monthFilter }}
                            </option>
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYear"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Tahun
                            </option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                            >
                              {{ year }}
                            </option>
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

            <div class="row">
              <div
                v-for="(item, index) in listChartFeed.slice(1, 13)"
                :key="`${index}-listFeed`"
                class="col-md-4 text-center"
              >
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      {{ item.month | formatDateMonth }}:
                      <a class=" text-dark">
                        <b
                          >status: ({{ item.total_text }}) . e-book: ({{
                            item.total_ebook
                          }})</b
                        >
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
          <div class="box-information-onklas bg-white p-3 pb-5">
            <div class="header text-center font-weight-bold mt-2">
              <p>Hari ini</p>
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="filterFeedStatistic"
                  @change="loadDataActiveFeed"
                  required
                >
                  <option value="school">Posting/Sekolah</option>
                  <option value="student">Posting/Pelajar</option>
                  <option value="teacher">Posting/Guru</option>
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
                        <a class="float-left text-muted">
                          <b>{{ index + 1 }}</b>
                        </a>
                        <a class="ml-2">
                          {{ item.school_name }}
                        </a>
                        <a class="float-right text-primary-blue">
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
      <!-- End ONKLAS -->

      <!-- Klasmember -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klasmember.png" alt="" />
              KLASMEMBER
            </div>
            <div class="information-notification ml-auto">
              <a
                href="javascript:;"
                @click="
                  submitChartMember();
                  loadDataKlasMember();
                "
              >
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="
                  submitChartMember();
                  loadDataKlasMember();
                "
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-xl-9">
          <card header-classes="bg-transparent">
            <form @submit.prevent="submitChartMember">
              <div slot="header" class="p-2 header">
                <div class="information-posting d-flex align-items-center">
                  <div
                    class="label font-weight-bold text-dark"
                    style="font-size: 14px"
                  >
                    Jumlah Pelajar
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="filter d-flex align-items-center mt-3 pr-0 float-right text-muted w-100"
                    >
                      <div class="form-check pl-0 mr-3">
                        <label class="form-check-label" for="radio1">
                          Filter
                        </label>
                      </div>
                      <select
                        class="form-control filter-assignment w-25 mr-auto"
                        v-model="filterMember"
                        required
                      >
                        <option value="lastyear">
                          Setahun terakhir
                        </option>
                        <option value="month">
                          Bulan
                        </option>
                        <option value="date">
                          Tanggal
                        </option>
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
                      <div v-if="filterMember == 'lastyear'">
                        <div
                          class="row d-flex align-items-center disabled-content"
                        >
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonthMember"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Bulan
                            </option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                            >
                              {{ monthFilter }}
                            </option>
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYearMember"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Tahun
                            </option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                            >
                              {{ year }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div v-if="filterMember == 'month'">
                        <div class="row d-flex align-items-center">
                          <div class="form-check mr-3">
                            <label class="form-check-label" for="radio1">
                              <input
                                type="radio"
                                class="form-check-input"
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonthMember"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Bulan
                            </option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                            >
                              {{ monthFilter }}
                            </option>
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYearMember"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Tahun
                            </option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                            >
                              {{ year }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div
                        v-if="filterMember == 'date'"
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
                          v-model="selectedDateMember"
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
            <highcharts :options="chartMember"></highcharts>
            <!-- <div class="row">
              <div class="col-md-8 d-flex align-items-center">
                <highcharts
                  class="highcharts-figure-dashboard"
                  :options="chartPie"
                ></highcharts>
                <div class="teacher-count">
                  Total Guru: <br />
                  4.470
                </div>
              </div>
              <div class="col-md-4 filter-klasmember">
                <label for="grade-sd">Grade SD</label>
                <label for="grade-sd" class="float-right text-primary"
                  >25%</label
                >
                <div class="progress" id="grade-sd">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    style="width: 25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-smp">Grade SMP</label>
                <label for="grade-smp" class="float-right text-info">25%</label>
                <div class="progress" id="grade-smp">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style="width: 50%"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-sma">Grade SMA</label>
                <label for="grade-sma" class="float-right text-warning"
                  >25%</label
                >

                <div class="progress" id="grade-sma">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 75%"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <label for="grade-smk">Grade SMK</label>
                <label for="grade-smk" class="float-right text-danger"
                  >25%</label
                >

                <div class="progress" id="grade-smk">
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 100%"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div> -->

            <!-- <div class="row">
              <div class="col-md-4 ">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Grade SD:
                      <a class=" float-right text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMP:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMA:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      Grade SMK:
                      <a class="float-right  text-dark">
                        <b>pelajar: (59%) - (124.155)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4">
                <div class="periode-chart float-left">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSD }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMP }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMA }})</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="  text-dark">
                        <b>guru : () - ({{ member.memberDataTeacherSMK }})</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-4 ">
                <div class="periode-chart float-left">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class=" float-right text-dark">
                        <b>staff : (6%) 505 / 8.431)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (8%) 877 / 5.733)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (2%) 168 / 5.733)</b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-right  text-dark">
                        <b>staff : (4%) 337 / 8.431)</b>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
          </card>
        </div>
        <div class="col-xl-3">
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
                        <a
                          class="float-left text-muted"
                          :title="item.school_name"
                        >
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
        <!--  -->
      </div>
      <!--End Klasmember-->

      <!-- Tugas -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klastugas.png" alt="" />
              TUGAS
            </div>
            <div class="information-notification ml-auto">
              <a
                href="javascript:;"
                @click="
                  submitChartAssignment();
                  loadDataTotalAssignment();
                "
              >
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="
                  submitChartAssignment();
                  loadDataTotalAssignment();
                "
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <!--  -->
        <div class="col-xl-9">
          <card header-classes="bg-transparent">
            <form @submit.prevent="submitChartAssignment">
              <div slot="header" class="p-2 header">
                <div class="information-posting d-flex align-items-center">
                  <div
                    class="label font-weight-bold text-dark"
                    style="font-size: 14px"
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
                        <option value="lastyear">
                          Setahun terakhir
                        </option>
                        <option value="month">
                          Bulan
                        </option>
                        <option value="date">
                          Tanggal
                        </option>
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
                                name="optradio"
                                value="option1"
                                checked
                              />Per/Bulan
                            </label>
                          </div>
                          <select
                            class="form-control filter-assignment mr-2"
                            v-model="selectedMonthAssignment"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Bulan
                            </option>
                            <option
                              v-for="monthFilter in month"
                              :key="monthFilter.id"
                            >
                              {{ monthFilter }}
                            </option>
                          </select>
                          <select
                            class="form-control filter-assignment mr-3"
                            v-model="selectedYearAssignment"
                            style="width: 115px"
                          >
                            <option disabled value="">
                              Tahun
                            </option>
                            <option
                              v-for="year in years"
                              :value="year"
                              :key="year.id"
                            >
                              {{ year }}
                            </option>
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

            <div class="row">
              <div class="col-md-3">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Peringkat jumlah tugas:
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="col-md-4 p-0"
                    v-for="(item,
                    index) in assignment.assignmentBySubject.slice(0, 12)"
                    :key="`${index}-assignment`"
                  >
                    <div class="periode-chart">
                      <ul class="list-group list-group-unbordered">
                        <li class="list-group-item mb-1 text-dark">
                          <b
                            >{{ index + 1 }}. {{ item.subject_name }}: ({{
                              item.total
                            }})</b
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
        <div class="col-xl-3">
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
        <!--  -->
      </div>
      <!-- End Tugas -->

      <!-- Persentase -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/klaspresentase.png" alt="" />
              PERSENTASE
            </div>
            <div class="information-notification ml-auto">
              <a href="javascript:;" @click="loadDataPercentageDashboard()">
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="loadDataPercentageDashboard()"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="presentase">
            <card header-classes="bg-transparent text-center">
              <p>(%) Mata pelajaran</p>
              <radial-progress-bar
                class="rounded-circle radialbar-mapel"
                :diameter="250"
                :completed-steps="percentageMapel.completedStepMapel"
                :total-steps="percentageMapel.totalStepMapel"
                startColor="#FF2E00"
                :strokeWidth="15"
                stopColor="#FF2E00"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ percentageMapel.completedStepMapel }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/red.svg" alt="" />
                  Penyerapan materi:
                  {{ percentageMapel.completedStepMapel }}%
                </div> -->
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size: 14px"
                >
                  <a
                    type="button"
                    @click="modal.showModalPresentaseMapelDashboard = true"
                    class="btn button-terapkan"
                    style="font-size: 12px"
                    >Detail</a
                  >
                  <modal-persentase-dashboard-mapel
                    v-if="modal.showModalPresentaseMapelDashboard"
                    class="overlay"
                    @close="modal.showModalPresentaseMapelDashboard = false"
                  ></modal-persentase-dashboard-mapel>
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
                :completed-steps="
                  percentagePerpustakaan.completedStepPerpustakaan
                "
                :total-steps="percentagePerpustakaan.totalStepPerpustakaan"
                startColor="#0054FE"
                :strokeWidth="15"
                stopColor="#0054FE"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ percentagePerpustakaan.completedStepPerpustakaan }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/Color.svg" alt="" />
                  Peminjaman buku:
                  {{ percentagePerpustakaan.completedStepPerpustakaan }}%
                </div> -->
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size: 14px"
                >
                  <a
                    type="button"
                    @click="
                      modal.showModalPresentasePerpustakaanDashboard = true
                    "
                    class="btn button-terapkan"
                    style="font-size: 12px"
                    >Detail</a
                  >
                  <modal-persentase-dashboard-perpustakaan
                    v-if="modal.showModalPresentasePerpustakaanDashboard"
                    class="overlay"
                    @close="
                      modal.showModalPresentasePerpustakaanDashboard = false
                    "
                  ></modal-persentase-dashboard-perpustakaan>
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
                :completed-steps="percentageUjian.completedStepUjian"
                :total-steps="percentageUjian.totalStepUjian"
                startColor="#34B53A"
                stopColor="#34B53A"
                :strokeWidth="15"
                innerStrokeColor="bg-transparent"
              >
                <p>{{ percentageUjian.completedStepUjian }}%</p>
              </radial-progress-bar>
              <div class="information-posting mt-2 d-flex align-items-center">
                <!-- <div class="icon-information ml-2" style="font-size: 12px">
                  <img src="../../assets/image/icons/green.svg" alt="" />
                  Kelulusan :
                  {{ percentageUjian.completedStepUjian }}%
                </div> -->
                <div
                  class="label font-weight-bold text-dark ml-auto"
                  style="font-size: 14px"
                >
                  <a
                    type="button"
                    @click="modal.showModalPresentaseUjianDashboard = true"
                    class="btn button-terapkan "
                    style="font-size: 12px"
                    >Detail</a
                  >
                  <modal-persentase-dashboard-ujian
                    v-if="modal.showModalPresentaseUjianDashboard"
                    class="overlay"
                    @close="modal.showModalPresentaseUjianDashboard = false"
                  ></modal-persentase-dashboard-ujian>
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
      <!-- End Persentase -->

      <!-- Map  -->
      <div class="notification-refresh border p-2 mt-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../assets/image/logo/PersebaranPeta.png" alt="" />
              PERSEBARAN PETA
            </div>
            <div class="information-notification ml-auto">
              <a
                href="javascript:;"
                @click="
                  loadDataMapTeacherBySubject();
                  loadDataMapTeacherByLocation();
                "
              >
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="
                  loadDataMapTeacherBySubject();
                  loadDataMapTeacherByLocation();
                "
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
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="filter d-flex align-items-center mt-3 float-right text-muted w-100"
                    >
                      <div
                        class="label font-weight-bold text-dark"
                        style="font-size: 14px"
                      >
                        Peta Persebaran
                      </div>
                      <!-- <select
                        class="form-control filter-assignment w-25 "
                        required
                      >
                        <option value="Guru">Guru</option>
                      </select> -->
                      <div class="form-check ml-auto ml-4">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="location"
                          value="location"
                          v-model="filterMap"
                        />
                        <label class="form-check-label mt-1" for="location">
                          Lokasi
                        </label>
                      </div>
                      <div class="form-check ml-4">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="Assignment"
                          value="teacher"
                          v-model="filterMap"
                          checked
                        />
                        <label class="form-check-label mt-1" for="Assignment">
                          Guru per/Mapel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <hr />
            <!--  -->
            <!-- City Map -->
            <div class="row">
              <!-- <div class="col-md-4">
                <div class="card card-box-list-city text-left">
                  <div class="card-body  table-responsive p-0">
                    <table class="table">
                      <tbody>
                        <tr
                          v-for="(location, index) in filterLocation"
                          :key="`${index}-listCity`"
                        >
                          <td>
                            {{ location.city }}, {{ location.admin_name }}
                          </td>
                          <td class="text-right text-dark font-weight-bold">
                            581
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> -->
              <div
                class="col-md-12 map-indonesia"
                v-if="filterMap == 'teacher'"
              >
                <l-map
                  @update:zoom="zoomUpdate"
                  @update:center="centerUpdate"
                  :options="{ zoomControl: false }"
                  :zoom="zoom"
                  :center="center"
                >
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  ></l-tile-layer>
                  <l-marker
                    v-for="(item, index) in cityLocationBySubject"
                    :key="`${index}-listCity`"
                    :lat-lng="latLng(item.latitude, item.longitude)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="someExtraClass"
                    >
                      <div class="headline rounded-circle">
                        {{ item.teacher.length }}
                      </div>
                      <div class="leaflet-popup-tip-container">
                        <div class="leaflet-popup-tip popup-tip-custome"></div>
                      </div>
                    </l-icon>

                    <l-popup class="popup-map">
                      <div class="table-responsive">
                        <div
                          class="table"
                          style="
														height: 100px !important;
													"
                        >
                          <span class="text-muted">{{ item.city_name }}</span>
                          <div class="d-flex align-items-center border-bottom">
                            <span class="text-dark font-weight-bold"
                              >Jumlah guru per/mapel:</span
                            >
                            <span class="ml-auto font-weight-bold text-dark">{{
                              item.teacher.length
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                          <div
                            v-for="(subjectTeacher, index) in item.teacher"
                            :key="`${index}-subjecyTeacher`"
                            class="d-flex align-items-center"
                          >
                            <span class="text-muted"
                              >{{ subjectTeacher.subject_name }}:</span
                            >
                            <span class="ml-auto text-dark font-weight-bold">{{
                              subjectTeacher.total
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>

                  <!-- <l-polygon
                    :lat-lngs="polygon.latlngs"
                    :color="polygon.color"
                  ></l-polygon> -->
                  <l-control-zoom position="topright"></l-control-zoom>
                  <l-control position="topleft">
                    <div class="card card-map text-left">
                      <div class="card-body">
                        <h4 class="card-title text-dark">
                          Jumlah Sekolah
                        </h4>
                        <div class="study-status d-flex align-items-center">
                          <img
                            src="../../assets/image/icons/box-green-one.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-green-two.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-green-three.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Diatas 500</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                  <l-control position="topleft">
                    <div class="card card-map text-left">
                      <div class="card-body">
                        <h4 class="card-title text-dark">
                          Status Bidang Studi
                        </h4>
                        <div class="study-status d-flex align-items-center">
                          <img
                            src="../../assets/image/icons/box-black.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Guru per/mapel</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </div>
              <div class="col-md-12 map-indonesia" v-else>
                <l-map
                  @update:zoom="zoomUpdate"
                  @update:center="centerUpdate"
                  :options="{ zoomControl: false }"
                  :zoom="zoom"
                  :center="center"
                >
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  ></l-tile-layer>

                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCity`"
                    :lat-lng="latLng(item.latitude, item.longitude)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-guru"
                    >
                      <div class="headline rounded-circle"></div>
                      <div class="leaflet-popup-tip-container">
                        <div class="leaflet-popup-tip popup-tip-custome"></div>
                      </div>
                    </l-icon>

                    <l-popup class="popup-map">
                      <div class="table-responsive">
                        <div
                          class="table"
                          style="
														height: 100px !important;
													"
                        >
                          <span class="text-muted">{{ item.city_name }}</span>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <img
                              src="../../assets/image/icons/box-yellow.png"
                              alt=""
                            />
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <img
                              src="../../assets/image/icons/box-blue.png"
                              alt=""
                            />
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <img
                              src="../../assets/image/icons/box-pink.png"
                              alt=""
                            />
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>

                  <!-- <l-polygon
                    :lat-lngs="polygon.latlngs"
                    :color="polygon.color"
                  ></l-polygon> -->
                  <l-control-zoom position="topright"></l-control-zoom>
                  <l-control position="topleft">
                    <div class="card card-map text-left">
                      <div class="card-body">
                        <h4 class="card-title text-dark">
                          Jumlah Sekolah
                        </h4>
                        <div class="study-status d-flex align-items-center">
                          <img
                            src="../../assets/image/icons/box-green-one.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-green-two.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-green-three.svg"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Diatas 500</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                  <l-control position="topleft">
                    <div class="card card-map text-left">
                      <div class="card-body">
                        <h4 class="card-title text-dark">
                          Status Persebaran
                        </h4>
                        <div class="study-status d-flex align-items-center">
                          <img
                            src="../../assets/image/icons/box-yellow.png"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Jumlah Guru</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-blue.png"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Jumlah Sekolah</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../assets/image/icons/box-pink.png"
                            alt=""
                          />
                          <span class="ml-2 text-dark">Jumlah Murid</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </div>
            </div>
            <!-- City Map -->
          </card>
        </div>

        <!--  -->
      </div>
      <!-- Map  -->
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
// import LineChart from "@/components/Charts/LineChart";
import Datepicker from "vuejs-datepicker";
import { Chart } from "highcharts-vue";
import RadialProgressBar from "vue-radial-progress";
import broker from "../../utils/broker";
import { _ } from "vue-underscore";
import ModalPersentaseDashboardMapel from "../../../src/components/Goverment/Modal/PersentaseDashboard/ModalPersentaseMapelDashboard";
import ModalPersentaseDashboardUjian from "../../components/Goverment/Modal/PersentaseDashboard/ModalPersentaseNilaiUjianDashboard";
import ModalPersentaseDashboardPerpustakaan from "../../../src/components/Goverment/Modal/PersentaseDashboard/ModalPersentasePerpustakaanDashboard";
import dataLocation from "./data/id.json";
import L from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LControlZoom,
  LControl,
  LIcon,
} from "vue2-leaflet";

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
// import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  metaInfo: {
    title: "Dashboard",
    titleTemplate: "%s | Klasmonitoring Pemerintah",
  },
  components: {
    // LineChart,

    Datepicker,
    highcharts: Chart,
    RadialProgressBar,
    "modal-persentase-dashboard-mapel": ModalPersentaseDashboardMapel,
    "modal-persentase-dashboard-ujian": ModalPersentaseDashboardUjian,
    "modal-persentase-dashboard-perpustakaan": ModalPersentaseDashboardPerpustakaan,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom,
    LControl,
    LIcon,
    // LPolygon,
    // PageVisitsTable,
    // SocialTrafficTable,
  },
  data() {
    return {
      loading: false,
      dataLocation,
      cityLocationByLocation: [],
      cityLocationBySubject: [],
      scopeType: this.$store.state.scopeType,
      latitudeCenter: 0,
      longitudeCenter: 0,
      filterMap: "location",
      zoom: 9,
      center: L.latLng(0, 0),
      currentCenter: L.latLng(0, 0),
      currentZoom: 9,
      // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      url:
        "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=eb7b36f4657a451f82cdb3648928e7fd",
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      icon: L.icon({
        iconUrl: require("../../assets/image/icons/mapping.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      staticAnchor: [16, 37],
      iconSize: 64,

      // polygon: {
      //   latlngs: [
      //     [47.2263299, -1.6222],
      //     [47.21024000000001, -1.6270065],
      //     [47.1969447, -1.6136169],
      //     [47.18527929999999, -1.6143036],
      //     [47.1794457, -1.6098404],
      //     [47.1775788, -1.5985107],
      //     [47.1676598, -1.5753365],
      //     [47.1593731, -1.5521622],
      //     [47.1593731, -1.5319061],
      //     [47.1722111, -1.5143967],
      //     [47.1960115, -1.4841843],
      //     [47.2095404, -1.4848709],
      //     [47.2291277, -1.4683914],
      //     [47.2533687, -1.5116501],
      //     [47.2577961, -1.5531921],
      //     [47.26828069, -1.5621185],
      //     [47.2657179, -1.589241],
      //     [47.2589612, -1.6204834],
      //     [47.237287, -1.6266632],
      //     [47.2263299, -1.6222],
      //   ],
      //   color: "green",
      // },

      // --------------
      modal: {
        showModalPresentaseMapelDashboard: false,
        showModalPresentaseUjianDashboard: false,
        showModalPresentasePerpustakaanDashboard: false,
      },
      filterFeed: "lastyear",
      filterFeedStatistic: "school",
      filterMemberStatistic: "teacher",
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
      listChartFeed: [],
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
        assignmentBySubject: [],
      },

      modalAssignment: {
        type: 0,
        label: "",
        data: [],
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

      filterMember: "lastyear",
      selectedMonthMember: "",
      selectedYearMember: "",
      selectedDateMember: "",
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

      loadData: {
        assignment: 0,
        theory: 0,
        student: 0,
        teacherStaff: 0,
        exam: 0,
        subject: 0,
        school: 0,
      },

      percentageMapel: {
        completedStepMapel: 0,
        totalStepMapel: 100,
      },

      percentagePerpustakaan: {
        completedStepPerpustakaan: 0,
        totalStepPerpustakaan: 100,
      },

      percentageUjian: {
        completedStepUjian: 0,
        totalStepUjian: 100,
      },

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
            '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
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
            name: "Share",
            data: [],
          },
        ],
      },

      chartTugas: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [],
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

      chartMember: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [],
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

      progress: {
        totalSchool: 0,
        progressItem: [],
        summarySchool: 0,
        summaryStudent: 0,
        summaryTeacher: 0,
        summaryTheory: 0,
        summaryAssignment: 0,
        summaryExam: 0,
        summarySubject: 0,
      },
    };
  },
  methods: {
    latLng(lat, lng) {
      return L.latLng(lat, lng);
    },

    centerUpdate(center) {
      this.currentCenter = center;
    },

    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },

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

    async submitChartAssignment() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/assignment/chart?filter=${self.filterAssignment}&progress=${self.assignmentStatus}`;

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

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          res.data.data.assignment_percentages.forEach((item) => {
            let text = "-";
            let dataTotal = item.total_assignment;
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
      });

      self.assignment.assignmentBySubject = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.assignment_by_subjects.forEach((item) => {
              self.assignment.assignmentBySubject.push(item);
            });
            // let assignmentSubject = res.data.data.assignment_by_subjects;
            // console.log('====',self.assignment.assignmentBySubject.push(assignmentSubject));
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
            self.$Swal.fire("Alert", message, "warning");
          }
        });
    },

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

    async listChartFeedPosting() {
      let self = this;

      self.$Progress.start();
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/chart?filter=${self.filterFeed}`;
      self.listChartFeed = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.listChartFeed.push(item);
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

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    async submitChartFeed() {
      let self = this;

      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/chart?filter=${self.filterFeed}`;
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

              // console.log(
              //   "dataStatus",
              //   item.reduce((acc, items) => acc + items.total_text, 0)
              // );
              // console.log('dataEbook', dataEbook);

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

            self.$Swal.fire("Alert!", message, "warning");
          }
          self.$Progress.fail();
        });
    },

    async loadDataActiveFeed() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/feed/statistic?filter=${self.filterFeedStatistic}`;
      self.feed.activeUser = [];
      self.feed.activeUserLimit = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.feed.activeUser = res.data.data;
            let flag = 0;
            res.data.data.forEach((item) => {
              if (flag < 10) {
                self.feed.activeUserLimit.push(item);
                flag++;
              }
              self.$Progress.finish();
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPercentageDashboard() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/percentage`;

      self.percentageMapel.completedStepMapel = 0;
      self.percentagePerpustakaan.completedStepPerpustakaan = 0;
      self.percentageUjian.completedStepUjian = 0;

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          let examData = res.data.data.exam;
          let libraryData = res.data.data.library;
          let theoryData = res.data.data.school_theory;

          self.percentageUjian.completedStepUjian = parseFloat(
            examData.percentage
          );
          self.percentagePerpustakaan.completedStepPerpustakaan = parseFloat(
            libraryData.percentage
          );

          self.percentageMapel.completedStepMapel = parseFloat(
            theoryData.percentage
          );
        }
      });
    },

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

    async submitChartMember() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/member/chart?filter=${self.filterMember}`;

      if (self.filterMember == "month") {
        if (self.selectedMonthMember == "" || self.selectedYearMember == "") {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthMember);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearMember}`;
        }
      } else if (self.filterMember == "date") {
        if (self.selectedDateMember == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&date=${self.formatDateDefault(
            self.selectedDateMember
          )}`;
        }
      }

      self.chartMember.xAxis.categories = [];
      self.chartMember.series[0].data = [];

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          res.data.data.forEach((item) => {
            let text = "-";
            let dataTotal = item.student.total_student;
            if (self.filterMember == "lastyear") {
              text = item.month + "/" + item.year;
            } else if (self.filterMember == "month") {
              text = item.date;
            } else if (self.filterMember == "date") {
              text = item.time;
            }
            self.chartMember.xAxis.categories.push(text);
            self.chartMember.series[0].data.push(dataTotal);
          });
        }
      });
    },

    async loadDataActiveSchool() {
      this.loading = true;

      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/summary`;

      self.progress.totalSchool = 0;
      self.progress.progressItem = [];
      self.progress.summarySchool = 0;
      self.progress.summaryStudent = 0;
      self.progress.summaryTeacher = 0;
      self.progress.summaryTheory = 0;
      self.progress.summaryAssignment = 0;
      self.progress.summaryExam = 0;
      self.progress.summarySubject = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.progress.totalSchool = 0;
          self.progress.summarySchool = 0;
          self.progress.summaryStudent = 0;
          self.progress.summaryTeacher = 0;
          self.progress.summaryTheory = 0;
          self.progress.summaryAssignment = 0;
          self.progress.summaryExam = 0;
          self.progress.summarySubject = 0;
          self.progress.progressItem = [];

          if (res.data.data) {
            self.progress.totalSchool = res.data.data.school;
            self.progress.summarySchool = res.data.data.school;
            self.progress.summaryStudent = res.data.data.student;
            self.progress.summaryTeacher = res.data.data.teacher_staff;
            self.progress.summaryTheory = res.data.data.theory;
            self.progress.summaryAssignment = res.data.data.assignment;
            self.progress.summaryExam = res.data.data.exam;
            self.progress.summarySubject = res.data.data.subject;
            // console.log("ACTIVE", self.progress.totalSchool);

            res.data.data.products.forEach((item) => {
              self.progress.progressItem.push(item);
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    async loadDataMapTeacherByLocation() {
      let self = this;
      self.$Progress.start();

      if (self.scopeType == "province") {
        let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-location?scope=${self.scopeType}`;
        self.latitudeCenter = 0;
        self.longitudeCenter = 0;

        await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              self.latitudeCenter = res.data.data[0].latitude;

              self.longitudeCenter = res.data.data[0].longitude;

              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);

              self.currentCenter = L.latLng(
                self.latitudeCenter,
                self.longitudeCenter
              );
            }
          })
          .catch(() => {});

        let cityInProvince = "city";
        let endPointGetCityInProvince = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-location?scope=${cityInProvince}`;

        self.cityLocationByLocation = [];

        await broker.fetch
          .get(endPointGetCityInProvince)
          .then((res) => {
            if (res.data.data) {
              res.data.data.forEach((item) => {
                self.cityLocationByLocation.push(item);
              });
            }
          })
          .catch(() => {});
      } else {
        let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-location?scope=${self.scopeType}`;
        self.latitudeCenter = 0;
        self.longitudeCenter = 0;

        await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              self.latitudeCenter = res.data.data[0].latitude;

              self.longitudeCenter = res.data.data[0].longitude;

              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);

              self.currentCenter = L.latLng(
                self.latitudeCenter,
                self.longitudeCenter
              );
            }
          })
          .catch(() => {});
      }
    },

    async loadDataMapTeacherBySubject() {
      let self = this;
      self.$Progress.start();

      if (self.scopeType == "province") {
        let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-subject?scope=${self.scopeType}`;
        self.latitudeCenter = 0;
        self.longitudeCenter = 0;

        await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              self.latitudeCenter = res.data.data[0].latitude;

              self.longitudeCenter = res.data.data[0].longitude;

              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);

              self.currentCenter = L.latLng(
                self.latitudeCenter,
                self.longitudeCenter
              );
            }
          })
          .catch(() => {});

        let cityInProvince = "city";
        let endPointGetCityInProvince = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-subject?scope=${cityInProvince}`;

        self.cityLocationBySubject = [];

        await broker.fetch
          .get(endPointGetCityInProvince)
          .then((res) => {
            if (res.data.data) {
              res.data.data.forEach((item) => {
                self.cityLocationBySubject.push(item);
              });
            }
          })
          .catch(() => {});
      } else {
        let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-subject?scope=${self.scopeType}`;
        self.latitudeCenter = 0;
        self.longitudeCenter = 0;

        await broker.fetch
          .get(endPoint)
          .then((res) => {
            if (res.data.data) {
              self.latitudeCenter = res.data.data[0].latitude;

              self.longitudeCenter = res.data.data[0].longitude;

              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);

              self.currentCenter = L.latLng(
                self.latitudeCenter,
                self.longitudeCenter
              );
            }
          })
          .catch(() => {});
      }
    },
    async getData() {
      await this.loadDataActiveSchool();
      await this.loadDataMapTeacherByLocation();
      await this.loadDataMapTeacherBySubject();
      await this.submitChartFeed();
      await this.listChartFeedPosting();
      await this.loadDataActiveFeed();
      await this.submitChartMember();
      await this.loadDataKlasMember();
      await this.submitChartAssignment();
      await this.loadDataTotalAssignment();
      await this.loadDataPercentageDashboard();
    },
  },
  mounted() {
    this.initBigChart(0);
    // this.submitChartAssignment();
    // this.loadDataTotalAssignment();
    // this.submitChartFeed();
    // this.loadDataActiveFeed();
    // this.loadDataPercentageDashboard();
    // this.loadDataKlasMember();
    // this.submitChartMember();
    // this.loadDataAssignment();
    // this.loadDataExam();
    // this.loadDataSubject();
    // this.loadDataTheory();
    // this.loadDataSchool();
    // this.loadDataStudent();
    // this.loadDataTeacher();
    // this.loadDataActiveSchool();
    this.getData();
  },
  activated() {},
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 2017 },
        (value, index) => 2018 + index
      );
    },
    // filterLocation() {
    //   // return this.dataLocation.filter(
    //   //   (location) => location.admin_name == "Sulawesi Utara"
    //   // );

    //   return this.cityLocationByLocation.filter();
    // },
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
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
</style>
