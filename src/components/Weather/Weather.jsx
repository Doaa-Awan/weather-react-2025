// import styles from './WeatherStyles.css';
// import React from 'react';
export default function Weather(){
    return (
        <section id="weather">
            <form>
                <input 
                    type="search"
                    placeholder="Enter a city..." 
                    className=""
                />
                <input type="submit" value="Search"/>
            </form>
            <h1>Niagara Falls</h1>
            <br />
            <ul>
                <li>Wednesday 07:00</li>
                <li>Mostly Cloudy</li>
            </ul>
            <p>6 degrees</p>
            <p>Precipitation: 73%</p>
            <p>Humidity</p>
            <p>Wind</p>
        </section>
    );
}