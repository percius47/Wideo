import React, { useState } from 'react'
import "../pages/Explore.css"
import "./VideoList.css"
import { useVideoListing } from '../context/listing-context';
import { getSearchedVideos } from '../util/getSearchedVideos';
import { sortByDate, sortDate } from '../util/sortDate';
import { useNavigate } from 'react-router-dom';
import { VideoCard } from './VideoCard';
function VideoList() {
    const {
		videoListingState: {
			data,
			categories,
			selectedCategory,
			sortBy,
			searchText,
		},
		videoListingDispatch,
		videoListingLoader,
		videoListingError,
	} = useVideoListing();
	const navigate = useNavigate();
	videoListingError && navigate("/error");
	let videoList = [...data];

	if (searchText) {
		videoList = getSearchedVideos(videoList, searchText);
	}
	const filteredVideoList = selectedCategory
		? videoList.filter((item) => item.category === selectedCategory)
		: videoList;
	const finalVideoList = sortDate(filteredVideoList, sortBy);

	const videoOptionsDispatchCall = (val) => {
		videoListingDispatch({ type: "FILTER", payload: { category: val } });
	};
	const [sortOptions, setSortOptions] = useState(false);

  return (
    <div className="explore-video">
    <div className="explore-filters">
        <div className="chip-container">
            <span
                className={`chip ${selectedCategory ? "" : "chip-active"}`}
                onClick={() => videoOptionsDispatchCall("")}
            >
                All
            </span>
            {categories.map((category) => (
                <span
                    className={`chip ${
                        selectedCategory === category.categoryName
                            ? "chip-active"
                            : ""
                    }`}
                    onClick={() => videoOptionsDispatchCall(category.categoryName)}
                    key={category.id}
                >
                    {category.categoryName}
                </span>
            ))}
        </div>

     
    </div>

    <div className="grid-video">
        {finalVideoList?.map((video) => (
            <VideoCard key={video.id} video={video} />
        ))}
    </div>
</div>
  )
}

export default VideoList