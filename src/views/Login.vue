<template>
  <div class="row justify-content-center bg-primary-blue-wave">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit.prevent="checkToken">
            <label for="">Masukkan Token</label>
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Token"
              addon-left-icon="fas fa-user"
              v-model="model.token"
              @keydown.native="onEnterToken"
            >
            </base-input>
            <div class="form-group row">
              <div class="col-sm-12">
                <button type="submit" class="btn btn-outline-info form-control">
                  LOGIN
                </button>
              </div>
            </div>

            <div class="text-center  mt-5 mb-1">
              <span class="my-4">Selamat Datang di Klasmonitoring</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import broker from "../utils/broker";
import Swal from "sweetalert2";

export default {
  name: "login",
  metaInfo: {
    title: "Login",
    titleTemplate: "%s | Klasmonitoring",
  },
  data() {
    return {
      model: {
        token: "",
      },
    };
  },
  methods: {
    checkRoute() {
      let self = this;
      let tokenType = self.$store.state.tokenType;
      if (tokenType.length > 0) {
        if (self.$store.state.tokenType == "government") {
          window.location.href = "/pemerintah";
        } else {
          window.location.href = "/klasmonitoring/sekolah/new";
        }
      }
    },
    checkToken() {
      let self = this;
      self.$Progress.start();

      broker.fetch
        .post("/login", {
          token: self.model.token,
        })
        .then((res) => {
          const { status } = res;

          if (status == 200) {
            // let dataUser = res.data.data;
            window.localStorage.setItem("token", self.model.token);
            // window.localStorage.setItem("dataUser", JSON.stringify(dataUser));
            // window.localStorage.setItem("token_type", res.data.meta.token_type);
            // window.localStorage.setItem("scope_type", res.data.meta.scope);

            self.$store.dispatch("updateUser", res.data.data);
            self.$store.dispatch("updateToken", self.model.token);
            self.$store.dispatch("updateTokenType", res.data.meta.token_type);
            self.$store.dispatch("updateScopeType", res.data.meta.scope);
            self.$store.dispatch("updateSchoolType",res.data.meta.school_types);
            // console.log("asda", res.data.data);

            if (res.data.meta.token_type == "government") {
              window.location.href = "/pemerintah";
              // window.location.reload();
              this.$Toast.fire({
                type: "success",
                title: "Berhasil Login",
              });
              self.$Progress.finish();
            } else if (res.data.meta.token_type == "school") {
              window.location.href = "/klasmonitoring/sekolah/new";
              // window.location.reload();
              this.$Toast.fire({
                type: "success",
                title: "Berhasil Login",
              });
              self.$Progress.finish();
            }
          }
        })
        .catch(function(error) {
          let message = "Opps ! terdapat kesalahan.";

          if (error.response) {
            if (error.response.data.message) {
              message = error.response.data.message;
            }

            Swal.fire("Alert", message, "warning");
          }
          self.$Progress.fail();
        });
    },
    onEnterToken: function(e) {
      if (e.keyCode == 13 && e.shiftKey == false) {
        e.preventDefault();
        this.checkToken();
      }
    },
  },
  mounted() {
    this.checkRoute();
  },
};
</script>
<style></style>
