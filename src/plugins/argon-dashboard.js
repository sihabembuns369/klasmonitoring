import "@/assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/nucleo/css/style.css";
import "@/assets/vendor/nucleo/css/font-size.css";
import "@/assets/scss/argon.scss";
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import SidebarPlugin from "@/components/SidebarPlugin/index";
import NotificationPlugin from "@/components/NotificationPlugin/index";

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(SidebarPlugin);
    Vue.use(NotificationPlugin);
  },
};
