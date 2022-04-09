import axios from "axios";

export const getWatchLater = async (token) => {
	return axios.get("/api/user/watchlater", {
		headers: { authorization: token },
	});
};
