<template>
  <base-nav
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
              <span class="mb-0 text-sm text-muted">
                <i class="fas fa-bell mr-2"></i> {{ $store.state.user.headmaster.name }}
              </span>
            </div>
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" :src="$store.state.user.image" />
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
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      dataUser: JSON.parse(localStorage.getItem("dataUser")),
    };
  },
  methods: {
    // dataUser() {
    //   return localStorage.getItem("dataUser");
    // },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
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
};
</script>
