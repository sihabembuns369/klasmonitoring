<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links" class="text-blue font-weight-bold">
        <sidebar-item
          :link="{
            name: 'Klasmonitoring',
            icon: 'fas fa-home text-primary',
            path: '/klasmonitoring',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Perpustakaan',
            icon: 'ni ni-planet text-blue',
            path: '/klaspustaka',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Presensi',
            icon: 'fas fa-clock text-primary',
            path: '/presensi',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Sosial Media',
            icon: 'ni ni-single-02 text-primary',
            path: '',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Menu Lainnya',
            icon: 'ni ni-bullet-list-67 text-primary',
            path: '',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Pengaturan',
            icon: 'fas fa-cog text-primary',
            path: '',
          }"
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
<style lang="scss"></style>
