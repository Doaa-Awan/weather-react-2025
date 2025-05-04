import { useState } from "react";
import styles from "./Weather.module.css";

export default function WeatherDataTemp(props) {   
    const [unit, setUnit] = useState("celsius");

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
                <span className="text-xl">{Math.round(props.celsius)}°</span> C <a href="/" onClick={convertToFahrenheit} className={styles.inactiveUnit}>| F</a> 
            </div>
        );
    } else {
        let fahrenheit = (props.celsius * 9) / 5 + 32;
        return (
            <div className="weatherDataTemp">
                <span className="text-xl">{Math.round(fahrenheit)}°</span> F <a href="/" onClick={convertToCelsius} className={styles.inactiveUnit}>| C</a>
            </div>
        );
    }
}