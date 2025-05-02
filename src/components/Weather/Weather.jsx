import axios from "axios";
import { useState } from "react";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ready: false});
    function handleResponse(response){
        // console.log(response);
        setWeatherData({
            ready: true,
            city: response.data.city,
            temperature: response.data.temperature.current,
            description: response.data.condition.description,
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
    
    if(weatherData.ready){
        return (
            <section id="weather">
                <form>
                    <input 
                        type="search"
                        placeholder="Enter a city..." 
                        className=""
                    />
                    <input type="submit" value="Search"/>
                </form>
                <h1>{weatherData.city}</h1>
                <br />
                <ul>
                    <li>{weatherData.date}</li>
                    <li>{weatherData.description}</li>
                </ul>
                <p>{Math.round(weatherData.temperature)}° Celsius</p>
                <p>Humidity: {weatherData.humidity}</p>
                <p>Wind: {weatherData.wind}</p>
            </section>
        );
    } else {
        const key = import.meta.env.VITE_API_KEY;
        const units = "metric";
        const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${key}&units=${units}`;
        axios.get(apiUrl).then(handleResponse);

        return 'Loading...';
    }
}