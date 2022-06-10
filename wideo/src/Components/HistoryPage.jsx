import React from 'react'
import "./HistoryPage.css"
import PlaylistElement from './PlaylistElement';
import Sidebar from './Sidebar'
import { useUserData } from '../context/data-context';
import { useCustomPlaylist } from '../custom-hooks/useCustomPlaylist';
import { removeFromHistory } from '../services/history/removeFromHistory';
import { deleteHistory } from '../services/history/deleteHistory';
import { PlaylistVideo } from './PlaylistVideo';

function HistoryPage() {
    const {
		userData: { history },
		historyLoading,
	} = useUserData();

	

	const [clearHistoryServerCall] = useCustomPlaylist(
		deleteHistory,
		history,
		"SET_HISTORY",
		"Cleared History"
	);
  return (
    <div className="hist-container">
    <Sidebar className="hist-sidebar"/>

           
           <div className="hist-video">
          <div className="hist-heading">
          <h2>Watch History</h2>
           <span
						className=" pointer hist-clear "
						onClick={() => clearHistoryServerCall()}
					>
						Clear Watch History
					</span>
          </div>
           <div className="hist-list">
               {history.length === 0 ? (
                   <p>No Videos in History.</p>
               ) : (
                   history.map((video) => (
                       <PlaylistVideo video={video} playlistType="History"
                       playlist={history}
                       />
                      
                   ))
               )}
           </div>
           </div>
       </div>
  )
}

export default HistoryPage