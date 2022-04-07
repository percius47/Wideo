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

	const logoutHandler = () => {
		localStorage.removeItem("tokenVL");
		localStorage.removeItem("isAuthVL");
		setAuth({ tokenVL: "", isAuthVL: false });
		navigate("/explore");
	};
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
           {
                    typing && searchText
                        ? <CloseRoundedIcon/>
                        : <SearchRoundedIcon
                        alt="search"
                        onClick={() => {
                            setTyping(false);
                            videoListingDispatch({
                                type: "SEARCH",
                                payload: { searchInput: "" },
                            });
                        }}
                        />
                }
               
            
        </button>
    </div>


    {auth.isAuthVL ? (
					 <div class="header-options"onClick={logoutHandler}>
						<NavLink to="/login" className=" ">
							
                        <button
             className="header-login btn btn-outline">Logout </button>
						</NavLink>
					</div>
				) : (
                    <div class="header-options">
						<NavLink to="/login" className="flex-column ">
						
                        <button
             className="header-login btn btn-outline">Login</button>
						</NavLink>
					</div>
				)}


             {auth?( 
             <NavLink to="/logout">
                 <button
             className="header-login btn btn-outline"
          
          
             onClick={() => {
               localStorage.removeItem("token");
               localStorage.setItem("isAuth", false);
               setAuth(false);
               toast.success("Logged out!")}}
            >
                Logout
                </button>
           
            </NavLink>):(
                <NavLink to="/login">
                <button class="header-login btn btn-outline"
                
              
            
                 onClick={() => {
                   localStorage.removeItem("token");
                   localStorage.setItem("isAuth", false);
                   setAuth(false);
                   toast.success("Logged in!")
            }}
                >
                    Login
                </button>
                </NavLink>

            )}
         
</div>

 
  )
}

export default Navbar