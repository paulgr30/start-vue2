import Vue from "vue";

export default {
  setUser({ commit }, data) {
    commit("setCurrentUser", data);
  },
  setPerPage({ commit }, perPage) {
    commit("setPerPage", perPage);
  },
  setSearchValue({ commit }, data) {
    commit("setSearchValue", data);
  },
  setPage({ commit }, data) {
    commit("setPage", data);
  },

  async getByCriteria({ state, commit }) {
    try {
      commit("setUsers", {});
      let response = await Vue.axios.get("users/bycriteria", {
        params: state.search,
      });
      if (response) {
        commit("setUsers", response.data.data);
        commit("setTotalRecords", response.data.total);
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
  async getRoles({ commit }) {
    try {
      commit("setRoles", {});
      let response = await Vue.axios.get("users/roles");
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
  async addOrUpdate({ dispatch }, data) {
    try {
      data.id
        ? await Vue.axios.put("users/" + data.id, data)
        : await Vue.axios.post("users", data);

      await dispatch("getByCriteria");
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
  async destroy({ state, dispatch }, id) {
    try {
      await Vue.axios.delete("users/" + id);
      dispatch("getByCriteria");
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
};
