import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
const cityArray = [
    { name: "london" },
    {  lat: 29.5581, lon: 34.9482 },
    { name: "new york", lat: 40.7128, lon: -74.0060 },
    { name: "alaska",he_name:"אלסקה" ,lat: 61.3707, lon: -152.4044 }
  ];
  return (
    <div className='container'>
      <h1>תחזיות מסביב לעולם</h1>
    <div className="grid-container">
      {cityArray.map((cityData, index) =>
        <WeatherCard key={index}   cityData={cityData} />
      )}
    </div>
    </div>
  )
}

export default App
