<template>
  <nav class="navbar navbar-expand-md navbar-custome bg-white">
    <div :class="containerClasses">
      <slot name="brand">
        <router-link
          :to="`/detail/sekolah/${$route.params.id}`"
          class="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block"
        >
          <span>
            <img src="../assets/image/icons/arrow_left.svg" alt="" />
            <img
              class="avatar avatar-sm rounded-circle ml-3"
              :src="
                loading
                  ? `Loading..`
                  : schoolDetail == null
                  ? `../assets/image/logo/sample-logo-school.png`
                  : schoolDetail.image
              "
              alt=""
            />
            <span class="font-size-12 ml-3 text-dark">{{
              loading
                ? "Loading..."
                : schoolDetail != null
                ? schoolDetail.name
                : `-`
            }}</span>
          </span>
        </router-link>
      </slot>
      <navbar-toggle-button
        v-if="showToggleButton"
        :toggled="toggled"
        :target="contentId"
        @click.native.stop="toggled = !toggled"
      >
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>

      <div
        class="collapse navbar-collapse"
        :class="{ show: toggled }"
        :id="contentId"
        v-click-outside="closeMenu"
      >
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
import broker from "../utils/broker";
import NavbarToggleButton from "./NavbarToggleButton";

export default {
  name: "base-nav-detail-back",
  components: {
    NavbarToggleButton,
  },
  props: {
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number",
    },
    containerClasses: {
      type: [String, Object, Array],
      default: "container-fluid",
    },
    transparent: {
      type: Boolean,
      default: false,
      description: "Whether navbar is transparent",
    },
    expand: {
      type: Boolean,
      default: false,
      description: "Whether navbar should contain `navbar-expand-lg` class",
    },
    showToggleButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toggled: false,
      schoolDetail: null,
      loading: false,
    };
  },
  methods: {
    closeMenu() {
      this.toggled = false;
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
  },
  mounted() {
    this.getDetailSchool();
  },
};
</script>
<style></style>
