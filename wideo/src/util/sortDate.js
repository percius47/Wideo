
export const sortDate = (videosList, operation) => {
	const videos = [...videosList];

	if (operation === "NEWEST")
		return videos.sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded));
	else if (operation === "OLDEST")
		return videos.sort((a, b) => new Date(a.uploaded) - new Date(b.uploaded));
	else return videos;
};
