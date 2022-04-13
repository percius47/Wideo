import axios from "axios";
export const removeWatchLater = async (video, token) => {
	return await axios.delete(`/api/user/watchlater/${video._id}`, {
		headers: { authorization: token },
	});
};
