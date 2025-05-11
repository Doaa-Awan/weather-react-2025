import styles from "./Weather.module.css";
import { WeatherContext } from "../../Context";
import { useContext } from "react";

export default function WeatherForecastDay(props) {
    const { unit } = useContext(WeatherContext);
    function day() {
        let date = new Date(props.data.time * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[day];
    }

    function maxTemperature() {
        let temperature;
        if(unit === "fahrenheit"){
          temperature = Math.round((props.data.temperature.maximum * 9) / 5 + 32);
        } else {
          temperature = Math.round(props.data.temperature.maximum);
        }
        return `${temperature}°`;
    }
    function minTemperature() {
        let temperature;
        if(unit === "fahrenheit"){
          temperature = Math.round((props.data.temperature.minimum * 9) / 5 + 32);
        } else {
          temperature = Math.round(props.data.temperature.minimum);
        }
        return `${temperature}°`;
    }

  return (
    <div className={`${styles.day}`}>
        <span>{day()}</span>
        <span>
        <img src={props.data.condition.icon_url} alt={props.data.condition.icon} />
        </span>
        <div>
            <div>{maxTemperature()}</div>
            <div className={styles.forecastMinTemp}>{minTemperature()}</div>
        </div>
    </div>
  )
}