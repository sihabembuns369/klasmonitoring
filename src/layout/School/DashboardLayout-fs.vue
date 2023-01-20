<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
        :background-color="sidebarBackground"
        short-title="Argon"
        title="Klasmonitoring"
    >
      <template slot="links" class="text-blue border-0 font-weight-bold">
        <sidebar-item
            :link="{
            name: 'Monitoring',
            icon: 'dashboard_icon.svg',
            path: '/klasmonitoring/sekolah/new',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Klasmonitoring',
            icon: 'dashboard_icon.svg',
            path: '/klasmonitoring/sekolah',
          }"
        />
        <sidebar-item
            :link="{
            name: 'Menu Lainnya',
            icon: 'another_menu.svg',
            path: '/menu',
          }"
            title="Menu Lainnya"
        />
        <sidebar-item
            :link="{
            name: 'Pengaturan',
            icon: 'pengaturan_icon.svg',
            path: '/pengaturan-akun',
          }"
            title="Pengaturan"
        />
      </template>
    </side-bar>
    <div class="main-content" :class="{ 'full_content': !$sidebar.showSidebar }" :data="sidebarBackground">
      <dashboard-navbar v-if="$route.meta.layout !== 'fullScreen'"></dashboard-navbar>
      <dashboard-navbar-full-screen v-else></dashboard-navbar-full-screen>


      <div class="toogleSidebar" @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "../School/DashboardNavbar";
import DashboardNavbarFullScreen from "../School/DashboardNavbarFullScreen";
import ContentFooter from "./ContentFooter.vue";
import SideBar from "../../components/SidebarPlugin/SideBar";
import {FadeTransition} from "vue2-transitions";

export default {
  components: {
    DashboardNavbar, DashboardNavbarFullScreen, ContentFooter, SideBar, FadeTransition,
  }, data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  }, methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(true);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main-content{
  transition: .2s cubic-bezier(.4,0,.2,1);
  @media (min-width: 789px) {
    margin-left: 250px;
  }
  &.full_content {
    margin-left: 0 !important;
  }
}
</style>
