<template>
  <div class="container">
    <base-header type="gradient-success" class="mb-4 pt-md-7">
      <div class="row">
        <div class="col-12 col-md-12 mb-3 d-flex aling-items-center">
          <router-link
            :to="`/monitoring/sekolah`"
            class="btn button-terapkan btn-outline-primary"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            Kembali
          </router-link>
          <button
            class="btn button-terapkan btn-outline-primary ml-auto"
            @click="printDocument"
          >
            Cetak
          </button>
        </div>
      </div>
    </base-header>
    <div class="row">
      <div class="col-md-12">
        <card header-classes="bg-transparent">
          <vue-html2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="false"
            :preview-modal="true"
            :paginate-elements-by-height="3000"
            filename="monitoring_sekolah"
            :pdf-quality="2"
            :manual-pagination="false"
            :html-to-pdf-options="htmlToPdfOptions"
            pdf-format="a4"
            pdf-orientation="portrait"
            pdf-content-width="100%"
            ref="html2Pdf"
            class="print-pdf"
          >
            <section slot="pdf-content">
              <section class="header mt-5">
                <div class="row">
                  <div class="col-md-12">
                    <div class="header-vektor text-right"></div>
                  </div>
                </div>
                <div class="container container-border">
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        class="header-invoice font-lato d-flex align-items-center"
                      >
                        <h1 class="mt-2 text-uppercase">
                          {{ $route.meta.title }}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="information-invoice">
                <div class="container">
                  <!--  -->
                  <div class="row">
                    <div class="col-md-6">
                      <!-- <table
                        class="table table-borderless table-custome-payment font-lato"
                      >
                        <thead>
                          <tr>
                            <th colspan="2">
                              <h5>REKAP TAGIHAN</h5>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="width: 30%;">Kelas / Jur:</td>
                          </tr>
                          <tr>
                            <td>Total pelajar :</td>
                            <td class="text-right information-text"></td>
                          </tr>
                        </tbody>
                      </table> -->
                    </div>
                    <!-- <div class="col-md-6">
                      <table
                        class="table table-borderless table-custome-payment font-lato mt-4"
                      >
                        <thead>
                          <tr>
                            <th colspan="2">
                              <h5>KETERANGAN</h5>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Tagihan:</td>
                            <td class="text-right information-text">
                              Pembayaran (SPP)
                            </td>
                          </tr>
                          <tr>
                            <td>Periode :</td>
                          </tr>
                        </tbody>
                      </table>
                    </div> -->
                  </div>
                  <!--  -->
                  <div class="row">
                    <div class="col-md-12">
                      <div class="header-detail-table font-lato">
                        <h5>DAFTAR SEKOLAH</h5>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-information table-responsive">
                        <table class="table border table-hover">
                          <thead class="bg-dark text-white">
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Sekolah</th>
                              <!-- <th scope="col">Status</th> -->
                              <th scope="col">Guru & Staff</th>
                              <th scope="col">Pelajar</th>

                              <th scope="col">Alamat</th>
                            </tr>
                          </thead>
                          <tbody v-if="searchLoading">
                            <tr>
                              <td valign="top" colspan="10" class="text-center">
                                Mengambil data . . .
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-if="!searchLoading && school.length == 0">
                            <tr>
                              <td valign="top" colspan="10" class="text-center">
                                Tidak ditemukan data yang sesuai.
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr
                              v-for="(item, index) in school"
                              :key="`${index}-school`"
                            >
                              <th scope="row">{{ index + 1 }}</th>
                              <td>{{ item.name }}</td>
                              <!-- <td>Otto</td> -->
                              <td class="text-center">
                                {{ item.teacher_staff }}
                              </td>
                              <td class="text-center">{{ item.student }}</td>

                              <td>{{ item.address }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!--  -->

                  <!--  -->
                </div>
              </section>
            </section>
          </vue-html2pdf>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
import broker from "../../../../utils/broker";
import { _ } from "vue-underscore";

export default {
  data() {
    return {
      showModel: false,
      modalVisible: false,
      modalData: null,
      showModalPresentase: false,
      school: [],
      searchParams: "",
      nextLink: null,
      prevLink: null,
      sequence: 0,
      searchLoading: true,
      totalData: 0,
      toTotalData: 0,
      limit: 0,
      htmlToPdfOptions: {
        margin: 0,
        image: {
          type: "jpeg",
          quality: 0.99,
        },
        html2canvas: {
          // letterRendering: true,
          // allowTaint: true,
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["avoid-all", "css"],
        },
      },
    };
  },
  components: {
    VueHtml2pdf,
  },

  methods: {
    printDocument() {
      this.$refs.html2Pdf.generatePdf();
    },
    loadData(url = null) {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school?limit=${self.limit}`;

      if (url) {
        endPoint = url;
      }

      self.student = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.searchLoading = false;
          self.school = [];

          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.school.push(item);
            });
          }
          if (res.data.links) {
            self.prevLink = res.data.links.prev;
            self.nextLink = res.data.links.next;
          }
          if (res.data.meta) {
            self.sequence = res.data.meta.from - 1;
            self.totalData = res.data.meta.total;
            self.toTotalData = res.data.meta.to;
          }
        })
        .catch(() => {});
    },

    refreshData() {
      this.showModel = false;
      this.showModalPresentase = false;
      this.school = [];
      this.searchParams = "";
      this.nextLink = null;
      this.prevLink = null;
      this.sequence = 0;
      this.searchLoading = true;
      this.totalData = 0;
      this.toTotalData = 0;
    },
    waitSearch() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/school?${self.limit}`;
      if (self.searchParams != null && self.searchParams != "") {
        endPoint += `&q=${self.searchParams}`;
      }
      self.searchLoading = true;
      self.loadData(endPoint);
    },
  },
  created() {
    this.debounceSearch = _.debounce(this.waitSearch, 1000);
  },
  activated() {},
  mounted() {
    this.loadData();
    this.refreshData();
  },
  watch: {
    searchParams() {
      this.debounceSearch();
    },
  },
};
</script>
<style scrope>
/* .container-border {
    border: 1px solid #000000;
    } */
. .font-lato {
  font-family: "Lato", sans-serif;
}

.header-vektor {
  position: absolute;
  width: 242px;
  height: 45px;
  right: 15px;
  margin-top: -48px !important;
  top: 0;
  border-top: 100px solid #1397d2;
  border-left: 400px solid transparent;
}

/* .header-vektor img {
			width: 500px;
			height: 80px;
		} */

.header-invoice img {
  width: 80px;
  height: 80px;
}

.header-invoice h1 {
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  letter-spacing: 0.025em;
  color: #2c2c2c;
}

.information-invoice {
  margin-top: 35px;
  font-size: 12px;
}

.information-invoice .table-custome-payment thead tr th {
  padding: 0 !important;
  background-color: #f4f6f9;
  border: 0px;
}

.information-invoice .table-custome-payment tbody tr td {
  padding: 0 !important;
}

.information-invoice .status-invoice h5 {
  color: #0076ab;
  font-weight: bold;
}

.information-invoice .table .invoice-status-check {
  border: 2px solid #20e700;
  border-radius: 20px;
  color: #20e700;
  font-weight: bold;
}

.information-invoice tr th h5 {
  color: #0076ab;
  font-weight: bold;
}

.information-invoice .table th,
.information-invoice .table td {
  padding: 5px;
}

.header-detail-table h5 {
  color: #0076ab;
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  margin-top: 20px;
}

.information-invoice .table-custome thead {
  background: #1397d2 !important;
  color: #ffffff;
  font-weight: bold;
}

.information-invoice .table-custome tbody td {
  color: #000000;
  font-weight: bold;
}

.information-invoice .table-custome tbody td .forfeit {
  border: 1px solid #000000;
  color: #ff0000;
  border: 1px solid #ff1010;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 10px;
}

.information-invoice .table-custome tbody td .piece {
  border: 1px solid #000000;
  color: #20e700;
  border: 1px solid #20e700;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 10px;
}

.information-invoice .information-text {
  color: #000000;
  font-weight: bold;
}

.footer {
  margin-top: 100px;
  font-size: 16px !important;
}

.footer ul {
  list-style: none;
}

.footer ul li {
  text-decoration: none;
}

.vue-html2pdf {
  padding: 0 10px 0 10px;
}

@media print {
  .btn-print {
    display: none;
  }

  .information-invoice .table-custome thead {
    background-color: #1397d2 !important;
    color: #000000;
    font-weight: bold;
    -webkit-print-color-adjust: exact;
  }

  .page-break {
    display: block;
    page-break-before: always;
  }
}
</style>
