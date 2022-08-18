import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";



import LandingPage from './components/startingPage/LandingPage'
import RentalsPage from './components/mapPage/RentalsPage'



const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/rentals" element={<RentalsPage />} />
    </Routes>

  )
}

export default App