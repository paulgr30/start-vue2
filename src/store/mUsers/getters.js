export default {
	isLoading: state => state.isLoading,
	users: state => Object.values(state.users),
	currentUser: state => state.user,
	totalRecords: state => state.totalRecords,
	numberPages: state => state.totalRecords > 0 ? Math.ceil(state.totalRecords / state.search.perPage) : 1,
	currentPage: state => state.search.page,
}