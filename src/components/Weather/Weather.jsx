import axios from "axios";
import { useState, useEffect } from "react";
import WeatherData from "./WeatherData";
import { WeatherContext, useTheme } from "../../Context";
import sun from "/src/assets/sun.png";
import moon from "/src/assets/moon.png";
import { Slide, ToastContainer, toast } from "react-toastify";

export default function Weather(props){
    const { theme, toggleTheme } = useTheme(); // Use the custom hook to access theme and toggleTheme
    const themeIcon = theme === "dark" ? sun : moon; // Change icon based on theme
    const [weatherData, setWeatherData] = useState({ready: false});
    const [city, setCity] = useState(() => {
        // Check localStorage for the last searched city, otherwise use props.defaultCity
        return localStorage.getItem("lastSearchedCity") || props.defaultCity;
    });
    const [unit, setUnit] = useState("celsius");
    function handleResponse(response){
        try {
            if(response.data.status == "not_found"){    
                toast.error("City not found", {pauseOnHover: false, transition: Slide });
                localStorage.removeItem("lastSearchedCity");
            }
            else {
                setWeatherData({
                    ready: true,
                    city: response.data.city,
                    country: response.data.country,
                    temperature: response.data.temperature.current,
                    description: response.data.condition.description,
                    iconUrl: response.data.condition.icon_url,
                    iconName: response.data.condition.icon,
                    humidity: response.data.temperature.humidity,
                    wind: response.data.wind.speed,
                    date: new Date(response.data.time * 1000).toLocaleDateString("en-US", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })
                });
            }
        }
        catch (error) {
            console.log("error", error);
        }
    };

    function search(){
        const key = import.meta.env.VITE_API_KEY;
        const units = "metric";
        const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;
        axios
            .get(apiUrl)
            .then(handleResponse)
            .catch((error) => {
                if (error.response && error.response.status === 429) {
                    console.error("Rate limit exceeded. Please try again later.");
                } else {
                    console.error("An error occurred:", error.message);
                }
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        // Save the city to localStorage
        localStorage.setItem("lastSearchedCity", city);
        search();
    }

     useEffect(() => {
        // Automatically search for the city when the component loads
        search();
    }, []); // Empty dependency array ensures this runs only once

    function refreshWeather() {
        // Use the last searched city from localStorage or fallback to current city state
        const lastCity = localStorage.getItem("lastSearchedCity") || city;
        setCity(lastCity);
        search();
        toast.success("Refreshed", {pauseOnHover: false, autoClose: 1000, hideProgressBar: false, transition: Slide });
    }
    
    if(weatherData.ready){
        return (
            <section className="weather">
                <ToastContainer theme={theme} position="bottom-right"/>
                <div className="searchContainer">
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="search"
                            placeholder="Enter a city..." 
                            className="searchBar"
                            autoFocus="on"
                            // value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                        <input type="submit" className="btnSearch" value="Search"/>
                    </form>
                    <div className="darkModeContainer">
                        <img className="darkModeIcon" src={themeIcon} alt="" onClick={toggleTheme}/>
                    </div>
                </div>
                <WeatherContext.Provider value={{...weatherData, unit, setUnit}}>
                    <WeatherData onRefresh={refreshWeather} />
                </WeatherContext.Provider>
            </section>
        );
    } else {
        return 'Loading...';
    }
}