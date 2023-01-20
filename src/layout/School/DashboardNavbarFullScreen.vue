<template>
  <base-nav-full-screen
      class="navbar-top navbar-dark mb-2"
      id="navbar-main"
      :show-toggle-button="true"
      expand
  >
    <ul class="navbar-nav align-items-center d-none d-md-flex ml-lg-auto">
      <li class="nav-item dropdown" @click="tootleFullScreen">
        <i v-b-tooltip.hover title="Full Screen" v-if="iconFullScreen" class="fas fa-expand font-size-24 icon_full_screen"></i>
        <i v-b-tooltip.hover title="Back Normal Screen" v-else class="fas fa-compress font-size-24 icon_full_screen"></i>
      </li>
    </ul>
  </base-nav-full-screen>
</template>
<script>
export default {
  name: "DashboardNavbarFullScreen", components: {}, data() {
    return {
      iconFullScreen: true,
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      dataUser: JSON.parse(localStorage.getItem("dataUser")),
    };
  }, methods: {
    // dataUser() {
    //   return localStorage.getItem("dataUser");
    // },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }, hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }, toggleMenu() {
      this.showMenu = !this.showMenu;
    }, tootleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        this.iconFullScreen = false
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
        this.iconFullScreen = true
      }
    }, doLogout() {
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
        type: "success", title: "Berhasil Logout",
      });
      // this.$router.push("/");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.icon_full_screen {
  cursor: pointer;
  //transition: all ease-in-out .5ms;
  transition: transform .2s;

  &:hover {
    transform: scale(1.2);
  }
}
</style>
