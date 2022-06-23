export default {
	isLoading: state => state.isLoading,
	roles: state => Object.values(state.roles),
	currentRole: state => state.role,
	totalRecords: state => state.totalRecords,
	numberPages: state => state.totalRecords > 0 ? Math.ceil(state.totalRecords / state.perPage) : 1,
	currentPage: state => state.search.page,
}