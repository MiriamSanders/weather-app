import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  const cityArray = ["london","eilat","new york","alaska"];
  return (
    <div>
      <h1>תחזיות מסביב לעולם</h1>
    <div className="grid-container">
      {cityArray.map((city, index) =>
        <WeatherCard key={index} city={city} />
      )}
    </div>
    </div>
  )
}

export default App
