import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WeatherDetails from './components/WeatherDetails.jsx'

import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", element: <App/>,
  },
  {
    path: "/:cityName", element: <WeatherDetails/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
