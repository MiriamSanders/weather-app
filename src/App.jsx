import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  // Define an array of city data objects
  // Each object can contain either a city name or latitude and longitude coordinates
  // The city name is used to fetch the coordinates if lat and lon are not provided
  // The he_name property is used for Hebrew city names- if not provided by the api -such as alaska.
  const cityArray = [
    { name:"new york" },// New York City
    { lat: 51.5074, lon: -0.1278},//london
    { lat: 29.5581, lon: 34.9482 },// Eilat
    { he_name: "אלסקה", lat: 61.3707, lon: -152.4044 }
  ];
  return (
    <div className='container'>
      <h1>תחזיות מסביב לעולם</h1>
      <div className="grid-container">
        {cityArray.map((cityData, index) =>
          <WeatherCard key={index} cityData={cityData} />
        )}
      </div>
    </div>
  )
}

export default App
