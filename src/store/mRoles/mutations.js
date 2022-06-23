import Vue from 'vue';

export default {
    setSearchValue(state, value) {
        state.search.searchValue = value;
    },
    setSort(state, value) {
        state.search.sort = value;
    },
    setPage(state, value) {
        state.search.page = value;
    },
    setPerPage(state, value) {
        state.perPage = value;
    },
    setIsAllLoading(state, value) {
        state.isAllLoading = value;
    },
    setIsLoading(state, value) {
        state.isLoading = value;
    },
    setRoles(state, payload) {
        state.roles = payload;
    },
    setCurrentRole(state, payload) {
        state.role = payload;
    },
    setTotalRecords(state, total) {
        state.totalRecords = total;
    },
}