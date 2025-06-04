import React, { useEffect } from "react";
import { Sun, CloudHail, CloudSun } from "lucide-react"
import "../styles/WeatherCard.css";

const WeatherCard = ({ cityData }) => {
    const [weatherData, setWeatherData] = React.useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                if (!apiKey) throw new Error("missing API key!");

                let weatherResponse;
                if (!cityData.lat || !cityData.lon) {
                    const cityResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityData.name}&appid=${apiKey}`);
                    const cityDataResponse = await cityResponse.json();
                    if (!cityDataResponse[0]) throw new Error("invalid city name or no data found");
                    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityDataResponse[0].lat}&lon=${cityDataResponse[0].lon}&appid=${apiKey}&units=metric&lang=he`);
                } else {
                    weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric&lang=he`);
                }

                if (!weatherResponse.ok) {
                    const errorData = await weatherResponse.json();
                    throw new Error(errorData.message || "Failed to fetch weather data");
                }

                const data = await weatherResponse.json();
                console.log("Weather data fetched successfully:", data);

                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error.message);
            }
        }
        fetchWeatherData();
    }, [cityData]);
    if (!weatherData) {
        return <div className="weather-card"><h6>Loading...</h6></div>;
    }

    const getWeatherIcon = (temp) => {
        if (temp <= 20) {
            return <CloudHail color="#4A90E2" fill="#4A90E2" size="2.5rem" />;
        } else if (temp >= 30) {
            return <Sun color="#F3BC09" fill="#F3BC09" size="2.5rem" />;
        } else {
            return <CloudSun color="#6BAF92" fill="#6BAF92" size="2.5rem" />;
        }
    };

    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="weather-icon">{getWeatherIcon(weatherData.main.feels_like)}</div>
                <div className="location-container">
                    <h2 className="city-name">{cityData.he_name || weatherData.name}</h2>
                    <p className="weather-description">{weatherData.weather[0].description}</p>
                </div>
            </div>
            <div className="weather-flex">
                <div className="weather-item">
                    <p className="weather-label">טמפ' נמדדת</p>
                    <p className="weather-value">{Math.round(weatherData.main.temp)}°C</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">טמפ' מורגשת</p>
                    <p className="weather-value">{Math.round(weatherData.main.feels_like)}°C</p>
                </div>
                <div className="weather-item">
                    <p className="weather-label">לחות</p>
                    <p className="weather-value">{Math.round(weatherData.main.humidity)}%</p>
                </div>
            </div>
        </div>
    );
};
export default WeatherCard;
