import React from 'react'
import { Route, Routes } from "react-router-dom";
import Explore from '../pages/Explore';

function PageRoutes() {
  return (
    
    <div>
    <Routes>
    <Route path="/" element={<Explore />} />
      	<Route path="/explore" element={<Explore />} />
    </Routes>
    {/* <h1>routes

    </h1> */}
    </div>
  )
}

export default PageRoutes