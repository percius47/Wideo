import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";





import { getLikes } from "../services/likes/getLikes";
import { useAuth } from "./auth-context";
import { userDataReducer } from "../reducers/dataReducer";
import { getWatchLater } from "../services/watchlist/getWatchLater";
import { getAllPlaylistsHandler } from "../backend/controllers/PlaylistController";
import { fetchHistory } from "../services/history/fetchHistory";
const userDataContext = createContext();
const useUserData = () => useContext(userDataContext);
const UserDataProvider = ({ children }) => {
	const [userData, userDataDispatch] = useReducer(userDataReducer, {
		likesPlaylist: [],
		watchLaterPlaylist: [],
		history: [],
		playlists: [],
	});

	const [historyLoading, setHistoryLoading] = useState(false);
	const [likesLoading, setLikesLoading] = useState(false);
	const [watchLaterLoading, setWatchLaterLoading] = useState(false);
	const [otherPlaylistLoading, setOtherPlaylistLoading] = useState(false);
	const [error, setError] = useState(false);
	
	const { auth } = useAuth();

	useEffect(() => {
		auth.isAuthVL &&
			(async () => {
				setLikesLoading(true);
				try {
					const res = await getLikes(auth.tokenVL);
					setLikesLoading(false);
					if (res.status === 200) {
						userDataDispatch({
							type: "SET_LIKES",
							payload: { data: res.data },
						});
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setWatchLaterLoading(true);
				try {
					const res = await getWatchLater(auth.tokenVL);
						
					if (res.status === 200) {
						console.log("res data",res);
						userDataDispatch({
							type: "SET_WATCHLATER",
							payload: { data: res.data },
						});
						setWatchLaterLoading(false);
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setOtherPlaylistLoading(true);
				try {
					const res = await getAllPlaylistsHandler(auth.tokenVL);
					console.log("playlist", res);
					if (res.status === 200) {
						userDataDispatch({
							type: "SET_PLAYLISTS",
							payload: { data: res.data },
						});
						setOtherPlaylistLoading(false);
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
		auth.isAuthVL &&
			(async () => {
				setHistoryLoading(true);
				try {
					const res = await fetchHistory(auth.tokenVL);
					console.log("in history playlists", res.data);
					if (res.status === 200) {
						userDataDispatch({
							type: "SET_HISTORY",
							payload: { data: res.data },
						});
						setHistoryLoading(false);
					}
				} catch (err) {
					console.log("error", err);
				}
			})();
	}, [auth.isAuthVL]);

	return (
		<userDataContext.Provider
			value={{
				userData,
				userDataDispatch,
				error,
				historyLoading,
				watchLaterLoading,
				likesLoading,
				otherPlaylistLoading,
			}}
		>
			{children}
		</userDataContext.Provider>
	);
};

export { UserDataProvider, useUserData };
