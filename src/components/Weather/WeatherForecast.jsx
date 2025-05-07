import axios from "axios";
import styles from "./Weather.module.css";
import { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    //set loaded(false) when the city changes to trigger the API call
    useEffect(() => {
        setLoaded(false);
    }, [props.city]);

    function handleResponse(response) {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    if (loaded) {
        //console.log(forecast);
        return (
            <div className="weatherForecast">
                <div className={`${styles.forecastData}`}>
                    <div className={`grid grid-cols-5`}>
                        {forecast.map(function (dailyForecast, index) {
                            if (index < 5) {
                                return (
                                    <div key={index}>
                                        <WeatherForecastDay data={dailyForecast} />
                                    </div>
                                );
                            } 
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        const key = import.meta.env.VITE_API_KEY;
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${key}`;
        axios.get(apiUrl).then(handleResponse);
        return null;
    }
}