import React from 'react'
import "./Navbar.css"

import {NavLink} from "react-router-dom"

import PersonIcon from '@mui/icons-material/Person';

import { Toaster } from "react-hot-toast";
import { useAuth } from '../context/auth-context';
import { Link, useNavigate } from "react-router-dom";
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
        
    <nav className="nav-bar">
        <Toaster/>
    <div className="nav-bar-primary">
        <NavLink to="/explore" className="nav-bar-logo">
        <PlayArrowRoundedIcon/>
          Wideo
        </NavLink>

        <ul className="nav-bar-links">
            <li>
                <NavLink to="/explore">Explore</NavLink>
            </li>
            <li>
                <NavLink to="/playlists">Playlists</NavLink>
            </li>
        </ul>
    </div>

    <div className="search-bar input">
        <input
            type="text"
            placeholder="Enter category or product name..."
            value={searchText}
            onChange={(e) => {
                navigate("/explore");
                setTyping(true);
                videoListingDispatch({
                    type: SEARCH,
                    payload: { searchInput: e.target.value },
                });
            }}
        />
        <button>
            <img
                className="icon-search"
                src={
                    typing && searchText
                        ? "/assets/dismiss-blue.svg"
                        : "/assets/Search.svg"
                }
                alt="search"
                onClick={() => {
                    setTyping(false);
                    videoListingDispatch({
                        type: SEARCH,
                        payload: { searchInput: "" },
                    });
                }}
            />
        </button>
    </div>

    <ul className="nav-bar-secondary">
        {auth.isAuthVL ? (
            <div onClick={logoutHandler}>
                <NavLink to="/login" className="flex-column ">
                    <PersonIcon/>

                    <span className="text-xxs pointer">Logout </span>
                </NavLink>
            </div>
        ) : (
            <div className="flex-column">
                <NavLink to="/login" className="flex-column ">
                    <PersonIcon/>
                    <span className="text-xxs pointer">Login</span>
                </NavLink>
            </div>
        )}
    </ul>
</nav>
 
  )
}

export default Navbar