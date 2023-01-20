<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-dark">PROFIL PELAJAR</h4>
            <button
              type="button"
              class="close"
              @click="close"
              data-dismiss="modal"
            >
              [x] Tutup
            </button>
          </div>
          <!-- Modal body -->

          <div v-if="studentDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-profile text-center ">
                  <div>
                    <img
                      v-if="studentDetail.avatar == null"
                      class="border"
                      src="../../../../assets/image/profile.png"
                      alt=""
                    />
                    <img
                      v-else
                      class="border"
                      :src="studentDetail.avatar"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="overflow-auto ">
                  <div class="biodata">
                    <h3 class="text-primary-blue">BIODATA</h3>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Nama lengkap</label>

                        <input
                          v-if="studentDetail.name == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="namalengkap"
                          :value="`Belum Tersedia`"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          :value="studentDetail.name"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">NISN</label>
                        <input
                          v-if="studentDetail.student.nisn == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="nisn"
                          readonly
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="nisn"
                          readonly
                          :value="studentDetail.student.nisn"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="NIS">NIS</label>
                        <input
                          v-if="studentDetail.student.nis == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="NIS"
                          readonly
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="NIS"
                          readonly
                          :value="studentDetail.student.nis"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="tempatKelahiran">Tempat kelahiran</label>
                        <input
                          v-if="studentDetail.place_of_birth == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="tempatKelahiran"
                          value="Belum Tersedia"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="tempatKelahiran"
                          :value="studentDetail.place_of_birth"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="tanggalKelahiran">Tanggal kelahiran</label>
                        <input
                          v-if="studentDetail.date_of_birth == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="tanggalKelahiran"
                          value="Belum Tersedia"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="tanggalKelahiran"
                          :value="studentDetail.date_of_birth"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="provinsi">Provinsi</label>
                        <input
                          v-if="studentDetail.city == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="provinsi"
                          value="Belum Tersedia"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="provinsi"
                          :value="studentDetail.city.province_name"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="kotaTinggal">Kota tempat tinggal</label>
                        <input
                          v-if="studentDetail.city == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="kotaTinggal"
                          value="Belum Tersedia"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="kotaTinggal"
                          :value="studentDetail.city.name"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="address">Alamat lengkap</label>
                        <textarea
                          v-if="studentDetail.address == null"
                          type="text"
                          class="form-control p-0 bg-white text-danger"
                          id="address"
                          :value="'Belum Tersedia'"
                          readonly
                        />
                        <textarea
                          v-else
                          type="text"
                          class="form-control p-0 bg-white"
                          id="address"
                          :value="studentDetail.address"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="jenisKelamin">Jenis kelamin</label>
                        <input
                          v-if="studentDetail.gender == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="jenisKelamin"
                          readonly
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="jenisKelamin"
                          :value="studentDetail.gender"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="sekolah">Sekolah</label>

                        <input
                          v-if="studentDetail.school == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          id="sekolah"
                          readonly
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          id="sekolah"
                          :value="studentDetail.school.name"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="bloodType">Golongan darah</label>
                        <input
                          v-if="studentDetail.blood_type == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          readonly
                          id="bloodType"
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="bloodType"
                          :value="studentDetail.blood_type"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="religion">Agama</label>
                        <input
                          v-if="studentDetail.religion == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          readonly
                          id="religion"
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="religion"
                          :value="studentDetail.religion"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="height">Tinggi badan (Centimeter)</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.student.height == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="height"
                            value="Belum Tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="height"
                            :value="studentDetail.student.height"
                            readonly
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="weigth">Berat badan (Kilogram)</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.student.weight == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="weigth"
                            value="Belum Tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="weigth"
                            :value="studentDetail.student.weight"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="uniform_size">Ukuran seragam sekolah</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.student.weight == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="uniform_size"
                            value="Belum Tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="uniform_size"
                            :value="studentDetail.student.weight"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="sport_shirt_size">Ukuran seragam</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="
                              studentDetail.student.sport_shirt_size == null
                            "
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="sport_shirt_size"
                            value="Belum Tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="sport_shirt_size"
                            :value="studentDetail.student.sport_shirt_size"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 class="text-primary-blue">KONTAK</h3>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input
                          v-if="studentDetail.email == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          readonly
                          id="email"
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="email"
                          :value="studentDetail.email"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="telp">No. Telepon</label>
                        <input
                          v-if="studentDetail.phone == null"
                          type="text"
                          class="form-control bg-white text-danger"
                          readonly
                          id="telp"
                          value="Belum Tersedia"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control bg-white"
                          readonly
                          id="telp"
                          :value="studentDetail.phone"
                        />
                      </div>
                    </div>
                    <!-- <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Facebook</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Linkedin</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="namalengkap">Twitter</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nisn">Instagram</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div>
                    </div> -->

                    <h3 class="text-primary-blue">PERANAN</h3>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="class">Angkatan</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.student.class == null"
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="class"
                            value="-"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="class"
                            :value="studentDetail.student.class"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="current_class">Kelas</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <div
                            v-if="studentDetail.student.current_class == null"
                          >
                            <span class="text-danger">Belum Tersedia</span>
                          </div>
                          <div v-else>
                            <input
                              v-if="
                                studentDetail.student.current_class.class_room
                                  .name == null
                              "
                              type="text"
                              class="form-control bg-white text-danger"
                              readonly
                              id="current_class"
                              value="Belum tersedia"
                            />
                            <input
                              v-else
                              type="text"
                              class="form-control bg-white"
                              readonly
                              id="current_class"
                              :value="
                                studentDetail.student.current_class.class_room
                                  .name
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="major">Jurusan</label>
                        <div v-if="studentDetail.student == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.student.major == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="major"
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="major"
                            :value="studentDetail.student.major.name"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 class="text-primary-blue">ORANG TUA/WALI</h3>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="father">Nama Ayah</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.father_name == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            readonly
                            id="father"
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            readonly
                            id="father"
                            :value="studentDetail.parent.father_name"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="father_job">Profesi</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.father_job == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            id="father_job"
                            readonly
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="father_job"
                            readonly
                            :value="studentDetail.parent.father_job"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="father_phone">No. Telepon</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.father_phone == null"
                            type="text"
                            readonly
                            class="form-control bg-white text-danger"
                            id="father_phone"
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="father_phone"
                            readonly
                            :value="studentDetail.parent.father_phone"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="email_parent">Email</label>

                        <div>
                          <input
                            type="text"
                            class="form-control bg-white text-danger"
                            id="email_parent"
                            readonly
                            value="Belum tersedia"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <!-- <div class="form-group col-md-6">
                        <label for="namalengkap">NIK</label>
                        <input
                          v-if="studentDetail.parent.father_phone == null"
                          type="text"
                          class="form-control"
                          id="father_phone"
                          value="-"
                        />
                        <input
                          v-else
                          type="text"
                          class="form-control"
                          id="father_phone"
                          :value="studentDetail.parent.father_phone"
                        />
                      </div> -->
                      <div class="form-group col-md-6">
                        <label for="father_address"
                          >Alamat Tempat Tinggal</label
                        >
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <textarea
                            v-if="studentDetail.parent.father_address == null"
                            type="text"
                            class="form-control p-0 text-danger"
                            id="father_address"
                            :value="'Belum tersedia'"
                          />
                          <textarea
                            v-else
                            type="text"
                            class="form-control p-0"
                            id="father_address"
                            :value="studentDetail.parent.father_address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="mother_name">Nama Ibu</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            id="mother_name"
                            readonly
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="mother_name"
                            readonly
                            :value="studentDetail.parent.mother_name"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="mother_job">Profesi</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.mother_job == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            id="mother_job"
                            value="Belum tersedia"
                            readonly
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="mother_job"
                            readonly
                            :value="studentDetail.parent.mother_job"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="mother_phone">No. Telepon</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.mother_phone == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            id="mother_phone"
                            readonly
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="mother_phone"
                            readonly
                            :value="studentDetail.parent.mother_phone"
                          />
                        </div>
                      </div>
                      <!-- <div class="form-group col-md-6">
                        <label for="nisn">Email</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div> -->
                    </div>
                    <div class="form-row">
                      <!-- <div class="form-group col-md-6">
                        <label for="namalengkap">NIK</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div> -->
                      <div class="form-group col-md-6">
                        <label for="mother_address"
                          >Alamat Tempat Tinggal</label
                        >
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <textarea
                            v-if="studentDetail.parent == null"
                            type="text"
                            class="form-control p-0 bg-white text-danger"
                            id="mother_address"
                            :value="'Belum tersedia'"
                            readonly
                          />
                          <textarea
                            v-else
                            type="text"
                            class="form-control p-0 bg-white"
                            id="mother_address"
                            readonly
                            :value="studentDetail.parent.mother_address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="vice_name">Nama Wali</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.vice_name == null"
                            type="text"
                            readonly
                            class="form-control bg-white text-danger"
                            id="vice_name"
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="vice_name"
                            readonly
                            :value="studentDetail.parent.vice_name"
                          />
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="vice_job">Profesi</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.vice_job == null"
                            type="text"
                            readonly
                            class="form-control bg-white text-danger"
                            id="vice_job"
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="vice_job"
                            readonly
                            :value="studentDetail.parent.vice_job"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="vice_phone">No. Telepon</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <input
                            v-if="studentDetail.parent.vice_phone == null"
                            type="text"
                            class="form-control bg-white text-danger"
                            id="vice_phone"
                            readonly
                            value="Belum tersedia"
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control bg-white"
                            id="vice_phone"
                            readonly
                            :value="studentDetail.parent.vice_phone"
                          />
                        </div>
                      </div>
                      <!-- <div class="form-group col-md-6">
                        <label for="nisn">Email</label>
                        <input type="text" class="form-control" id="nisn" />
                      </div> -->
                    </div>
                    <div class="form-row">
                      <!-- <div class="form-group col-md-6">
                        <label for="namalengkap">NIK</label>
                        <input
                          type="text"
                          class="form-control"
                          id="namalengkap"
                          value=" "
                        />
                      </div> -->
                      <div class="form-group col-md-6">
                        <label for="vice_address">Alamat Tempat Tinggal</label>
                        <div v-if="studentDetail.parent == null">
                          <span class="text-danger">Belum Tersedia</span>
                        </div>
                        <div v-else>
                          <textarea
                            v-if="studentDetail.parent.vice_address == null"
                            type="text"
                            class="form-control p-0 bg-white text-danger"
                            id="vice_address"
                            readonly
                            :value="'Belum Tersedia'"
                            placeholder="-"
                          />

                          <textarea
                            v-else
                            type="text"
                            class="form-control p-0 bg-white"
                            id="vice_address"
                            readonly
                            :value="studentDetail.parent.vice_address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <!-- <div class="modal-footer">
            <button
              type="button"
              @click="$emit('close')"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              Close
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import broker from "../../../../utils/broker";

export default {
  name: "ModalBiodataPelajar",
  props: ["dataId"],
  data() {
    return {
      studentDetail: null,
      id: this.dataId,
      loading: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      this.loading = true;

      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/student/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.studentDetail = res.data.data;
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
  activated() {},
  mounted() {
    this.loadDataDetail();
  },
};
</script>
