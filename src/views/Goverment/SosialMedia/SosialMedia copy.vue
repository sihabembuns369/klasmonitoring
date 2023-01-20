<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="notification-refresh border p-2 mb-4">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <div class="logo-notification">
              <img src="../../../assets/image/logo/Logo-Onklas.png" alt="" />
              POSTING ONKLAS
            </div>
            <div class="information-notification ml-auto">
              <a href="javascript:;">
                <span> Muat Ulang </span>
              </a>
              <button
                type="button"
                class="btn-sync ml-1 bg-success"
                title="Sinkrokinsasi Data"
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
            to="/sosial-media/total-data"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../assets/image/icons/total_data.svg" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                -
              </div>
              <div class="statistic-information text-muted">
                Total Data
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/sosial-media/postingan"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img
                src="../../../assets/image/icons/postingan_pelajar.svg"
                alt=""
              />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                -
              </div>
              <div class="statistic-information text-muted">
                Postingan
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/sosial-media/ebook"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../assets/image/icons/posting_ebook.svg" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                -
              </div>
              <div class="statistic-information text-muted">
                Posting E-Book
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-xl-3 col-lg-6">
          <router-link
            to="/sosial-media/hastag"
            class="card d-flex flex-row align-items-center p-3"
          >
            <div class="card-logo">
              <img src="../../../assets/image/icons/hastag.svg" alt="" />
            </div>
            <div class="statistic ml-4">
              <div class="statistic-calculation font-weight-bold text-dark">
                -
              </div>
              <div class="statistic-information text-muted">
                Hastag
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--8">
      <div class="row mt-4">
        <div class="col-xl-12">
          <card header-classes="bg-transparent ">
            <div class="sosial-media">
              <form action="">
                <div class="row d-flex align-items-center">
                  <div class="col-sm-1">
                    <label class="font-size-13 text-dark font-weight-bold">
                      PERINGKAT
                    </label>
                  </div>
                  <div class="col-sm-3">
                    <select
                      class="form-control filter-assignment w-100 mr-auto"
                      v-model="filterSosialMedia"
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
                  <div class="col-sm-3 ">
                    <div class="row d-flex align-items-center">
                      <div class="col-sm-2">
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
                  <div class="col-sm-5 ">
                    <div class="row d-flex align-items-center">
                      <div class="col-sm-2">
                        <label class="form-check-label font-size-12">
                          Hingga:
                        </label>
                      </div>
                      <div class="col-sm-6">
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
                      <div class="col-sm-4">
                        <button type="submit" class="btn w-100 font-size-12 btn-outline-primary">
                          TETAPKAN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div class="row mt-3">
                <div class="col-md-8 col-sm-8 col-xs-12 col-lg-8 ">
                  <div class="row">
                    <div class="col-md-4 p-2">
                      <div
                        class="rating-sosmed border pl-2 pr-2  pt-4 pb-4 text-center"
                      >
                        <img
                          src="../../../assets/image/icons/medal_one.svg"
                          alt=""
                        />
                        <br />
                        <label
                          for="medalOne"
                          class="font-weight-bold text-dark"
                        >
                          Peringkat 1
                        </label>
                        <p class="font-size-14 border-bottom">
                          SMP SULTAN AGUNG
                        </p>
                        <span class="font-size-14">Jumlah Post:</span>
                        <p class="font-size-16 text-dark font-weight-bold">
                          344
                        </p>
                      </div>
                    </div>
                    <div class="col-md-4 p-2">
                      <div
                        class="rating-sosmed   border pl-2 pr-2 pt-4 pb-4 text-center"
                      >
                        <img
                          src="../../../assets/image/icons/medal_two.svg"
                          alt=""
                        />
                        <br />
                        <label
                          for="medalOne"
                          class="font-weight-bold text-dark"
                        >
                          Peringkat 2
                        </label>
                        <p class="font-size-14 border-bottom">
                          SMP SULTAN AGUNG
                        </p>
                        <span class="font-size-14">Jumlah Post:</span>
                        <p class="font-size-16 text-dark font-weight-bold">
                          344
                        </p>
                      </div>
                    </div>
                    <div class="col-md-4 p-2">
                      <div
                        class="rating-sosmed border pl-2 pr-2  pt-4 pb-4 text-center"
                      >
                        <img
                          src="../../../assets/image/icons/medal_three.svg"
                          alt=""
                        />
                        <br />
                        <label
                          for="medalOne"
                          class="font-weight-bold text-dark"
                        >
                          Peringkat 3
                        </label>
                        <p class="font-size-14 border-bottom">
                          SMP SULTAN AGUNG
                        </p>
                        <span class="font-size-14">Jumlah Post:</span>
                        <p class="font-size-16 text-dark font-weight-bold">
                          344
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-12 col-lg-4">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12 p-2">
                      <div class="school-information">
                        <ul class="list-group mb-2 list-group-unbordered">
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              5. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              6. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              7. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              8. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              9. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                          <li class="list-group-item font-size-14 mb-1">
                            <a class="float-left text-muted">
                              10. SMA Kemala Bhayangkari
                            </a>

                            <a class="float-right text-primary">
                              <b>(20)</b>
                            </a>
                          </li>
                        </ul>

                        <button class="btn btn-block btn-outline-primary">
                          LIHAT LEBIH BANYAK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
let date = new Date();

export default {
  metaInfo: {
    title: "Dashboard Sosial Media",
    titleTemplate: "%s | Pemerintah",
  },
  components: {
    Datepicker,
  },
  data() {
    return {
      filterSosialMedia: "school",
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
};
</script>
