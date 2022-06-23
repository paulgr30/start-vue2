import Vue from 'vue';

export default {
    setSearchValue(state, value) {
        state.search.searchValue = value;
    },
    setPage(state, value) {
        state.search.page = value;
    },
    setPerPage(state, value) {
        state.search.perPage = value;
    },
    setIsAllLoading(state, value) {
        state.isAllLoading = value;
    },
    setIsLoading(state, value) {
        state.isLoading = value;
    },
    setUsers(state, payload) {
        state.users = payload;
    },
    setRoles(state, payload) {
        state.roles = payload;
    },
    setCurrentUser(state, payload) {
        state.user = payload;
    },
    setTotalRecords(state, total) {
        state.totalRecords = total;
    },
}