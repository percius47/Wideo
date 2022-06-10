
export const userDataReducer = (state, action) => {


	switch (action.type) {
		case "SET_LIKES":
			const likes = action.payload.data.likes;
			return {
				...state,
				likesPlaylist: [...likes],
			};
		case "SET_WATCHLATER":
			const watchlater = action.payload.data.watchlater;
	
			return {
				...state,
				watchLaterPlaylist: [...watchlater],
			};
		case "SET_HISTORY":
			const history = action.payload.data.history;
			return {
				...state,
				history: [...history],
			};
		case "SET_PLAYLISTS":
			const data = action.payload.data.playlists;

			return {
				...state,
				playlists: [...data],
			};
		case "SET_PLAYLIST":
			const playlistVal = action.payload.data.playlist;

			const newPlaylist = state.playlists.map((currPlaylist) =>
				currPlaylist._id === playlistVal._id ? playlistVal : currPlaylist
			);
			return {
				...state,
				playlists: newPlaylist,
			};
	}
};
