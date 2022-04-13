import axios from "axios";

export const fetchAllPlaylists = async (token) => {
	return await axios.get("/api/user/playlists", {
		headers: { authorization: token },
	});
};
