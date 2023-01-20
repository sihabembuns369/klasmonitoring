<template>
  <transition name="fade">
    <div class="modal " id="myModal" style="display: block;">
      <div class="modal-dialog modal-lg ">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-dark">PROFIL GURU / STAFF</h4>
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
          <div v-if="teacherDetail == null" class="modal-body">
            Loading ...
          </div>
          <div v-else class="modal-body">
            <div class="row">
              <div class="col-md-3 ">
                <div class="image-profile text-center ">
                  <img
                    v-if="teacherDetail.teacher != null"
                    class="border"
                    :src="teacherDetail.teacher.user.user_avatar_image"
                    alt=""
                  />
                  <img
                    v-else
                    class="border"
                    src="../../../assets/image/profile-guru.png"
                    alt=""
                  />
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
                          type="text"
                          class="form-control bg-white"
                          id="namalengkap"
                          readonly
                          :value="teacherDetail.name"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="nis_nik">NIK/NIP</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="nis_nik"
                          :value="teacherDetail.nis_nik"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="place_of_birth">Tempat Kelahiran</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="place_of_birth"
                          :value="teacherDetail.place_of_birth"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="date_of_birth">Tanggal kelahiran</label>
                        <input
                          type="text"
                          readonly
                          class="form-control bg-white"
                          id="date_of_birth"
                          :value="teacherDetail.date_of_birth"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="province_name">Provinsi</label>
                        <input
                          v-if="teacherDetail.city != null"
                          type="text"
                          class="form-control bg-white"
                          id="province_name"
                          :value="teacherDetail.city.province_name"
                          readonly
                        />
                        <input
                          type="text"
                          v-else
                          readonly
                          class="form-control bg-white"
                          id="province_name"
                          value="-"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="city">Kota tempat tinggal</label>
                        <input
                          v-if="teacherDetail.city != null"
                          type="text"
                          readonly
                          class="form-control bg-white"
                          id="city"
                          :value="teacherDetail.city.name"
                        />
                        <input
                          type="text"
                          v-else
                          readonly
                          class="form-control bg-white"
                          id="city"
                          value="-"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="address">Alamat lengkap</label>
                        <textarea
                          type="text"
                          class="form-control bg-white p-0"
                          id="address"
                          readonly
                          :value="teacherDetail.address"
                        />
                      </div>
                      <!-- <div class="form-group col-md-6">
                        <label for="NPWP">NPWP</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="NPWP"
                          value=" "
                          readonly
                        />
                      </div> -->
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="gender">Jenis kelamin</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="gender"
                          readonly
                          :value="teacherDetail.gender"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="school">Mengajar</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="school"
                          readonly
                          :value="teacherDetail.school.name"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="blood_type">Golongan darah</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="blood_type"
                          :value="teacherDetail.blood_type"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="religion">Agama</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="religion"
                          :value="teacherDetail.religion"
                          readonly
                        />
                      </div>
                    </div>

                    <h3 class="text-primary-blue">KONTAK</h3>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="email">Email</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="email"
                          :value="teacherDetail.email"
                          readonly
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="phone">No. Telepon</label>
                        <input
                          type="text"
                          class="form-control bg-white"
                          id="phone"
                          readonly
                          :value="teacherDetail.phone"
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
                    </div> -->
                    <!-- <div class="form-row">
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
                        <label for="role">Profesi</label>
                        <input
                          v-for="(role, index) in teacherDetail.role"
                          :key="`${index}-role`"
                          type="text"
                          class="form-control bg-white"
                          id="role"
                          readonly
                          :value="role.name"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="subject">Mapel</label>
                        <input
                          v-for="(subject, index) in teacherDetail.subjects"
                          :key="`${index}-subject`"
                          type="text"
                          class="form-control bg-white"
                          id="subject"
                          :value="subject.name"
                          readonly
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="classes">Kelas Mengajar</label>
                        <input
                          v-for="(classes, index) in teacherDetail.classes"
                          :key="`${index}-subject`"
                          type="text"
                          class="form-control bg-white"
                          id="classes"
                          :value="classes.name"
                          readonly
                        />
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
import broker from "../../../utils/broker";

export default {
  name: "ModalBiodataGuruStaff",
  props: ["dataId"],

  data() {
    return {
      teacherDetail: null,
      id: this.dataId,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadDataDetail() {
      let self = this;
      let endPoint = `${process.env.VUE_APP_API_URL}/government/dashboard/detail/teacher/${self.id}`;

      broker.fetch
        .get(endPoint)
        .then((res) => {
          self.teacherDetail = res.data.data;
        })
        .catch(() => {});
    },
  },
  activated() {},
  mounted() {
    this.loadDataDetail();
  },
};
</script>
