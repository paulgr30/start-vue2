/* vee-validate */
import { localize } from "@vee-validate/i18n";
import { setLocale } from "@vee-validate/i18n";
import es from "@vee-validate/i18n/dist/locale/es.json";
import { configure } from "vee-validate";
import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules";


configure({
  generateMessage: localize({ es })
})
setLocale("es")

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
})