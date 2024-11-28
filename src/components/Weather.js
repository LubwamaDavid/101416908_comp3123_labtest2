import React, { useState } from 'react';
import { fetchWeather } from '../api/weather';
import './Weather.css'; 

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const handleSearch = async () => {
        try {
            const data = await fetchWeather(city);
            setWeather(data);
        } catch (error) {
            alert("City not found or an error occurred. Please try again.");
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px', textAlign: 'center' }}>
            <h1 className="display-4">Weather App</h1>
            <div className="input-group mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    style={{ width: '120px' }}
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {weather && (
                <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div className="card-body">
                        <h3 className="card-title">{weather.name}</h3>
                        <p className="card-text">
                            <strong>Condition:</strong> {weather.weather[0].description}
                        </p>
                        <p className="card-text">
                            <strong>Temperature:</strong> {weather.main.temp}°C
                        </p>
                        <p className="card-text">
                            <strong>Feels Like:</strong> {weather.main.feels_like}°C
                        </p>
                        <p className="card-text">
                            <strong>Humidity:</strong> {weather.main.humidity}%
                        </p>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
