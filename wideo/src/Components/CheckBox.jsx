import { useCustomPlaylist } from "../custom-hooks/useCustomPlaylist";
import { addToPlaylist } from "../services/playlist/addtoPlaylist";
import { removeFromPlaylist } from "../services/playlist/removeFromPlaylist";



export const CheckBox = ({ exists, playlist, video }) => {

	const [addToPlaylistServiceCall] = useCustomPlaylist(
		addToPlaylist,
		playlist,
		"SET_PLAYLIST",
		`Added to ${playlist.title}`,
		video
	);
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylist,
		playlist,
		"SET_PLAYLIST",
		`Removed from ${playlist.title}`,
		video
	);
	const checkBoxHandler = () => {
		exists ? removeFromPlaylistServerCall() : addToPlaylistServiceCall();
	};
	return (
		<input
			type="checkbox"
			
			checked={exists?.id === video.id}
			onChange={() => checkBoxHandler(exists, playlist)}
		/>
	);
};
