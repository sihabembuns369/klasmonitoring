import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import ArgonDashboard from "./plugins/argon-dashboard";
import VueProgressBar from "vue-progressbar";
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import Swal from "sweetalert2";
import underscore from "vue-underscore";
import Vuetify from "vuetify";
import VueMeta from "vue-meta";
import "leaflet/dist/leaflet.css";
import { store } from "./store";
import columnSortable from "vue-column-sortable";
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.prototype.$Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
});
Vue.prototype.$Toast = Toast;
Vue.use(underscore);
require("./method");
Vue.use(Vuetify);
Vue.use(BootstrapVue);
window.$ = window.jQuery = require("jquery");
Vue.prototype.$jQuery = require("jquery");
Vue.use(VueMeta);
Vue.use(columnSortable);

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "2px",
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("token"));
    if (!authUser || !authUser.token) {
      next({ name: "login" });
    } else if (to.meta.govAuth) {
      const authUser = JSON.parse(window.localStorage.getItem("token"));
      if (authUser.meta.token_type == "goverment") {
        next();
      } else {
        next("/#/sekolah");
      }
    }
  } else if (to.meta.schoolAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("token"));
    if (authUser.meta.token_type == "school") {
      next();
    } else {
      next("/#/pemerintah");
    }
  } else {
    next();
  }
});

Vue.use(ArgonDashboard);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
