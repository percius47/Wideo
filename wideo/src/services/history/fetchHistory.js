import axios from "axios";

export const fetchHistory = async (token) => {
	return await axios.get("/api/user/history", {
		headers: { authorization: token },
	});
};
