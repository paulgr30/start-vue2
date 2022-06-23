import Vue from "vue";

export default {
  setToken({ commit }, data) {
    commit("setToken", data);
  },
  setAuthenticated({ commit }, data) {
    commit("setAuthenticated", data);
  },
  setAuth({ commit }, data) {
    commit("setAuth", data);
  },

  async login({ commit, dispatch, state }, credentials) {
    try {
      commit("setToken", null);
      commit("setAuthenticated", false);
      let response = await Vue.axios.post("auth/login", credentials);
      if (response) {
        commit("setToken", response.data.token);
        await dispatch("profile");

        commit("setAuthenticated", true);
        Vue.router.push({ name: "about" });
      }
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async profile({ state, commit }) {
    try {
      let response = await Vue.axios.get("auth/profile");
      if (response) {
        commit("setAuth", response.data);
        // Creamos array con los permisos
        let permissions = Vue.services.getArrayByKey(
          state.auth.roles[0].permissions,
          "name"
        );
        // Asignamos los roles y permisos a la libreria vue-gates
        Vue.gates.setRoles(state.auth.roles[0].name);
        Vue.gates.setPermissions(permissions);
      }
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async updateProfile({ commit }, data) {
    try {
      let response = await Vue.axios.put("auth/update-profile", data);
      if (response) {
        commit("setAuth", response.data);
      }
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async changePassword({ commit, dispatch }, data) {
    try {
      await Vue.axios.post("auth/change-password", data);
      await dispatch("logout");
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async refreshToken({ commit, dispatch, state }) {
    try {
      if(!state.token || !state.authenticated) {
        commit("setToken", null);
        commit("setAuthenticated", false);
        commit("setAuth", {});
        Vue.router.push({ name: "login" });
      }
      console.log("iniciamos la accion...");
      let response = await Vue.axios.post("auth/refresh-token", {'id': state.auth.id});
      if (response) {
        commit("setToken", response.data.token);
      }
    } catch (err) {
      console.log(err);
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
        errors: err.response.data.errors ? err.response.data.errors : {},
      };
      throw error;
    }
  },
  async logout({ commit }) {
    await Vue.axios.get("auth/logout");
    commit("setToken", null);
    commit("setAuthenticated", false);
    commit("setAuth", {});
    Vue.router.push({ name: "login" });
  },
};
