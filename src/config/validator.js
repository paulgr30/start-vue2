import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/es.json";
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

/*
import { localize } from "vee-validate";
import es from "vee-validate/dist/locale/es.json";

// Install and Activate the Arabic locale.
localize({es});
// Install and Activate the Arabic locale.
localize('es', es);

*/

import { configure } from "vee-validate";
Vue.component("configure");

configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid",
    dirty: ["is-dirty", "is-dirty"], // multiple classes per flag!
    // ...
  },
});
