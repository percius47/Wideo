export const checkPlaylist = (video, playlist) => {
	return playlist.find((item) => item.id === video.id);
};
 