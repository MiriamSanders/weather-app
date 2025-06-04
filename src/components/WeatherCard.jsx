import React, { useEffect } from "react";
import { Sun, CloudHail, CloudSun } from "lucide-react"
import "../styles/WeatherCard.css"; // Adjust the path as necessary

const WeatherCard = ({ cityData }) => {
    const [weatherData, setWeatherData] = React.useState(null);
    const fetchWeatherData = async () => {
        try {
            // instead of using the city name, we can use the lat and lon props to fetch the weather data. (if we were to add an option of manually adding a city, we would need to use the city name to get the lat and lon)
            let weatherResponse;
            if (cityData.lat || !cityData.lon) {
                const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityData.name}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
                const cityDataResponse = await cityResponse.json();
                weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityDataResponse[0].lat}&lon=${cityDataResponse[0].lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=he`);
            }
            else {
                weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=he`);
            }
            const data = await weatherResponse.json();
            console.log("Weather data:", data);

            if (weatherResponse.status !== 200) {
                throw new Error(data.message || "Failed to fetch weather data");
            }
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    }
    useEffect(() => {
        fetchWeatherData();
    }, [cityData]);
    if (!weatherData) {
        return <div className="weather-card">Loading...</div>;
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
                <div className="weather-icon">{getWeatherIcon(weatherData.main.temp)}</div>
                <div className="location-container">
                    <h2 className="city-name">{cityData.he_name || weatherData.name}</h2>
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
