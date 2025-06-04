import React from "react";
import { Sun } from "lucide-react"
import "../styles/WeatherCard.css"; // Adjust the path as necessary

const WeatherCard = ({ city }) => {
    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }


    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="sun-icon"><Sun color=" rgba(243, 188, 9, 0.87)" /></div>
                <div className="location-container">
                    <h2 className="city-name">לונדון</h2>
                    <p className="weather-description">שבירי עננים</p>
                </div>
            </div>
            <div className="weather-grid">
                <div className="weather-item">
                    <p className="weather-label">לחות</p>
                    <p className="weather-value">52%</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">טמפ' מרבית</p>
                    <p className="weather-value">30°C</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">טמפ' מזערית</p>
                    <p className="weather-value">29°C</p>
                </div>
            </div>
        </div>
    );
};
export default WeatherCard;
