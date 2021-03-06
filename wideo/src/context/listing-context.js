import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
} from "react";





import { getVideoListingService } from "../services/listingServices";
import { getCategoriesService } from "../services/categoryService";
import { videoListingReducer } from "../reducers/listingReducer";
const VideoListingContext = createContext();
const useVideoListing = () => useContext(VideoListingContext);

const VideoListingProvider = ({ children }) => {
	const [videoListingState, videoListingDispatch] = useReducer(
		videoListingReducer,
		{
			data: [], 
			categories: [],
			selectedCategory: "",
			sortBy: "",
			searchText: "",
		}
	);
	const [videoListingLoader, setVideoListingLoader] = useState(false);
	const [videoListingError, setVideoListingError] = useState(false);
	
	useEffect(() => {
		(async () => {
			try {
				let res = await getVideoListingService();
				let resCat = await getCategoriesService();
				setVideoListingLoader(true);

				if (res.status === 200) {
					let videos = res.data.videos;
					let categories = resCat.data.categories;
					videoListingDispatch({
						type: "LOAD_DATA",
						payload: { videos, categories },
					});
					setVideoListingLoader(false);
					setVideoListingError(false);
				}
			} catch (err) {
				setVideoListingError(true);
			}
		})();
	}, []);

	return (
		<VideoListingContext.Provider
			value={{
				videoListingState,
				videoListingDispatch,
				videoListingLoader,
				videoListingError,
			}}
		>
			{children}
		</VideoListingContext.Provider>
	);
};

export { useVideoListing, VideoListingProvider };
