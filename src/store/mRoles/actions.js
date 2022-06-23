import Vue from "vue";

export default {
  setRole({ commit }, data) {
    commit("setCurrentRole", data);
  },
  setPerPage({ commit }, perPage) {
    commit("setPerPage", perPage);
  },
  setSearchValue({ commit }, data) {
    commit("setSearchValue", data);
  },
  setSort({ commit }, data) {
    commit("setSort", data);
  },
  setPage({ commit }, data) {
    commit("setPage", data);
  },

  async getRoles({ commit }) {
    try {
      commit("setRoles", {});
      let response = await Vue.axios.get("roles");
      if (response) {
        commit("setRoles", response.data);
      }
    } catch (err) {
      let error = {
        code: err.response.status,
        statusText: err.response.statusText,
        message: err.response.data.message,
      };
      throw error;
    }
  },
};
