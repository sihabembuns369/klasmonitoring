<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground">
      <template slot="links" class="text-blue font-weight-bold">
        <sidebar-item
          :link="{
            name: 'Klasmonitoring',
            icon: 'dashboard_icon.svg',
            path: '/klasmonitoring',
          }"
          title="Klasmonitoring"
        />

        <sidebar-item
          :link="{
            name: 'Perpustakaan',
            icon: 'klaspustaka_icon.svg',
            path: '/klaspustaka',
          }"
          title="Perpustakaan"
        />
        <sidebar-item
          :link="{
            name: 'Presensi',
            icon: 'time_icon.svg',
            path: '/presensi',
          }"
          title="Presensi"
        />
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <sidebar-item
              :link="{
                name: 'Sosial Media',
                icon: 'sosmed_icon.svg',
                path: '/sosial-media',
              }"
              title="Sosial Media"
            />
            <div
              class="soon-access font-weight-bold text-white bg-red text-center rounded-pill pl-2 pr-2  ml-3"
            >
              SOON
            </div>
          </div>
        </div>

        <sidebar-item
          :link="{
            name: 'Menu Lainnya',
            icon: 'another_menu.svg',
            path: '/menu-lainnya',
          }"
          title="Menu Lainnya"
        />
        <sidebar-item
          :link="{
            name: 'Pengaturan',
            icon: 'pengaturan_icon.svg',
            path: '/pengaturan',
          }"
          title="Pengaturan"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
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
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style scoped></style>
