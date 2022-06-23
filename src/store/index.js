import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import Vuex from "vuex";
Vue.use(Vuex);

import { mAuths } from "./mAuths";
import { mUsers } from "./mUsers";
import { mRoles } from "./mRoles";

const store = new Vuex.Store({
  /* Evita que mutes el estado directamente,
    por lo que solo se puede mutar el estado usando mutaciones.*/
  strict: true,
  plugins: [createPersistedState({ paths: ["mAuths"] })],

  // Agregamos los modulos
  modules: {
    namespaced: true,
    mAuths,
    mUsers,
    mRoles,
  },
});

Vue.store = store;
export default store;