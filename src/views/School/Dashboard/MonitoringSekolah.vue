<template>
  <div>
    <base-header type="gradient-success" class="mb-4 pt-md-7">
      <div class="row">
        <div class="col-xl-12">
          <div class="header-school d-flex align-items-center">
            <label for="sekolah" class="mt-2">SEKOLAH</label>
            <input
              id="sekolah"
              type="text"
              name="table_search"
              class="form-control input-search ml-3"
              placeholder="Ketik pencarian..."
            />
            <select class="form-control w-25 ml-3">
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SD">SD</option>
              <option value="SMK">SMK</option>
            </select>

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
                      >25 dari <span class="text-primary">1931</span> data
                      sekolah ditampilkan</b
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
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SD">SD</option>
                      <option value="SMK">SMK</option>
                    </select>
                    <select class="form-control ml-2 mr-2">
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SD">SD</option>
                      <option value="SMK">SMK</option>
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
                        <th scope="col">Sekolah</th>
                        <th scope="col">Status</th>
                        <th scope="col">Guru & Staff</th>
                        <th scope="col">Pelajar</th>
                        <th scope="col">Sosial Media</th>
                        <th scope="col">Website</th>
                        <th scope="col">Alamat</th>
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
                        <td>-</td>
                        <td>
                          <router-link class="action-detail" to=""
                            >Lihat detail</router-link
                          >
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
                        <td>-</td>
                        <td>@mdo</td>
                        <td>
                          <router-link class="action-detail" to=""
                            >Lihat detail</router-link
                          >
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
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <router-link class="action-detail" to=""
                            >Lihat detail</router-link
                          >
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
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <router-link class="action-detail" to=""
                            >Lihat detail</router-link
                          >
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <router-link
                            class="action-detail"
                            to="detail/sekolah/1"
                            >Lihat detail</router-link
                          >
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>
                          <router-link
                            class="action-detail"
                            to="detail/sekolah/1"
                            >Lihat detail</router-link
                          >
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
export default {
  name: "MonitoringSekolah",
};
</script>
