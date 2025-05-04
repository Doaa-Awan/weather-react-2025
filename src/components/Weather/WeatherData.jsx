export default function WeatherData(props) {
    return (
        <div className="WeatherData">
            <h1>{props.data.city}</h1>
            <br />
            <ul>
                <li>{props.data.date}</li>
                <li>{props.data.description}</li>
            </ul>
            <p>{Math.round(props.data.temperature)}° Celsius</p>
            <p>Humidity: {props.data.humidity}</p>
            <p>Wind: {props.data.wind}</p>
        </div>
    );
}