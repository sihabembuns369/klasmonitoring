<template>
  <div class="col-xl-12 col-lg-12 col-md-8 ">
    <div class="card d-flex flex-row align-items-center p-3 flex-column h-100 box-shadow_biru">
      <div class="">
        <h3>Kelas {{ nameClass }} - {{ nameMajor }}</h3>
      </div>
      <div class="detail_profile text-left break_word">
        <table style="width: 100%">
          <tr>
            <td>Status</td>
            <td>: {{ status }}</td>
          </tr>
          <tr>
            <td>Pendidik</td>
            <td>: {{ nameTeacher }}</td>
          </tr>
          <tr>
            <td>Siswa Aktif</td>
            <td>: {{ totStudentActive }} Siswa</td>
          </tr>
          <tr>
            <td>Siswa Tidak Aktif</td>
            <td>: {{totStudentNotActive}} Siswa</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardKelasMonitoring",
  props: {
    status: String,
    nameClass: String,
    nameMajor: String,
    nameTeacher: String,
    totStudentActive: Number,
    totStudentNotActive: Number,
  }
}
</script>

<style lang="scss" scoped>
.box-shadow_biru{
  box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 19%);
  -webkit-box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 28%);
  height: 24vh;
  h3{
    font-size: 1.8vh;
  }
}
.box_profile{
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  img{
    object-fit: contain;
    width: inherit;
  }
}
.break_word{
  word-break: break-word;
}
.m_auto{
  margin: 0;
}
</style>
