import Vue from "vue";
import "./axios";
import "./services";
import "./validator";
//import VueGates from "vue-gates";
import "../assets/css/_custom.css";



// import fortawesome
import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";

//import adminlte scripts
import "admin-lte/dist/js/adminlte.min.js";
//import "../node_modules/admin-lte/plugins/select2/js/select2.full.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";
//import "../node_modules/admin-lte/plugins/jquery/jquery.min.js";
//import adminlte styles
import "admin-lte/dist/css/adminlte.min.css";

// Import Bootstrap - BootstrapVue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";





library.add(fas, fab, far, faLock, faEnvelope, faFacebook, faGooglePlus);
dom.watch();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


import VueGates from "vue-gates";
Vue.use(VueGates, {
  persistent: true,
});


//import "vue-select/dist/vue-select.css";