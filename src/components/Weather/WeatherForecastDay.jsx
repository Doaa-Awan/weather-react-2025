import styles from "./Weather.module.css";

export default function WeatherForecastDay(props) {
    function day() {
        let date = new Date(props.data.time * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[day];
    }

  return (
    <div className={`${styles.day}`}>
        <span>{day()}</span>
        <span>
        <img src={props.data.condition.icon_url} alt={props.data.condition.icon} />
        </span>
        <div>
            <div>{props.data.temperature.maximum}°</div>
            <div>{props.data.temperature.minimum}°</div>
        </div>
    </div>
  )
}