import axios from "axios";
export const removeFromHistory = async (video, token) => {
	return await axios.delete(`/api/user/history/${video._id}`, {
		headers: { authorization: token },
	});
};
