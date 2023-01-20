<template>
  <div>
    <base-header type="gradient-success" class="container mb-4 pt-md-8">
      <div class="notification-refresh border p-2 mb-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/klastime.png"
                alt="klastime"
              />
              KLASTIME
            </div>
            <div class="information-notification ml-auto">
              <a href="javascript:;" @click="getData()">
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
                @click="getData()"
              >
                <i class="fas fa-sync-alt" title="Sinkrokinsasi Data"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="presensi/kehadiran"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/kehadiran.png"
                alt="kehadiran"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : summaryCount.presence }}
              </div>
              <div class="statistic-information text-muted">
                Kehadiran
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="presensi/terlambat"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/Terlambat.png"
                alt="terlambat"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : summaryCount.late }}
              </div>
              <div class="statistic-information text-muted">
                Terlambat
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="presensi/keluar-awal"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/Keluarawal.png"
                alt="keluar awal"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : summaryCount.early_out }}
              </div>
              <div class="statistic-information text-muted">
                Keluar awal
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="presensi"
            class="card card-information d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                lazy="loading"
                v-once
                src="../../../assets/image/logo/Alpa.png"
                alt="alpa"
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                {{ loading ? "LOAD..." : summaryCount.absent }}
              </div>
              <div class="statistic-information text-muted">
                Alpa
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="mt-4">
        <div class="row mt-4">
          <div class="col-xl-9">
            <card header-classes="bg-transparent">
              <div class="row">
                <div class="col-md-12">
                  <form @submit.prevent="submitChartPrecense">
                    <div
                      class="filter d-flex align-items-center mt-3 pr-0 float-right text-muted w-100"
                    >
                      <div class="form-check pl-0 mr-2">
                        <label
                          class="form-check-label text-dark font-weight-bold"
                          for="radio1"
                        >
                          Presensi
                        </label>
                      </div>
                      <select
                        class="form-control filter-assignment w-25 mr-auto"
                        v-model="filterPresenceStat"
                        required
                      >
                        <option value="rangedate">
                          Tanggal
                        </option>
                        <option value="month">
                          Bulan
                        </option>
                      </select>
                      <div v-if="filterPresenceStat == 'month'">
                        <div class="row d-flex align-items-center">
                          <div class="form-check ml-1 mr-1">
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
                            v-model="selectedMonthPresence"
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
                            v-model="selectedYearPresence"
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
                        v-if="filterPresenceStat == 'rangedate'"
                        class="d-flex align-items-center"
                      >
                        <div class="form-check mr-2 ml-2">
                          <label class="form-check-label" for="radio2">
                            <input
                              type="radio"
                              class="form-check-input"
                              id="radio2"
                              name="optradio"
                              value="option2"
                              checked
                            />Tanggal
                          </label>
                        </div>

                        <datepicker
                          class="my-datepicker"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal Mulai"
                          v-model="selectedStartDatePresence"
                          :format="formatDateDefault"
                          :calendar-class="`dashboard-datepicker`"
                          :required="true"
                          :readonly="false"
                        ></datepicker>
                        <datepicker
                          class="my-datepicker ml-2"
                          input-class="form-control bg-white filter-datepicker_calendar"
                          placeholder="Tanggal Akhir"
                          v-model="selectedEndDatePresence"
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
                  </form>
                </div>
              </div>

              <div class="row mt-3 d-flex align-items-center">
                <div class="col-md-6 ">
                  <div class="row d-flex align-items-center">
                    <div class="col-md-3">
                      <div class="teacher-count">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="studentSection"
                            v-model="filterSectionPresence"
                            @change="submitChartPrecense"
                            value="studentPresence"
                            checked
                          />
                          <label class="form-check-label" for="studentSection">
                            Pelajar
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="teacherSection"
                            v-model="filterSectionPresence"
                            @change="submitChartPrecense"
                            value="teacherPresence"
                            checked
                          />
                          <label class="form-check-label" for="teacherSection">
                            Guru
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="staffSection"
                            v-model="filterSectionPresence"
                            @change="submitChartPrecense"
                            value="staffPresence"
                            checked
                          />
                          <label class="form-check-label" for="staffSection">
                            Staff
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-9 pl-0">
                      <highcharts
                        class="highcharts-figure-dashboard"
                        :options="chartPelajar"
                      ></highcharts>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 filter-klasmember">
                  <label for="grade-sd">Kehadiran</label>
                  <label for="grade-sd" class="float-right text-primary">{{
                    progressbarPresence.percentagePresence
                  }}</label>
                  <div class="progress" id="grade-sd">
                    <div
                      class="progress-bar bg-primary"
                      role="progressbar"
                      :style="{
                        width: progressbarPresence.percentagePresence,
                        background: 'rgb(0, 84, 254) !important',
                      }"
                      :aria-valuenow="progressbarPresence.percentagePresence"
                      aria-valuemin="0"
                      :aria-valuemax="100"
                    ></div>
                  </div>
                  <label for="grade-smp">Keluar awal</label>
                  <label for="grade-smp" class="float-right text-info">{{
                    progressbarPresence.percentageEarlyOut
                  }}</label>
                  <div class="progress" id="grade-smp">
                    <div
                      class="progress-bar bg-info"
                      role="progressbar"
                      :style="{
                        width: progressbarPresence.percentageEarlyOut,
                        background: 'rgb(74, 184, 255) !important',
                      }"
                      :aria-valuenow="progressbarPresence.percentageEarlyOut"
                      aria-valuemin="0"
                      :aria-valuemax="100"
                    ></div>
                  </div>
                  <label for="grade-sma">Terlambat</label>
                  <label for="grade-sma" class="float-right text-warning">{{
                    progressbarPresence.percentageLate
                  }}</label>

                  <div class="progress" id="grade-sma">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{
                        width: progressbarPresence.percentageLate,
                        background: '#FFB200 !important',
                      }"
                      :aria-valuenow="progressbarPresence.percentageLate"
                      aria-valuemin="0"
                      :aria-valuemax="100"
                    ></div>
                  </div>
                  <label for="grade-smk">Alpa</label>
                  <label for="grade-smk" class="float-right text-danger">{{
                    progressbarPresence.percentageAbsent
                  }}</label>
                  <!--  -->
                  <div class="progress" id="grade-smk">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{
                        width: progressbarPresence.percentageAbsent,
                        background: '#ff2e00 !important',
                      }"
                      :aria-valuenow="progressbarPresence.percentageAbsent"
                      aria-valuemin="0"
                      :aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="periode-chart">
                    <ul class="list-group list-group-unbordered">
                      <li class="list-group-item mb-1">
                        Kehadiran
                        <a class="float-right text-dark">
                          <b
                            >pelajar: ({{
                              listPresenceStudent.percentagePresence
                            }}) - ({{ listPresenceStudent.totalPresence }}
                            /
                            {{ listPresenceStudent.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        Keluar awal
                        <a class="float-right text-dark">
                          <b
                            >pelajar: ({{
                              listPresenceStudent.percentageEarlyOut
                            }}) - ({{ listPresenceStudent.totalEarlyOut }}
                            /
                            {{ listPresenceStudent.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        Terlambat
                        <a class="float-right text-dark">
                          <b
                            >pelajar: ({{ listPresenceStudent.percentageLate }})
                            - ({{ listPresenceStudent.totalLate }}
                            /
                            {{ listPresenceStudent.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        Alpa
                        <a class="float-right text-dark">
                          <b
                            >pelajar: ({{
                              listPresenceStudent.percentageAbsent
                            }}) - ({{ listPresenceStudent.totalAbsent }}
                            /
                            {{ listPresenceStudent.totalAttendance }})</b
                          >
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="periode-chart float-right">
                    <ul class="list-group list-group-unbordered">
                      <li class="list-group-item mb-1">
                        <a class="text-dark">
                          <b
                            >guru: ({{
                              listPresenceTeacher.percentagePresence
                            }}) - ({{ listPresenceTeacher.totalPresence }}
                            /
                            {{ listPresenceTeacher.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="text-dark">
                          <b
                            >guru: ({{
                              listPresenceTeacher.percentageEarlyOut
                            }}) - ({{ listPresenceTeacher.totalEarlyOut }}
                            /
                            {{ listPresenceTeacher.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="text-dark">
                          <b
                            >guru: ({{ listPresenceTeacher.percentageLate }}) -
                            ({{ listPresenceTeacher.totalLate }}
                            /
                            {{ listPresenceTeacher.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="text-dark">
                          <b
                            >guru: ({{ listPresenceTeacher.percentageAbsent }})
                            - ({{ listPresenceTeacher.totalAbsent }}
                            /
                            {{ listPresenceTeacher.totalAttendance }})</b
                          >
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="periode-chart float-right">
                    <ul class="list-group list-group-unbordered">
                      <li class="list-group-item mb-1">
                        <a class="float-right text-dark">
                          <b
                            >staff: ({{ listPresenceStaff.percentagePresence }})
                            - ({{ listPresenceStaff.totalPresence }}
                            /
                            {{ listPresenceStaff.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="float-right text-dark">
                          <b
                            >staff: ({{ listPresenceStaff.percentageEarlyOut }})
                            - ({{ listPresenceStaff.totalEarlyOut }}
                            /
                            {{ listPresenceStaff.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="float-right text-dark">
                          <b
                            >staff: ({{ listPresenceStaff.percentageLate }}) -
                            ({{ listPresenceStaff.totalLate }}
                            /
                            {{ listPresenceStaff.totalAttendance }})</b
                          >
                        </a>
                      </li>
                      <li class="list-group-item mb-1">
                        <a class="float-right text-dark">
                          <b
                            >staff: ({{ listPresenceStaff.percentageAbsent }}) -
                            ({{ listPresenceStaff.totalAbsent }}
                            /
                            {{ listPresenceStaff.totalAttendance }})</b
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
                  <select class="form-control" @change="loadDataActivePrecense">
                    <option>Kehadiran per/sekolah</option>
                  </select>
                </div>
              </div>
              <div class="list-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="school-information">
                      <ul
                        class="list-group list-group-unbordered"
                        v-if="activePresence.length > 0"
                      >
                        <li
                          class="list-group-item"
                          v-for="(item, index) in activePresence"
                          :key="`${index}-activeUser`"
                        >
                          <a class="float-left text-muted">
                            <b>{{ index + 1 }}</b>
                          </a>
                          <a class="ml-2">
                            {{ item.school_name.slice(0, 18) + "..." }}
                          </a>
                          <a class="float-right text-primary-blue">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
        </div>

        <div class="row mt-4">
          <!--  -->
          <div class="col-xl-9">
            <card header-classes="bg-transparent">
              <form @submit.prevent="submitChartDicipline">
                <div slot="header" class="header p-2">
                  <div class="information-posting d-flex align-items-center">
                    <div
                      class="label font-weight-bold text-dark"
                      style="font-size: 14px"
                    >
                      (%) Total kedisiplinan sekolah
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
                          v-model="filterDicipline"
                          required
                        >
                          <option value="lastyear">
                            Setahun terakhir
                          </option>
                          <option value="month">
                            Bulan
                          </option>
                          <option value="rangedate">
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
                        <div v-if="filterDicipline == 'lastyear'">
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
                              v-model="selectedMonthDicipline"
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
                              v-model="selectedYearDicipline"
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
                        <div v-if="filterDicipline == 'month'">
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
                              v-model="selectedMonthDicipline"
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
                              v-model="selectedYearDicipline"
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
                          v-if="filterDicipline == 'rangedate'"
                          class="d-flex align-items-center"
                        >
                          <div class="form-check mr-2 ml-2">
                            <label class="form-check-label" for="radio2">
                              <input
                                type="radio"
                                class="form-check-input"
                                id="radio2"
                                name="optradio"
                                value="option2"
                                checked
                              />Tanggal
                            </label>
                          </div>

                          <datepicker
                            class="my-datepicker"
                            input-class="form-control bg-white filter-datepicker_calendar"
                            placeholder="Tanggal Mulai"
                            v-model="selectedStartDateDicipline"
                            :format="formatDateDefault"
                            :calendar-class="`dashboard-datepicker`"
                            :required="true"
                            :readonly="false"
                          ></datepicker>
                          <datepicker
                            class="my-datepicker ml-2"
                            input-class="form-control bg-white filter-datepicker_calendar"
                            placeholder="Tanggal Akhir"
                            v-model="selectedEndDateDicipline"
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
              <div class="col-md-4">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      Peringkat pinjam/banyak :
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8">
                <div class="periode-chart">
                  <ul class="list-group list-group-unbordered">
                    <li class="list-group-item mb-1">
                      <a class="float-left text-dark">
                        <b>1.SMA 1 Ngoro: (2.389) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left text-dark">
                        <b>2.SD AL-HIDAYAH DLANGGU: (2.273) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left text-dark">
                        <b>3.SMA Rahman Arif: (2.189) </b>
                      </a>
                    </li>
                    <li class="list-group-item mb-1">
                      <a class="float-left text-dark">
                        <b>4.SD ISLAM DIPONEGORO: (1.217) </b>
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
              <div class="list-data">
                <div class="row">
                  <div class="col-md-12">
                    <div class="school-information text-center p-0">
                      <h5><b>(%) Kedisiplinan sekolah</b></h5>

                      <radial-progress-bar
                        class="rounded-circle radialbar-kedisiplinan mb-4 mt-4"
                        :diameter="200"
                        :completed-steps="completedStepKlastime"
                        :total-steps="totalStepKlassite"
                        startColor="#34B53A"
                        stopColor="#34B53A"
                        :innerStrokeWidth="10"
                        :strokeWidth="15"
                        innerStrokeColor="bg-transparent"
                      >
                        <p>{{ completedStepKlastime }}%</p>
                      </radial-progress-bar>
                    </div>
                    <div class="footer-information">
                      <div class="icon-information mb-3 text-center ml-2">
                        <img
                          style="width: 15px"
                          src="../../../assets/image/icons/green.svg"
                          alt=""
                        />
                        Tingkat kedisiplinan : {{ completedStepKlastime }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </base-header>
  </div>
</template>
<script>
// import Vue from "vue";
// import VueClipboard from "vue-clipboard2";
// import BTooltipDirective from "bootstrap-vue/esm/directives/tooltip";
// Vue.use(VueClipboard);
// export default {
//   directives: {
//     "b-tooltip": BTooltipDirective,
//   },
//   data() {
//     return {};
//   },
//   methods: {
//     onCopy() {
//       this.$notify({
//         type: "success",
//         title: "Copied to clipboard",
//       });
//     },
//   },
// };
//
</script>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
// import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import Datepicker from "vuejs-datepicker";
import { Chart } from "highcharts-vue";
import ModalPresentaseDashboardPerpustakaan from "../../../components/Goverment/Modal/ModalPresentaseDashboardPerpustakaan";
import RadialProgressBar from "vue-radial-progress";
import broker from "../../../utils/broker";
import { _ } from "vue-underscore";
let date = new Date();

// Tables
// import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
// import PageVisitsTable from "./Dashboard/PageVisitsTable";

export default {
  metaInfo: {
    title: "Dashboard Presensi",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    // LineChart,
    BarChart,
    Datepicker,
    RadialProgressBar,
    highcharts: Chart,
    "modal-presentase-dashboard": ModalPresentaseDashboardPerpustakaan,
    // PageVisitsTable,
    // SocialTrafficTable,
  },
  data() {
    return {
      loading: false,

      completedStepKlastime: 0,
      totalStepKlassite: 100,
      showModalPresentase: false,
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
      chartPie: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
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
            colors: ["#4AB8FF", "#0054FE"],
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
            data: [
              { name: "Tidak Meminjam", y: 60 },
              { name: "Peminjaman Buku", y: 40 },
            ],
          },
        ],
      },
      chartOptions: {
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
      chartPelajar: {
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
            colors: ["#0054FE", "#4AB8FF", "#FFB200", "#FF2E00"],
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
            data: Array,
          },
        ],
      },
      summaryCount: {
        presence: 0,
        late: 0,
        early_out: 0,
        absent: 0,
      },
      activePresence: [],
      filterPresence: "today",
      filterDicipline: "lastyear",
      selectedMonthDicipline: "",
      selectedYearDicipline: "",
      selectedStartDateDicipline: "",
      selectedEndDateDicipline: "",
      selectedMonth: "",
      selectedYear: "",
      selectedDate: "",
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

      // Filter Precense
      namePresence: ["Kehadiran", "Keluar awal", "Terlambat", "Alpa"],
      filterPresenceStat: "rangedate",
      selectedMonthPresence: "",
      selectedYearPresence: "",
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
      filterSectionPresence: "studentPresence",
      progressbarPresence: {
        percentagePresence: 0,
        percentageEarlyOut: 0,
        percentageLate: 0,
        percentageAbsent: 0,
      },
      listPresenceStudent: {
        totalAttendance: 0,
        totalPresence: 0,
        percentagePresence: 0,
        totalEarlyOut: 0,
        percentageEarlyOut: 0,
        totalLate: 0,
        percentageLate: 0,
        totalAbsent: 0,
        percentageAbsent: 0,
      },

      listPresenceTeacher: {
        totalAttendance: 0,
        totalPresence: 0,
        percentagePresence: 0,
        totalEarlyOut: 0,
        percentageEarlyOut: 0,
        totalLate: 0,
        percentageLate: 0,
        totalAbsent: 0,
        percentageAbsent: 0,
      },

      listPresenceStaff: {
        totalAttendance: 0,
        totalPresence: 0,
        percentagePresence: 0,
        totalEarlyOut: 0,
        percentageEarlyOut: 0,
        totalLate: 0,
        percentageLate: 0,
        totalAbsent: 0,
        percentageAbsent: 0,
      },
    };
  },
  methods: {
    async initBigChart(index) {
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

    async loadDataSummaryKlastime() {
      this.loading = true;

      let self = this;
      self.$Progress.start();
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/summary`;

      self.summaryCount.presence = 0;
      self.summaryCount.late = 0;
      self.summaryCount.early_out = 0;
      self.summaryCount.absent = 0;

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          self.summaryCount.presence = 0;
          self.summaryCount.late = 0;
          self.summaryCount.early_out = 0;
          self.summaryCount.absent = 0;

          if (res.data.data) {
            self.summaryCount.presence = res.data.data.presence;
            self.summaryCount.late = res.data.data.late;
            self.summaryCount.early_out = res.data.data.early_out;
            self.summaryCount.absent = res.data.data.absent;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },

    async loadDataActivePrecense() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/attendance/statistic?filter=${self.filterPresence}`;

      self.activePresence = [];

      await broker.fetch
        .get(endPoint)
        .then((res) => {
          let flag = 0;
          if (res.data.data) {
            res.data.data.forEach((item) => {
              if (flag < 10) {
                self.activePresence.push(item);
                flag++;
              }
              self.$Progress.finish();
            });
          }
        })
        .catch(() => {});
    },

    async loadDataPercentageKlassite() {
      let self = this;
      self.$Progress.start();

      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/dicipline/percentage`;

      self.completedStepKlastime = 0;

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          let klassite = res.data.data;

          self.completedStepKlastime = parseFloat(klassite.percentage);
        }
      });
    },

    async submitChartDicipline() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/dicipline/chart?filter=${self.filterDicipline}`;

      if (self.filterDicipline == "month") {
        if (
          self.selectedMonthDicipline == "" ||
          self.selectedYearDicipline == ""
        ) {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthDicipline);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearDicipline}`;
        }
      } else if (self.filterDicipline == "rangedate") {
        if (self.selectedDateDicipline == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&start_date=${self.formatDateDefault(
            self.selectedStartDateDicipline
          )}`;

          endPoint += `&end_date=${self.formatDateDefault(
            self.selectedEndDateDicipline
          )}`;
        }
      }

      self.chartOptions.xAxis.categories = [];
      self.chartOptions.series[0].data = [];

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          res.data.data.forEach((item) => {
            let text = "-";
            let dataTotal = item.total_attendance;

            if (self.filterDicipline == "lastyear") {
              text = item.month + "/" + item.year;
            } else if (self.filterDicipline == "month") {
              text = item.date;
            } else if (self.filterDicipline == "rangedate") {
              text = item.time;
            }
            self.chartOptions.xAxis.categories.push(text);
            self.chartOptions.series[0].data.push(dataTotal);
          });
        }
      });
    },

    async submitChartPrecense() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/klastime/attendance/chart?filter=${self.filterPresenceStat}`;

      if (self.filterPresenceStat == "month") {
        if (
          self.selectedMonthPresence == "" ||
          self.selectedYearPresence == ""
        ) {
          self.$Swal.fire("Alert!", "Bulan dan tahun diperlukan", "warning");
        } else {
          let indexMonth = _.indexOf(self.month, self.selectedMonthPresence);
          indexMonth += 1;
          endPoint += `&month=${indexMonth}&year=${self.selectedYearPresence}`;
        }
      } else if (self.filterPresenceStat == "rangedate") {
        if (self.filterPresenceStat == "") {
          self.$Swal.fire("Alert!", "Tanggal diperlukan.", "warning");
        } else {
          endPoint += `&start_date=${self.formatDateDefault(
            self.selectedStartDatePresence
          )}`;

          endPoint += `&end_date=${self.formatDateDefault(
            self.selectedEndDatePresence
          )}`;
        }
      }

      self.chartPelajar.series[0].data = [];
      self.progressbarPresence.percentagePresence = 0;
      self.progressbarPresence.percentageEarlyOut = 0;
      self.progressbarPresence.percentageLate = 0;
      self.progressbarPresence.percentageAbsent = 0;

      // List presence student
      self.listPresenceStudent.totalAttendance = 0;
      self.listPresenceStudent.totalPresence = 0;
      self.listPresenceStudent.percentagePresence = 0;
      self.listPresenceStudent.totalEarlyOut = 0;
      self.listPresenceStudent.percentageEarlyOut = 0;
      self.listPresenceStudent.totalLate = 0;
      self.listPresenceStudent.percentageLate = 0;
      self.listPresenceStudent.totalAbsent = 0;
      self.listPresenceStudent.percentageAbsent = 0;
      // List presence student

      // List presence teacher
      self.listPresenceTeacher.totalAttendance = 0;
      self.listPresenceTeacher.totalPresence = 0;
      self.listPresenceTeacher.percentagePresence = 0;
      self.listPresenceTeacher.totalEarlyOut = 0;
      self.listPresenceTeacher.percentageEarlyOut = 0;
      self.listPresenceTeacher.totalLate = 0;
      self.listPresenceTeacher.percentageLate = 0;
      self.listPresenceTeacher.totalAbsent = 0;
      self.listPresenceTeacher.percentageAbsent = 0;
      // List presence teacher

      // List presence staff
      self.listPresenceStaff.totalAttendance = 0;
      self.listPresenceStaff.totalPresence = 0;
      self.listPresenceStaff.percentagePresence = 0;
      self.listPresenceStaff.totalEarlyOut = 0;
      self.listPresenceStaff.percentageEarlyOut = 0;
      self.listPresenceStaff.totalLate = 0;
      self.listPresenceStaff.percentageLate = 0;
      self.listPresenceStaff.totalAbsent = 0;
      self.listPresenceStaff.percentageAbsent = 0;
      // List presence staff

      await broker.fetch.get(endPoint).then((res) => {
        if (res.data.data) {
          // List Presence Student
          self.listPresenceStudent.totalAttendance =
            res.data.data[0].student.total_attendance;
          self.listPresenceStudent.totalPresence =
            res.data.data[0].student.total_presence;
          self.listPresenceStudent.percentagePresence =
            res.data.data[0].student.percentage_presence;
          self.listPresenceStudent.totalEarlyOut =
            res.data.data[0].student.total_early_out;
          self.listPresenceStudent.percentageEarlyOut =
            res.data.data[0].student.percentage_early_out;
          self.listPresenceStudent.totalLate =
            res.data.data[0].student.total_late;
          self.listPresenceStudent.percentageLate =
            res.data.data[0].student.percentage_late;
          self.listPresenceStudent.totalAbsent =
            res.data.data[0].student.total_absent;
          self.listPresenceStudent.percentageAbsent =
            res.data.data[0].student.percentage_absent;

          // List Presence Teacher
          self.listPresenceTeacher.totalAttendance =
            res.data.data[0].teacher.total_attendance;
          self.listPresenceTeacher.totalPresence =
            res.data.data[0].teacher.total_presence;
          self.listPresenceTeacher.percentagePresence =
            res.data.data[0].teacher.percentage_presence;
          self.listPresenceTeacher.totalEarlyOut =
            res.data.data[0].teacher.total_early_out;
          self.listPresenceTeacher.percentageEarlyOut =
            res.data.data[0].teacher.percentage_early_out;
          self.listPresenceTeacher.totalLate =
            res.data.data[0].teacher.total_late;
          self.listPresenceTeacher.percentageLate =
            res.data.data[0].teacher.percentage_late;
          self.listPresenceTeacher.totalAbsent =
            res.data.data[0].teacher.total_absent;
          self.listPresenceTeacher.percentageAbsent =
            res.data.data[0].teacher.percentage_absent;

          // List Presence Staff
          self.listPresenceStaff.totalAttendance =
            res.data.data[0].staff.total_attendance;
          self.listPresenceStaff.totalPresence =
            res.data.data[0].staff.total_presence;
          self.listPresenceStaff.percentagePresence =
            res.data.data[0].staff.percentage_presence;
          self.listPresenceStaff.totalEarlyOut =
            res.data.data[0].staff.total_early_out;
          self.listPresenceStaff.percentageEarlyOut =
            res.data.data[0].staff.percentage_early_out;
          self.listPresenceStaff.totalLate = res.data.data[0].staff.total_late;
          self.listPresenceStaff.percentageLate =
            res.data.data[0].staff.percentage_late;
          self.listPresenceStaff.totalAbsent =
            res.data.data[0].staff.total_absent;
          self.listPresenceStaff.percentageAbsent =
            res.data.data[0].staff.percentage_absent;

          if (self.filterSectionPresence == "studentPresence") {
            let tempData = [
              {
                name: "Kehadiran",
                y: parseFloat([res.data.data[0].student.percentage_presence]),
              },
              {
                name: "Keluar awal",
                y: parseFloat([res.data.data[0].student.percentage_early_out]),
              },
              {
                name: "Terlambat",
                y: parseFloat([res.data.data[0].student.percentage_late]),
              },
              {
                name: "Alpa",
                y: parseFloat([res.data.data[0].student.percentage_absent]),
              },
            ];
            tempData.forEach((i) => {
              self.chartPelajar.series[0].data.push(i);
            });

            self.progressbarPresence.percentagePresence =
              res.data.data[0].student.percentage_presence;
            self.progressbarPresence.percentageEarlyOut =
              res.data.data[0].student.percentage_early_out;
            self.progressbarPresence.percentageLate =
              res.data.data[0].student.percentage_late;
            self.progressbarPresence.percentageAbsent =
              res.data.data[0].student.percentage_absent;

            //
          } else if (self.filterSectionPresence == "teacherPresence") {
            let tempData = [
              {
                name: "Kehadiran",
                y: parseFloat([res.data.data[0].teacher.percentage_presence]),
              },
              {
                name: "Keluar awal",
                y: parseFloat([res.data.data[0].teacher.percentage_early_out]),
              },
              {
                name: "Terlambat",
                y: parseFloat([res.data.data[0].teacher.percentage_late]),
              },
              {
                name: "Alpa",
                y: parseFloat([res.data.data[0].teacher.percentage_absent]),
              },
            ];
            tempData.forEach((i) => {
              self.chartPelajar.series[0].data.push(i);
            });
            self.progressbarPresence.percentagePresence =
              res.data.data[0].teacher.percentage_presence;
            self.progressbarPresence.percentageEarlyOut =
              res.data.data[0].teacher.percentage_early_out;
            self.progressbarPresence.percentageLate =
              res.data.data[0].teacher.percentage_late;
            self.progressbarPresence.percentageAbsent =
              res.data.data[0].teacher.percentage_absent;
          } else {
            let tempData = [
              {
                name: "Kehadiran",
                y: parseFloat([res.data.data[0].staff.percentage_presence]),
              },
              {
                name: "Keluar awal",
                y: parseFloat([res.data.data[0].staff.percentage_early_out]),
              },
              {
                name: "Terlambat",
                y: parseFloat([res.data.data[0].staff.percentage_late]),
              },
              {
                name: "Alpa",
                y: parseFloat([res.data.data[0].staff.percentage_absent]),
              },
            ];
            tempData.forEach((i) => {
              self.chartPelajar.series[0].data.push(i);
            });
            self.progressbarPresence.percentagePresence =
              res.data.data[0].staff.percentage_presence;
            self.progressbarPresence.percentageEarlyOut =
              res.data.data[0].staff.percentage_early_out;
            self.progressbarPresence.percentageLate =
              res.data.data[0].staff.percentage_late;
            self.progressbarPresence.percentageAbsent =
              res.data.data[0].staff.percentage_absent;
          }

          // let text = "-";
          // let dataTotal = item.total_attendance;

          // if (self.filterPresenceStat == "lastyear") {
          //   text = item.month + "/" + item.year;
          // } else if (self.filterPresenceStat == "month") {
          //   text = item.date;
          // } else if (self.filterPresenceStat == "rangedate") {
          //   text = item.time;
          // }
          // console.log("temp", tempData);
          // self.chartPelajar.series[0].data.push(tempData);
        }
      });
    },

    async getData() {
      await this.initBigChart(0);
      await this.loadDataSummaryKlastime();
      await this.submitChartDicipline();
      await this.loadDataActivePrecense();
      await this.loadDataPercentageKlassite();
      await this.submitChartPrecense();
    },
  },
  mounted() {
    this.getData();
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
};
</script>
<style scoped>
.highcharts-figure,
.highcharts-data-table table {
  min-width: 200px;
  max-width: 660px;
  margin: 1em auto;
}
</style>
