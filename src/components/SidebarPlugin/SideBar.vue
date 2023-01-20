<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link
        class="navbar-brand"
        to="/klasmonitoring/sekolah"
        v-if="$store.state.tokenType == 'school'"
      >
        <img
          v-if="$store.state.user.image == null"
          src="../../assets/image/logo/Logo-Onklas.png"
          class="navbar-brand-img mr-2"
          style="width:31px;height:30px;"
          alt="..."
        />
        <img
          v-else
          :src="$store.state.user.image"
          class="navbar-brand-img mr-2"
          style="width:31px;height:30px;"
          alt="..."
        />
        <!-- <span class="font-weight-bold text-dark">{{
          dataUser.name.slice(0, 15) + "..."
        }}</span> -->
        <span class="font-weight-bold text-dark">{{
          $store.state.user.city_name.slice(0, 15) + "..."
        }}</span>
      </router-link>
      <router-link v-else class="navbar-brand" to="/klasmonitoring">
        <img
          v-if="$store.state.user.image == null"
          src="../../assets/image/logo/Logo-Onklas.png"
          class="navbar-brand-img mr-2"
          style="width:31px;height:30px;"
          alt="..."
        />
        <img
          v-else
          :src="$store.state.user.image"
          class="navbar-brand-img mr-2"
          style="width:31px;height:30px;"
          alt="..."
        />
        <span class="font-weight-bold text-dark" v-if="nameCity != null">{{
          nameCity.slice(0, 11) + "..."
        }}</span>
        <span v-else>{{ nameProvince.slice(0, 11) + "..." }}</span>
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a
              slot="title"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                    v-if="$store.state.user.image == null"
                    src="../../assets/image/logo/Logo-Onklas.png"
                    class="navbar-brand-img mr-2"
                    style="width:31px;height:30px;"
                    alt="..."
                  />
                  <img
                    v-else
                    :src="$store.state.user.image"
                    class="navbar-brand-img mr-2"
                    style="width:31px;height:30px;"
                    alt="..."
                  />
                </span>
              </div>
            </a>

            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>

            <div class="dropdown-divider"></div>
            <a href="#" @click="doLogout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img
                  v-if="$store.state.user.image == null"
                  src="../../assets/image/logo/Logo-Onklas.png"
                />
                <img v-else :src="$store.state.user.image" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <!-- <hr class="my-3" /> -->
        <!--Heading-->
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  data() {
    return {
      nameCity: this.$store.state.user.city.name,
      nameProvince: this.$store.state.user.province.name,
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      dataUser: JSON.parse(localStorage.getItem("dataUser")),
      tokenType: localStorage.getItem("token_type"),
    }
  },
  props: {
    logo: {
      type: String,
      default: "../../assets/image/logo/Logo-Onklas.png",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
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
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    },
  },
};
</script>
