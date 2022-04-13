import { useState } from "react";

import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth-context";
import { useUserData } from "../context/data-context";

export const useCustomPlaylist = (
	serviceFunction,
	playlist,
	action,
	msg,
	video = null
) => {
	const [updatingPlaylist, setUpdatingPlaylist] = useState(false);
	const { userDataDispatch } = useUserData();
	const { auth } = useAuth();
	const customPlaylistUpdateCall = async () => {
		setUpdatingPlaylist(true);
		try {
			let res;
			if (video) {
				res = await serviceFunction(playlist, video, auth.tokenVL);
			} else {
			
				res = await serviceFunction(playlist, auth.tokenVL);
				
			}

			if (res.status === 201 || 200) {
				toast.success(msg);
				setUpdatingPlaylist(false);

				userDataDispatch({
					type: action,
					payload: { data: res.data },
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
	return [customPlaylistUpdateCall, updatingPlaylist, setUpdatingPlaylist];
};
