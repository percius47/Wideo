import axios from "axios";

export const addToLikes = async (video, token) => {
	return await axios.post(
		"/api/user/likes",
		{ video },
		{ headers: { authorization: token } }
	);
};
