import axios from "axios";

export const addToHistory = async (video, token) => {
	return await axios.post(
		"/api/user/history",
		{ video },
		{ headers: { authorization: token } }
	);
};
