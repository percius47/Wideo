import React from 'react'
import "./Navbar.css"

import {NavLink} from "react-router-dom"

import PersonIcon from '@mui/icons-material/Person';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { toast } from "react-hot-toast";
import { useAuth } from '../context/auth-context';
import {  useNavigate } from "react-router-dom";
import { useState } from "react";



import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { useVideoListing } from '../context/listing-context';
function Navbar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
	const {
		videoListingState: { searchText },
		videoListingDispatch,
	} = useVideoListing();
	

	const [typing, setTyping] = useState(false);

  return (
        
    <div class="header-wrapper">
        <div class="header-logo" >
            
            <NavLink to="/" class="nav-logo-link">
            <h1 class="header-logo-text">Wideo</h1>
                <PlayArrowRoundedIcon className="cta-nav-logo"/>
          
        </NavLink>
        </div>
      
      {/* mobile-menu-hamburger */}

  

    <div className="header-search search-input">
        <input
            type="text"
            placeholder="Search Videos"
            value={searchText}
            onChange={(e) => {
                navigate("/explore");
                setTyping(true);
                videoListingDispatch({
                    type: "SEARCH",
                    payload: { searchInput: e.target.value },
                });
            }}
        />
        <button className='search-btn'>
            <div></div>
           {
                    typing && searchText
                        ? <CloseRoundedIcon className='pointer'
                        alt="search"
                        onClick={() => {
                            setTyping(false);
                            videoListingDispatch({
                                type: "SEARCH",
                                payload: { searchInput: "" },
                            });
                        }}/>
                        : <SearchRoundedIcon
                        className='pointer'
                        />
                }
               
            
        </button>
    </div>


    {auth.isAuthVL ? (
					 <div class="header-options"onClick={()=>{
                        localStorage.removeItem("tokenVL");
                        localStorage.removeItem("isAuthVL");
                        setAuth({ tokenVL: "", isAuthVL: false });
                        navigate("/explore");
                        toast.success("Logged out!")
                     }}>
						<NavLink to="/login" className=" ">
							
                        <button
             className="header-login btn btn-outline">Logout </button>
						</NavLink>
					</div>
				) : (
                    <div class="header-options">
						<NavLink to="/login" className="flex-column ">
						
                        <button
             className="header-login btn btn-outline"
             onClick={()=>{
                toast.success("Logged in!")
             }}
             >Login</button>
						</NavLink>
					</div>
				)}


          
         
</div>

 
  )
}

export default Navbar