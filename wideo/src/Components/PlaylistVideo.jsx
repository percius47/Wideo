import { usePlaylist } from "../custom-hooks/usePlaylist";
import { deleteLikes } from "../services/likes/deleteLikes";
import {removeWatchLater} from "../services/watchlist/removeWatchLater";
import {removeFromHistory} from "../services/history/removeFromHistory"
import { removeFromPlaylist } from "../services/playlist/removeFromPlaylist";
import { useCustomPlaylist } from "../custom-hooks/useCustomPlaylist";
import DeleteRounded from "@mui/icons-material/DeleteRounded";

export const PlaylistVideo = ({ video, playlistTitle, playlist }) => {
	

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
		`Removed from ${playlist?.title}`,
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
                console.log("remove");
				removeFromPlaylistServerCall();
		}
	};
	return (
		<div class=" playlist-video pointer">
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
