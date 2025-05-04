import "tailwindcss";
import styles from "./Weather.module.css";

export default function WeatherData(props) {
    return (
        <div className={`${styles.weatherData}`}>
            <h1>{props.data.city}</h1>
            <p className={styles.date}>{props.data.date}</p>
            <div className={`${styles.tempContainer} grid grid-cols-[30%_70%]`}>
                <div className="">
                    <img src={props.data.iconUrl} 
                    alt={props.data.iconName}/>
                </div>
                <div>
                    <div><span className="text-xl">{Math.round(props.data.temperature)}°</span> C | F</div>
                    <span className={`${styles.description} text-l`}>{props.data.description}</span>
                </div>
            </div>
            <p>Humidity: {props.data.humidity}</p>
            <p>Wind: {props.data.wind}</p>
        </div>
    );
}