import axios from "axios";

export const getLikes = async (token) => {
	return await axios.get("/api/user/likes", {
		headers: { authorization: token },
	});
};
