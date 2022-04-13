import axios from "axios";
export const deleteHistory = async (_, token) => {
	return await axios.delete("/api/user/history/all", {
		headers: { authorization: token },
	});
};
