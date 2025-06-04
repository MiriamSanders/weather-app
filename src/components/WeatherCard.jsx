import React, { useEffect } from "react";
import { Sun, CloudHail, CloudSun } from "lucide-react"
import "../styles/WeatherCard.css"; // Adjust the path as necessary

const WeatherCard = ({ city, lat, lon }) => {
    const [weatherData, setWeatherData] = React.useState(null);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=he`);
            const data = await response.json();
            setWeatherData(data);
            console.log("Weather data:", data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }
    useEffect(() => {
        fetchWeatherData();
    }, [city, lat, lon]);
    if (!weatherData) {
        return <div className="weather-card">Loading...</div>;
    }
    const getWeatherIcon = (temp) => {
        if (temp <= 20) {
            return <CloudHail color="blue" fill="blue" size="2rem"/>;
        } else if (temp >= 30) {
            return <Sun color="rgba(243, 188, 9, 0.87)"  fill="rgba(243, 188, 9, 0.87)" size="2rem"/>;
        } else {
            return <CloudSun color="green" fill="green" size="2rem"/>;
        }
    };

    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="weather-icon">{getWeatherIcon(weatherData.main.temp)}</div>
                <div className="location-container">
                    <h2 className="city-name">{city}</h2>
                    <p className="weather-description">{weatherData.weather[0].description}</p>
                </div>
            </div>
            <div className="weather-grid">
                <div className="weather-item">
                    <p className="weather-label">לחות</p>
                    <p className="weather-value">{weatherData.main.humidity}%</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">טמפ' נמדדת</p>
                    <p className="weather-value">{weatherData.main.temp}</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">טמפ' מורגשת</p>
                    <p className="weather-value">{weatherData.main.feels_like}</p>
                </div>
            </div>
        </div>
    );
};
export default WeatherCard;
