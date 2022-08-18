import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './components/Context';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./css/normalize.css"
import "./css/index.css"

import App from './App'

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<ContextProvider><BrowserRouter><App tab="home" /></BrowserRouter></ContextProvider>)