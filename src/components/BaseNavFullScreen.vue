<template>
  <nav class="navbar navbar-expand-md navbar-custome bg-white box-shadow_biru">
    <div :class="containerClasses">
      <slot name="brand">
        <div class="row">
          <div v-b-tooltip.hover title="Klik To Refresh Page" class="col-md-12 d-flex align-items-center collapse-brand navbar_brand cursor_pointer" @click="refreshPageLoad">
            <img
                v-if="$store.state.user.image == null"
                src="../assets/image/logo/Logo-Onklas.png"
            />
            <img
                v-else
                :src="require('@/assets/no-image.png')"
            />
            <h2>{{nameSchool}}</h2>
          </div>
        </div>
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
import NavbarToggleButton from "./NavbarToggleButton";

export default {
  name: "base-nav-full-screen",
  components: {
    NavbarToggleButton,
  }, props: {
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description: "Explicit id for the menu. By default it's a generated random number",
    }, containerClasses: {
      type: [String, Object, Array], default: "container-fluid",
    }, transparent: {
      type: Boolean, default: false, description: "Whether navbar is transparent",
    }, expand: {
      type: Boolean, default: false, description: "Whether navbar should contain `navbar-expand-lg` class",
    }, showToggleButton: {
      type: Boolean, default: true,
    },
  }, data() {
    return {
      toggled: false,
      nameSchool: ""
    };
  }, methods: {
    refreshPageLoad() {
      window.location = "";
    }, closeMenu() {
      this.toggled = false;
    },showNameSchool() {
      let LocalDataVuex = JSON.parse(
          window.localStorage.getItem("vuex")
      );
      if (LocalDataVuex){
        this.nameSchool = LocalDataVuex.user ? LocalDataVuex.user.name ? LocalDataVuex.user.name : "" : ""
      }
    },
  },
  mounted() {
    this.showNameSchool()
  }
};
</script>
<style lang="scss" scoped>
nav {
  max-height: 83px !important;

  &.box-shadow_biru{
    box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 19%);
    -webkit-box-shadow: 7px 7px 17px 0px rgb(141 156 250 / 28%);
  }
}

.navbar_brand {
  & > img {
    max-width: 100%;
    width: 55px;
    /* display: none; */
    margin: 0 20px 0 0;
    @media (max-width: 768px) {
      width: 25px;
    }
  }
  h2{
    font-size: 3.7vh;
    margin: 0;
  }

  span {
    font-size: 2rem;
    font-weight: 700;
    transform: scale(1.1);
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

.cursor_pointer {
  cursor: pointer;
}
</style>
