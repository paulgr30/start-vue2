import Vue from 'vue';

export default {
    setAuthenticated(state, value) {
        state.authenticated = value;
    },
    setToken(state, value) {
        state.token = value;
    },
    setAuth(state, value) {
        state.auth = value;
    },
}