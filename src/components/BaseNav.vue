<template>
  <nav class="navbar navbar-expand-md navbar-custome bg-white">
    <div :class="containerClasses">
      <slot name="brand">
        <router-link
          :to="$route.path"
          class="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block"
        >
          <div class="row pt-2">
            <div class="col-6">
               {{ $route.meta.title }}
            </div>
            <div class="col-6 d-flex flex-row">
               <ul class="d-flex align-items-center " v-for="(items,index) in $store.state.schoolType" :key="`index_${index}`">
                 <li class="badge badge-info mr-1">{{items}}</li>
              </ul>
            </div>
          </div>

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
import NavbarToggleButton from "./NavbarToggleButton";

export default {
  name: "base-nav",
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
    };
  },
  methods: {
    closeMenu() {
      this.toggled = false;
    },
  },
};
</script>
<style></style>
