import axios from "axios";
import { useState } from "react";
import WeatherData from "./WeatherData";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ready: false});
    const [city, setCity] = useState(props.defaultCity);
    function handleResponse(response){
        setWeatherData({
            ready: true,
            city: response.data.city,
            temperature: response.data.temperature.current,
            description: response.data.condition.description,
            iconUrl: response.data.condition.icon_url,
            iconName: response.data.condition.icon,
            humidity: response.data.temperature.humidity,
            wind: response.data.wind.speed,
            date: new Date(response.data.time * 1000).toLocaleDateString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        });
    };

    function search(){
        const key = import.meta.env.VITE_API_KEY;
        const units = "metric";
        const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event){
        event.preventDefault();
        search();
    }
    
    if(weatherData.ready){
        return (
            <section className="weather">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="search"
                        placeholder="Enter a city..." 
                        className=""
                        autoFocus="on"
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <input type="submit" value="Search"/>
                </form>
                <WeatherData data={weatherData} />
            </section>
        );
    } else {
        search();
        return 'Loading...';
    }
}