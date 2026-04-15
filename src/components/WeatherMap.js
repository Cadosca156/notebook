import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "../styles/weathermap.css"

export default function WeatherMap() {
    const mapRef = useRef(null);
    const [weather, setWeather] = useState(null);

    const getWeather = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric&current`;

        const res = await fetch(url);
        const data = await res.json();

        setWeather(data);
    };

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: "mapbox://styles/cardo07k/cmnzz4pj0006z01s9155z4jwi",
            center: [30.5238, 50.4547],
            zoom: 5,
        });

        map.on("click", (e) => {
            const lat = e.lngLat.lat;
            const lon = e.lngLat.lng;

            console.log("Coords:", lat, lon);
            getWeather(lat, lon);
        });

        return () => map.remove();
    }, []);


    return (
        <div className="weathermap">
            <div className="about">
                {weather?.main && (
                    <div className="weather-card">
                        <h2>{weather.name}</h2>

                        <p>🌡 {weather.main.temp}°C</p>
                        <p>🤔 Feels Like: {weather.main.feels_like}°C</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                        <p>💨 Wind: {weather.wind.speed} м/с</p>
                        <p>☁️ {weather.weather[0].description}</p>
                    </div>
                )}
            </div>
            <div className={"map-wrapper"}>
            <div ref={mapRef}  className="map">
            </div>
            </div>

        </div>
    );
}