import { useState } from "react";

import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth-context";
import { useUserData } from "../context/data-context";

export const usePlaylist = (serviceFunction, video, action, msg) => {
	const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
	const { userDataDispatch } = useUserData();

	const { auth } = useAuth();
	const playlistUpdateCall = async () => {
		setUpdatingPlaylist(true);
		try {
			const res = await serviceFunction(video, auth.tokenVL);

			if (res.status === 201 || 200) {
				msg && toast.success(msg);
				setUpdatingPlaylist(false);
				userDataDispatch({
					type: action,
					payload: { data: res.data },
				});
			}
		} catch (err) {
			toast.error("Error!")
			console.log(err);
		}
	};
	return [playlistUpdateCall, updatingPlaylist, setUpdatingPlaylist];
};
