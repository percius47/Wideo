
export const videoListingReducer = (state, action) => {

	switch (action.type) {
		case "LOAD_DATA":
			return {
				...state,
				data: action.payload.videos,
				categories: action.payload.categories,
			};
		case "FILTER":
			return {
				...state,
				selectedCategory: action.payload.category,
			};
		case "SORT_VIDEOS":
			return {
				...state,
				sortBy: action.payload.sortBy,
			};
		case "SEARCH": {
			return {
				...state,
				searchText: action.payload.searchInput,
			};
		}
		default:
			return state;
	}
};
