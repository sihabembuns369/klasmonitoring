<template>
  <div class="col-xl-12 col-lg-12 col-md-8 logo_">
    <div class="card d-flex flex-row align-items-center p-3 flex-column h-100 box-shadow_biru">
      <div class="statistic">
        <div class="box_profile">
          <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </div>
      <div class="detail_profile text-center break_word pt-3">
        <div>
          <h4>{{ labelNama }}</h4>
          <h5>{{ labelKondisi }} - {{ labelStatus }}</h5>
        </div>
        <p class="m-0 label_terlambat">Terlambat</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProfileMonitoring",
  props: {
    title: String,
    jmlPresensi: String,
    labelNama: String,
    labelKondisi: String,
    labelStatus: String,
  }
}
</script>

<style lang="scss" scoped>
.box-shadow_biru{
  box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 19%);
  -webkit-box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 28%);
  height: 25vh !important;
}
.label_terlambat{
  color: #ec7171;
  font-size: 2.5vh !important;
}
.detail_profile{
  h4{
    text-transform: uppercase;
    font-size: 1.8vh;
  }
  h5{
    text-transform: uppercase;
    font-size: 1.6vh;
  }
}
.box_profile{
  border-radius: 50%;
  overflow: hidden;
  width: 9vh;
  height: 9vh;
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
