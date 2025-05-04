// import "@tailwindcss/vite";
import styles from "./Weather.module.css";

export default function WeatherData(props) {
    return (
        <div className={`${styles.weatherData}`}>
            <h1>{props.data.city}</h1>
            <p className={styles.date}>{props.data.date}</p>
            <div className={`${styles.tempContainer} grid grid-cols-2 gap-4`}>
                <img src={props.data.iconUrl} alt={props.data.iconName}/>
                <div>
                    <div>{Math.round(props.data.temperature)}° Celsius</div>
                    <span className={styles.description}>{props.data.description}</span>
                </div>
            </div>
            <p>Humidity: {props.data.humidity}</p>
            <p>Wind: {props.data.wind}</p>
        </div>
    );
}