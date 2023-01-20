<template>
  <div>
    <base-header type="gradient-success" class="mb-4 pt-md-7">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <label for="sekolah" class="mt-2">Tugas</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
            />
            <select class="form-control ml-3" style="width:150px">
              <option>Semua Grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select>

            <a
              type="button"
              @click="showModalPresentase = true"
              class="btn-materi bg-white pt-2 pb-2 pl-3 pr-3 ml-3"
            >
              <img src="../../../assets/image/icons/materi.png" alt="" /> (%)
              Tugas
            </a>
            <modal-presentase-tugas
              v-if="showModalPresentase"
              class="overlay"
              @close="showModalPresentase = false"
            ></modal-presentase-tugas>

            <!-- <div class="next-filter ml-auto">
              <button class="btn btn-outline-primary">Filter lanjutan</button>
            </div> -->
          </div>
        </div>
      </div>
    </base-header>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <card header-classes="bg-transparent">
            <div class="row d-flex align-items-center">
              <div class="col-3">
                <div class="header-table d-flex align-items-center">
                  <div class="information-data">
                    <b
                      >25 dari <span class="text-primary">1931</span> data tugas
                      ditampilkan</b
                    >
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="header-filter-table d-flex align-items-center ">
                  <form action="" class="d-flex align-items-center ml-auto">
                    <label class="checkbox-inline d-flex align-items-center">
                      <input type="checkbox" class="mr-2" value="" />Tampilkan
                      hanya:
                    </label>
                    <select class="form-control ml-2">
                      <option>Mapel</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option value="sejarah">Sejarah</option>
                      <option value="biologi">Biologi</option>
                      <option value="Agama Islam">Agama Islam</option>
                    </select>
                    <button class="btn btn-outline-primary">Tetapkan</button>
                  </form>
                  <div class="total-data ml-3 mr-2">
                    <b><span class="text-primary">10</span> / 2117</b>
                  </div>
                  <ul class="pagination justify-content-end mt-3">
                    <li class="page-item" v-if="prevLink">
                      <a
                        class="page-link pl-3 pr-3"
                        href="javascript:;"
                        @click="loadData(prevLink)"
                      >
                        <i class="fas fa-angle-left"></i>
                      </a>
                    </li>
                    <li class="page-item disabled" v-else>
                      <a
                        class="page-link pl-3 pr-3"
                        href="javascript:;"
                        aria-disabled="true"
                      >
                        <i class="fas fa-angle-left"></i>
                      </a>
                    </li>

                    <li class="page-item ml-2" v-if="nextLink">
                      <a
                        class="page-link pl-3 pr-3"
                        href="javascript:;"
                        @click="loadData(nextLink)"
                      >
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="page-item disabled ml-2" v-else>
                      <a
                        class="page-link pl-3 pr-3"
                        href="javascript:;"
                        aria-disabled="true"
                      >
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="table-information table-responsive">
                  <table class="table table-hover">
                    <thead class="bg-dark text-white">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Judul Tugas</th>
                        <th scope="col">Mapel</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Jurusan</th>
                        <th scope="col">Diupload</th>
                        <th scope="col">Dikerjakan</th>
                        <th scope="col">Sekolah</th>
                        <th scope="col">Aksi</th>
                        <th scope="col">
                          <button
                            type="button"
                            class=" btn btn-sm bg-yellow text-white"
                            title="Cetak data"
                          >
                            <i class="fas fa-print"></i>
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <a
                            class="action-detail"
                            type="button"
                            @click="showModel = true"
                            >Detail</a
                          >
                          <modal-detail-tugas
                            v-if="showModel"
                            @close="showModel = false"
                          ></modal-detail-tugas>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <a
                            class="action-detail"
                            type="button"
                            @click="showModel = true"
                            >Detail</a
                          >
                          <modal-detail-tugas
                            v-if="showModel"
                            @close="showModel = false"
                          ></modal-detail-tugas>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>33</td>
                        <td>@mdo</td>
                        <td>
                          <a
                            class="action-detail"
                            type="button"
                            @click="showModel = true"
                            >Detail</a
                          >
                          <modal-detail-tugas
                            v-if="showModel"
                            @close="showModel = false"
                          ></modal-detail-tugas>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <div class="non-active ">
                            <i
                              class="fas fa-exclamation-triangle text-danger mr-1"
                              >31</i
                            >
                            <span>/ 33</span>
                          </div>
                        </td>
                        <td>@mdo</td>

                        <td>
                          <a
                            type="button"
                            class="action-detail"
                            @click="showModel = true"
                            >Detail</a
                          >
                          <modal-detail-tugas
                            v-if="showModel"
                            class="overlay"
                            @close="showModel = false"
                          ></modal-detail-tugas>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
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
import ModalDetailTugas from "../../../components/School/Modal/ModalDetailTugas";
import ModalPresentaseTugas from "../../../components/School/Modal/ModalPresentaseTugas";
export default {
  name: "MonitoringTugas",
  components: {
    "modal-detail-tugas": ModalDetailTugas,
    "modal-presentase-tugas": ModalPresentaseTugas,
  },
  data() {
    return {
      showModel: false,
      showModalPresentase: false,
    };
  },
};
</script>
