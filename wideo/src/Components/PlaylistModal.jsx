import React, { useEffect, useState } from 'react'
import "./PlaylistModal.css"
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useUserData } from '../context/data-context';
import { useCustomPlaylist } from '../custom-hooks/useCustomPlaylist';
import { addPlaylist } from '../services/playlist/createPlaylist';
import { checkPlaylist } from '../util/checkPlaylist';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { CheckBox } from './CheckBox';
function PlaylistModal({ val, setOpened, video }) {
    const [isOpen, setIsOpen] = useState(false);
	const [adding, setAdding] = useState(false);
	const {
		userData: { playlists },
	} = useUserData();

	const [playlistTitle, setPlaylistTitle] = useState("");
	const [addPlaylistServerCall] = useCustomPlaylist(
		addPlaylist,
		{ playlist: { title: playlistTitle, videos: [{ ...video }] } },
		"SET_PLAYLISTS",
		`${playlistTitle} playlist created and video added`
	);
   
   
	useEffect(() => setIsOpen(val));
  return (
      <>
      {isOpen &&
    < div className="modal-parent">
    <div className="modal-child-1">

      
        <div	
 
       className='modal-heading'
       >
   
        <span  className='mobile-menu-list-item '>
       
       Save video to
      
         </span>
         <HighlightOffRoundedIcon
         onClick={() => {
            setIsOpen(false);
            setOpened(false);
        }}
         />
            </div>
       <ul>
       {playlists.map((playlist) => {
								const exists = checkPlaylist(video, playlist.videos);
								return (
									<li className="playlist-modal-item ">
                                     <CheckBox
											key={playlist._id}
											exists={exists}
											playlist={playlist}
											video={video}
										/>
									
										{playlist.title}
									</li>
								);
							})}
       </ul>
       {adding ? (
							<div className="modal-input-div">
								<input
									className="modal-input"
									placeholder="Enter Name"
									value={playlistTitle}
									onChange={(e) => setPlaylistTitle(e.target.value)}
								/>
								<span  role="button">
									<button className="create-btn pointer"
										onClick={() => {
											addPlaylistServerCall();
											setAdding(false);
										}}
									>
										CREATE
									</button>
								</span>
							</div>
						) : (
							<div
								className="modal-btn"
								onClick={() => setAdding(true)}
							>
							<BookmarkAddRoundedIcon/>
								<span className=" padding-xxs ">Create new playlist</span>
							</div>
						)}
       
    </div>
 </div>
        }
        </>
  )
}

export default PlaylistModal