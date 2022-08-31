import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from '@mui/system';
import theme from './themes/theme';
import LandingPage from './components/startingPage/LandingPage'
import RentalsPage from './components/mapPage/RentalsPage'



const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rentals" element={<RentalsPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App