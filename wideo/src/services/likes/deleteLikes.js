import axios from "axios";
export const deleteLikes = async (video, token) => {
	return await axios.delete(`/api/user/likes/${video._id}`, {
		headers: { authorization: token },
	});
};
