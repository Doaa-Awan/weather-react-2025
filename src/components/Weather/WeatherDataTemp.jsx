import { useState } from "react";
import styles from "./Weather.module.css";
import { WeatherContext } from "../../Context";
import { useContext } from "react";

export default function WeatherDataTemp() {   
    const {temperature, unit, setUnit} = useContext(WeatherContext);

    function convertToFahrenheit(event) {
        event.preventDefault();
        setUnit("fahrenheit");
    }

    function convertToCelsius(event) {
        event.preventDefault();
        setUnit("celsius");
    }

    if (unit === "celsius") {
        return (
            <div className="weatherDataTemp">
                <span className={styles.tempNumber}>{Math.round(temperature)}°</span> C <a href="/" onClick={convertToFahrenheit} className={styles.inactiveUnit}>| F</a> 
            </div>
        );
    } else {
        let fahrenheit = (temperature * 9) / 5 + 32;
        return (
            <div className="weatherDataTemp">
                <span className={styles.tempNumber}>{Math.round(fahrenheit)}°</span> F <a href="/" onClick={convertToCelsius} className={styles.inactiveUnit}>| C</a>
            </div>
        );
    }
}