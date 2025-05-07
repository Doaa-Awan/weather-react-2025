
import styles from "./Weather.module.css";
import WeatherDataTemp from "./WeatherDataTemp";
import WeatherForecast from "./WeatherForecast";

export default function WeatherData(props) {
    return (
        <div className={`${styles.weatherData}`}>
            <h1>{props.data.city}</h1>
            <p className={styles.date}>{props.data.date}</p>
            <div className={`${styles.tempContainer} `}>
                <div className="">
                    <img src={props.data.iconUrl} 
                    alt={props.data.iconName}/>
                    <div className={`${styles.description} text-l`}>{props.data.description}</div>
                </div>
                <WeatherDataTemp celsius={props.data.temperature} />
            </div>
            <p>Humidity: {props.data.humidity}</p>
            <p>Wind: {props.data.wind}</p>
            <br/>
            <WeatherForecast city={props.data.city} />
        </div>
    );
}