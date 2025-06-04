import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  //const cityArray = ["london","eilat","new york","alaska"];
const cityArray = [
    { name: "לונדון", lat: 51.5074, lon: -0.1278 },
    { name: "אילת", lat: 29.5581, lon: 34.9482 },
    { name: "ניו יורק", lat: 40.7128, lon: -74.0060 },
    { name: "אלסקה", lat: 61.3707, lon: -152.4044 }
  ];
  return (
    <div>
      <h1>תחזיות מסביב לעולם</h1>
    <div className="grid-container">
      {cityArray.map((cityData, index) =>
        <WeatherCard key={index} city={cityData.name}  lat={cityData.lat} lon={cityData.lon}/>
      )}
    </div>
    </div>
  )
}

export default App
