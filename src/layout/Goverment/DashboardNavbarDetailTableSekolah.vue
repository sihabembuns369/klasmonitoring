<template>
  <base-nav-detail-back
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <ul class="navbar-nav align-items-center d-none d-md-flex ml-lg-auto">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <div class="media-body mr-2 d-none d-lg-block">
              <span class="mb-0 text-sm text-muted" v-if="nameCity != null">
                <i class="fas fa-bell mr-2"></i>
                {{ nameCity }}
              </span>
              <span v-else class="mb-0 text-sm text-muted">
                <i class="fas fa-bell mr-2"></i>
                {{ nameProvince }}
              </span>
            </div>
            <router-link
              :to="`/detail/sekolah/${$route.params.id}`"
              class="h4 mb-0 text-dark text-uppercase mr-3 d-xl-none d-lg-none"
            >
              <span>
                <img src="../../assets/image/icons/arrow_left.svg" alt="" />
                <span class="font-size-12 ml-3 text-dark">{{
                  loading
                    ? "Loading..."
                    : schoolDetail != null
                    ? schoolDetail.name
                    : `-`
                }}</span>
              </span>
            </router-link>
            <span class="avatar avatar-sm rounded-circle d-sm-block">
              <img
                class="d-sm-block"
                v-if="$store.state.user.image == null"
                alt="Image placeholder"
                src="../../assets/image/logo/Logo-Onklas.png"
              />
              <img
                class="d-sm-block"
                v-else
                alt="Image placeholder"
                :src="$store.state.user.image"
              />
            </span>
          </div>

          <template>
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <!-- <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link> -->
            <div class="dropdown-divider"></div>
            <a href="#" @click="doLogout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav-detail-back>
</template>
<script>
import broker from "../../utils/broker";
export default {
  data() {
    return {
      nameCity: this.$store.state.user.city.name,
      nameProvince: this.$store.state.user.province.name,
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      schoolDetail: null,
      loading: false,
      dataUser: JSON.parse(localStorage.getItem("dataUser")),
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    async getDetailSchool() {
      try {
        let self = this;
        self.loading = true;
        self.schoolDetail = null;

        let resp = await broker.fetch.get(
          `/government/dashboard/detail/school/${self.$route.params.id}`
        );

        self.schoolDetail = resp.data.data;
      } catch (error) {
        let message = "Opps ! terdapat kesalahan.";
        if (error.response) {
          if (error.response.data.errors) {
            message = this.handleErrorApi(error.response.data.errors, "string");
          }
          self.$Swal.fire("Alert", message, "warning");
        }
      } finally {
        let self = this;
        self.loading = false;
      }
    },
    doLogout() {
      localStorage.removeItem("token");
      // localStorage.removeItem("updateIsDefaultPass", false);
      // localStorage.removeItem("dataUser");
      // localStorage.removeItem("token_type");
      // localStorage.removeItem("scope_type");
      this.$store.dispatch("updateUser", {});
      this.$store.dispatch("updateToken", "");
      this.$store.dispatch("updateTokenType", "");
      this.$store.dispatch("updateScopeType", "");

      this.$Toast.fire({
        type: "success",
        title: "Berhasil Logout",
      });
      // this.$router.push("/");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.getDetailSchool();
  },
};
</script>
