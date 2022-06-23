"use strict";
import Vue from "vue";
import axios from "axios";

// configuración de axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
// interceptor de solicitud http (Enviar Peticion)
axios.interceptors.request.use(
  (config) => {
    config.headers.common["X-Requested-With"] = "XMLHttpRequest";
    config.headers.common["Content-Type"] = "multipart/form-data"; //"application/json";
    config.headers.common["Acept"] = "application/json";
    config.headers.common["authorization"] = `Bearer ${Vue.store.state.mAuths.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor de respuesta http
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error.response);
    if (error.response) {
      const originalRequest = error.config;
      console.log(originalRequest.url);
      if (
        error.response.status === 401 &&
        originalRequest.url === "auth/refresh-token"
      ) {
        Vue.store.dispatch("mAuths/setToken", null);
        Vue.store.dispatch("mAuths/setAuthenticated", false);
        Vue.store.dispatch("mAuths/setAuth", {});

        Vue.router.push({ name: "login" });
        return Promise.reject(error);
      }


      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log("refrescamos el token...");
        await Vue.store.dispatch("mAuths/refreshToken");
        axios.defaults.headers.common[
          "authorization"
        ] = `Bearer ${Vue.store.state.mAuths.token}`;

        console.log(Vue.store.state.mAuths.token);
        originalRequest.headers.authorization = `Bearer ${Vue.store.state.mAuths.token}`;

        return await axios(originalRequest);
      } /* else {
        Vue.store.dispatch("mAuths/setToken", null);
        Vue.store.dispatch("mAuths/setAuthenticated", false);
        Vue.store.dispatch("mAuths/setAuth", {});

        Vue.router.push({ name: "login" }).catch(() => {});
      }*/
    }
    return Promise.reject(error);
  }
);

Vue.axios = axios;
Vue.prototype.$axios = axios;
export default axios;
