import axios from "axios";

export const getWatchLater = async (token) => {
	return await axios.get("/api/user/watchLater", {
		headers: { authorization: token },
	});
};
