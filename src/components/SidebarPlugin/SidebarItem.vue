<template>
  <li class="nav-item">
    <router-link
      :to="link.path"
      @click.native="linkClick"
      class="nav-link"
      active-class="active"
      exact
      :target="link.target"
      :href="link.path"
    >
      <template>
        <InlineSvg :src="getImgUrl(`${link.icon}`)" class="icon-menu" />
        <!-- <i :class="link.icon"></i> -->
        <span class="nav-link-text">{{ link.name }}</span>
      </template>
    </router-link>
  </li>
</template>
<script>
import InlineSvg from "vue-inline-svg";

export default {
  name: "sidebar-item",
  components: {
    InlineSvg,
  },
  props: {
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  inject: {
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: true,
    };
  },
  methods: {
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style>
.icon-menu {
  margin-right: 10px;
}
</style>
