import axios from "axios";
export const removeFromPlaylist = async (playlist, video, token) => {
	return await axios.delete(
		`/api/user/playlists/${playlist._id}/${video._id}`,
		{
			headers: { authorization: token },
		}
	);
};
