import React from 'react'
import "./PlaylistCard.css"
import { useNavigate } from 'react-router-dom';
import { useCustomPlaylist } from '../custom-hooks/useCustomPlaylist';
import { removePlaylistService } from '../services/playlist/removePlaylist';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
export const PlaylistCard = ({ playlist }) => {
	const navigate = useNavigate();

	const [removePlaylistServerCall] = useCustomPlaylist(
		removePlaylistService,
		playlist,
		"SET_PLAYLISTS",
		`Deleted ${playlist.title}`
	);
	console.log("playlist in card",playlist);
	return ( 
		<div className="play-card pointer">
			<div
				className="playlist-card-img"
				onClick={() => navigate(`/playlist/${playlist._id}`)}
			>
				<img
					src={
						playlist.videos.length === 0
							? "/assets/novideos.png"
							: playlist.videos[0].thumbnail
					}
					className="play-img"
				/>
				<div className="card-overlay">{playlist.videos.length}</div>
			</div>

			<div className="playlist-name">
				<span className="text-s">{playlist.title}</span>
				<DeleteRoundedIcon 
					onClick={() => removePlaylistServerCall()}
				/>
			</div>
		</div>
	);
};