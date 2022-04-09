import axios from "axios";

export const addToWatchLater = async (video, token) => {
	console.log("inside add service");
	return await axios.post(
		"/api/user/watchlater/",
		{ video },
		{ headers: { authorization: token } }
	);
};
