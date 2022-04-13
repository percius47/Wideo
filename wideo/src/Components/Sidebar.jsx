import React from 'react'
import "./Sidebar.css"
import {NavLink} from "react-router-dom"
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
function Sidebar() {
 
  return (
    
        <aside class="aside-nav">
			<ul className="txt-mid aside-items">
				<NavLink to="/explore">
					<li className="flex-column   ">
					<ExploreRoundedIcon className='aside-icon'/>Explore
					</li>
				</NavLink>

				<NavLink to="/playlist">
					<li className="flex-column   ">
						<SubscriptionsRoundedIcon className='aside-icon'/> Playlists
					</li>
				</NavLink>
				<NavLink to="/likes">
					<li className="flex-column   ">
						<ThumbUpRoundedIcon className='aside-icon'/>Liked
					</li>
				</NavLink>
				<NavLink to="/watchLater">
					<li className="flex-column   ">
						<BookmarkRoundedIcon className='aside-icon'/>Watch Later
					</li>
				</NavLink>
				<NavLink to="/history">
					<li className="flex-column   ">
                     <RestoreRoundedIcon className='aside-icon'/>   History
					</li>
				</NavLink>
			</ul>
		</aside>
 
  )
}

export default Sidebar