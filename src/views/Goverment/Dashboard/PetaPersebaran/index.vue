<template>
  <div>
    <div class="notification-refresh border p-2 mt-4">
      <div class="row">
        <div class="col-md-12 d-flex align-items-center">
          <div class="logo-notification">
            <img
              lazy="loading"
              v-once
              src="../../../../assets/image/logo/PersebaranPeta.png"
              alt="persebaran peta"
            />
            <span>PERSEBARAN PETA</span>
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
                    class="filter mapping d-flex align-items-center mt-3 float-right text-muted w-100"
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
            <div class="col-md-12 map-indonesia" v-if="filterMap == 'teacher'">
              <!--
                  Validasi ketika scopeType sama dengan province dia akan menampilkan
                  data province dengan marker kota dari province tersebut
                 -->
              <template v-if="$store.state.scopeType == 'province'">
                <l-map
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
                            src="../../../../assets/image/icons/box-green-one.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../../../assets/image/icons/box-green-two.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../../../assets/image/icons/box-green-three.svg"
                            alt="data"
                            lazy="loading"
                            v-once
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
                            src="../../../../assets/image/icons/box-black.svg"
                            alt="bidang studi"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Guru per/mapel</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </template>
              <!--
                  Jika validasi scopeType sama dengan city dia akan menampilkan
                  data sub_district dengan marker kota dari city tersebut
                 -->
              <template v-else>
                <l-map
                  @update:center="centerUpdate"
                  :options="{ zoomControl: false }"
                  :zoom="zoomSubdistrict"
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
                          <span class="text-muted">{{
                            item.sub_district_name
                          }}</span>
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
                            src="../../../../assets/image/icons/box-green-one.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../../../assets/image/icons/box-green-two.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-green-three.svg"
                            alt="data"
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
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-black.svg"
                            alt="bidan studi"
                          />
                          <span class="ml-2 text-dark">Guru per/mapel</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </template>
            </div>
            <div class="col-md-12 map-indonesia" v-else>
              <!--
                  Validasi ketika scopeType sama dengan province dia akan menampilkan
                  data province dengan marker kota dari province tersebut
                 -->
              <template v-if="$store.state.scopeType == 'province'">
                <l-map
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
                    :key="`${index}-listCityTeacher`"
                    :lat-lng="latLng(item.latitude, item.longitude)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-guru"
                    >
                      <div class="headline rounded-circle">
                        {{ item.teacher }}
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
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>
                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCitySchool`"
                    :lat-lng="latLng(item.latitude, item.longitude - 0.11)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-sekolah"
                    >
                      <div class="headline rounded-circle">
                        {{ item.school }}
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
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>
                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCityStudent`"
                    :lat-lng="latLng(item.latitude, item.longitude - 0.22)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-murid"
                    >
                      <div class="headline rounded-circle">
                        {{ item.student }}
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
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
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
                            src="../../../../assets/image/icons/box-green-one.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../../../assets/image/icons/box-green-two.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-green-three.svg"
                            alt="data"
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
                            src="../../../../assets/image/icons/box-yellow.png"
                            alt="jumlah guru"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Jumlah Guru</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            src="../../../../assets/image/icons/box-blue.png"
                            alt="jumlah sekolah"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Jumlah Sekolah</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-pink.png"
                            alt="jumlah murid"
                          />
                          <span class="ml-2 text-dark">Jumlah Murid</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </template>
              <!--
                  Jika validasi scopeType sama dengan city dia akan menampilkan
                  data sub_district dengan marker kota dari city tersebut
                 -->
              <template v-else>
                <l-map
                  @update:center="centerUpdate"
                  :options="{ zoomControl: false }"
                  :zoom="zoomSubdistrict"
                  :center="center"
                >
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  ></l-tile-layer>

                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCityTeacher`"
                    :lat-lng="latLng(item.latitude, item.longitude)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-guru"
                    >
                      <div class="headline rounded-circle">
                        {{ item.teacher }}
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
                          <span class="text-muted">{{
                            item.sub_district_name
                          }}</span>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>
                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCitySchool`"
                    :lat-lng="latLng(item.latitude, item.longitude - 0.0138)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-sekolah"
                    >
                      <div class="headline rounded-circle">
                        {{ item.school }}
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
                          <span class="text-muted">{{
                            item.sub_district_name
                          }}</span>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
                            }}</span>
                          </div>
                          <!-- V-FOR -->
                        </div>
                      </div>
                    </l-popup>
                  </l-marker>
                  <l-marker
                    v-for="(item, index) in cityLocationByLocation"
                    :key="`${index}-listCityStudent`"
                    :lat-lng="latLng(item.latitude, item.longitude - 0.028)"
                  >
                    <l-icon
                      :icon-anchor="staticAnchor"
                      :icon-size="dynamicSize"
                      class-name="icon-murid"
                    >
                      <div class="headline rounded-circle">
                        {{ item.student }}
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
                          <span class="text-muted">{{
                            item.sub_district_name
                          }}</span>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Guru</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.teacher
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Sekolah</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.school
                            }}</span>
                          </div>
                          <div
                            class="study-status d-flex align-items-center mt-2"
                          >
                            <span class="ml-2 text-dark">Jumlah Murid</span>
                            <span class="ml-2 text-dark ml-auto">{{
                              item.student
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
                            src="../../../../assets/image/icons/box-green-one.svg"
                            alt="data"
                            lazy="loading"
                            v-once
                          />
                          <span class="ml-2 text-dark">Dibawah 300 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-green-two.svg"
                            alt="data"
                          />
                          <span class="ml-2 text-dark">300-500 </span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-green-three.svg"
                            alt="data"
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
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-yellow.png"
                            alt="jumlah guru"
                          />
                          <span class="ml-2 text-dark">Jumlah Guru</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-blue.png"
                            alt="jumlah sekolah"
                          />
                          <span class="ml-2 text-dark">Jumlah Sekolah</span>
                        </div>
                        <div
                          class="study-status d-flex align-items-center mt-2"
                        >
                          <img
                            lazy="loading"
                            v-once
                            src="../../../../assets/image/icons/box-pink.png"
                            alt="jumlah murid"
                          />
                          <span class="ml-2 text-dark">Jumlah Murid</span>
                        </div>
                      </div>
                    </div>
                  </l-control>
                </l-map>
              </template>
            </div>
          </div>
          <!-- City Map -->
        </card>
      </div>

      <!--  -->
    </div>
  </div>
</template>
<script>
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
import broker from "../../../../utils/broker";

export default {
  name: `distributioMap`,

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom,
    LControl,
    LIcon,
    // LPolygon,
  },
  data() {
    return {
      cityLocationByLocation: [],
      cityLocationBySubject: [],
      colorCache: {},
      latitudeCenter: 0,
      longitudeCenter: 0,
      filterMap: "location",
      zoom: 9,
      zoomSubdistrict: 12,
      center: L.latLng(0, 0),
      currentCenter: L.latLng(0, 0),
      currentZoom: 9,
      // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // Url untuk connect ke api map OSM
      url:
        "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=eb7b36f4657a451f82cdb3648928e7fd",
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      icon: L.icon({
        iconUrl: require("../../../../assets/image/icons/mapping.png"),
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      staticAnchor: [16, 37],
      iconSize: 64,
      scopeType: this.$store.state.scopeType,

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
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
  },
  mounted() {
    this.getData();
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
              if (self.latitudeCenter == null && self.longitudeCenter == null) {
                self.latitudeCenter = 0;
                self.longitudeCenter = 0;
                self.center = L.latLng(
                  self.latitudeCenter,
                  self.longitudeCenter
                );
              } else {
                self.center = L.latLng(
                  self.latitudeCenter,
                  self.longitudeCenter
                );
              }
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
                if (item.latitude == null && item.longitude == null) {
                  self.$Swal.fire({
                    title: "Perhatian!",
                    text:
                      "Mohon segera menghubungi admin untuk melengkapi data koordinat pada peta.",
                    icon: "warning",
                  });
                } else {
                  self.cityLocationByLocation.push(item);
                }
              });
            }
          })
          .catch(() => {});
      } else {
        this.loadDataMapTeacherByLocationCity();
      }
    },

    loadDataMapTeacherByLocationCity() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-location?scope=${self.scopeType}`;

      self.latitudeCenter = 0;
      self.longitudeCenter = 0;
      self.cityLocationByLocation = [];

      broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.latitudeCenter = res.data.data[0].latitude;
            self.longitudeCenter = res.data.data[0].longitude;

            if (self.latitudeCenter == null && self.longitudeCenter == null) {
              self.latitudeCenter = 0;
              self.longitudeCenter = 0;
              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);
            } else {
              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);
            }
            self.currentCenter = L.latLng(
              self.latitudeCenter,
              self.longitudeCenter
            );

            self.loadDataMapTeacherByLocationSubDistrict();
          }
        })
        .catch(() => {});
    },
    loadDataMapTeacherByLocationSubDistrict() {
      let self = this;
      let subDistrict = "sub_district";
      let cityUuid = self.$store.state.user.city.uuid;
      let endPointGetSubDistrictInCity = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-location?scope=${subDistrict}&city_uuid=${cityUuid}`;

      broker.fetch
        .get(endPointGetSubDistrictInCity)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              if (item.latitude == null && item.longitude == null) {
                self.$Swal.fire({
                  title: "Perhatian!",
                  text:
                    "Mohon segera menghubungi admin untuk melengkapi data koordinat pada peta.",
                  icon: "warning",
                });
              } else {
                self.cityLocationByLocation.push(item);
              }
            });
          }
        })
        .catch(() => {});
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

              if (self.latitudeCenter == null && self.longitudeCenter == null) {
                self.latitudeCenter = 0;
                self.longitudeCenter = 0;
                self.center = L.latLng(
                  self.latitudeCenter,
                  self.longitudeCenter
                );
              } else {
                self.center = L.latLng(
                  self.latitudeCenter,
                  self.longitudeCenter
                );
              }

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
        self.loadDataMapTeacherBySubjectCity();
      }
    },

    loadDataMapTeacherBySubjectCity() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-subject?scope=${self.scopeType}`;
      self.latitudeCenter = 0;
      self.longitudeCenter = 0;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          if (res.data.data) {
            self.latitudeCenter = res.data.data[0].latitude;
            self.longitudeCenter = res.data.data[0].longitude;
            if (self.latitudeCenter == null && self.longitudeCenter == null) {
              self.latitudeCenter = 0;
              self.longitudeCenter = 0;
              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);
            } else {
              self.center = L.latLng(self.latitudeCenter, self.longitudeCenter);
            }
            self.currentCenter = L.latLng(
              self.latitudeCenter,
              self.longitudeCenter
            );

            self.loadDataMapTeacherBySubjectSubDistrict();
          }
        })
        .catch(() => {});
    },

    loadDataMapTeacherBySubjectSubDistrict() {
      let self = this;
      let subDistrict = "sub_district";
      let cityUuid = self.$store.state.user.city.uuid;
      let endPointGetSubDistrictInCity = `${process.env.VUE_APP_API_URL}/government/dashboard/map/teacher/by-subject?scope=${subDistrict}&city_uuid=${cityUuid}`;

      self.cityLocationBySubject = [];
      broker.fetch
        .get(endPointGetSubDistrictInCity)
        .then((res) => {
          if (res.data.data) {
            res.data.data.forEach((item) => {
              self.cityLocationBySubject.push(item);
            });
          }
        })
        .catch(() => {});
    },
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
    async getData() {
      await this.loadDataMapTeacherByLocation();
      await this.loadDataMapTeacherBySubject();
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin random-bgr() {
  background-color: rgb(random(255), random(255), random(255));
}
</style>
