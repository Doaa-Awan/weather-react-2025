
import styles from "./Weather.module.css";
import WeatherDataTemp from "./WeatherDataTemp";
import WeatherForecast from "./WeatherForecast";
import { WeatherContext } from "../../Context";
import { useContext } from "react";

export default function WeatherData({ onRefresh }) {
    const data = useContext(WeatherContext);
    return (
        <div className={`${styles.weatherData}`}>
            <h1>{data.city}</h1>
            <h2>{data.country}</h2>
            <p className={styles.date}>{data.date}
                 <button
                    className={styles.refreshBtn}
                    style={{ marginLeft: 8, cursor: "pointer" }}
                    title="Refresh"
                    onClick={onRefresh}
                >
                    🔄
                </button>
            </p>
            <div className={`${styles.tempContainer} `}>
                <div className="">
                    <img src={data.iconUrl} 
                    alt={data.iconName}/>
                    <div className={`${styles.description} text-l`}>{data.description}</div>
                </div>
                <WeatherDataTemp />
            </div>
            <div className={styles.info}>
                <p>Humidity: {data.humidity}</p>
                <p>Wind: {data.wind}</p>
            </div>
            <br/>
            <WeatherForecast />
        </div>
    );
}