import { usePlaylist } from "../custom-hooks/usePlaylist";
import { deleteLikes } from "../services/likes/deleteLikes";
import {removeWatchLater} from "../services/watchlist/removeWatchLater";
import {removeFromHistory} from "../services/history/removeFromHistory"
import { removeFromPlaylist } from "../services/playlist/removeFromPlaylist";
import {updateVideoCountService} from "../services/updateVideoCountService"
import { useCustomPlaylist } from "../custom-hooks/useCustomPlaylist";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import {useVideoListing} from "../context/listing-context"
import { addToHistory } from "../services/history/addToHistory";
export const PlaylistVideo = ({ video, playlistTitle, playlist }) => {
	
	const navigate = useNavigate();
	const { videoListingDispatch } = useVideoListing();

	const { isAuth } = useAuth();
	const [removeFromLikesServerCall] = usePlaylist(
		deleteLikes,
		video,
		"SET_LIKES",
		"Removed from Likes"
	);
	 
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylist,
		playlist,
		"SET_PLAYLIST",
		`Removed from ${playlist.title}`,
		video
	);
	const [removeFromWatchLaterServiceCall] = usePlaylist(
		removeWatchLater,
		video,
		"SET_WATCHLATER",
		"Removed from Watch Later"
	);
	const [removeFromHistoryServiceCall] = usePlaylist(
		removeFromHistory,
		video,
		"SET_HISTORY",
		"Removed from History"
	);
	
	const removeVideoHandler = () => {
		switch (playlistTitle) {
			case "Likes":
				removeFromLikesServerCall();
				break;
			case "Watch Later":
				removeFromWatchLaterServiceCall();
				break;
			case "History":
				removeFromHistoryServiceCall();
				break;
			default:
               
				removeFromPlaylistServerCall();
		}
	};
	const updateVideoCountServerCall = async () => {
		try {
			const res = await updateVideoCountService(video);
			if (res.status === 200) {
				const videos = res.data.videos;
				videoListingDispatch({
					type: "SET_VIDEOS",
					payload: { videos },
				});
			}
		} catch (err) {
			toast.error("Sorry! There was a problem");
			console.log(err);
		}
	};

	const [addToHistoryServerCall] = usePlaylist(
		addToHistory,
		video,
		"SET_HISTORY",
		""
	);


	return (
		<div class=" playlist-video pointer"
		onClick={async () => {
			updateVideoCountServerCall();
			{
				isAuth && addToHistoryServerCall();
			}
			navigate(`/explore/${video.id}`);
		}}
		>
			<div class="img-container">
				<img src={video.thumbnail} alt="product image" class="single-img" />
			</div>
			<div className="single-content ">
				<div className="single-description">
                <h3>{video.title}</h3>

				<span >{video.creator}</span>
                </div>
			
			<div class="flex-center">
				<DeleteRounded
					onClick={() => removeVideoHandler()}
				/>
                </div>
			</div>
		</div>
	);
};
