import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const api = {
    key : "730d0ef18b49b5ed854bdb39626c5d51",
    base: "https://api.openweathermap.org/data/2.5/",

    locationKey : "HC1ZC9NL9XUP",
    //locBase: "http://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=xml&by=position&lat=40.689247&lng=-74.044502\n"
    locBase: "http://api.timezonedb.com/"
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [time, setTime] = useState('');
    let timeNumber;

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                    fetch(`${api.locBase}v2.1/get-time-zone?key=${api.locationKey}&format=json&by=position&lat=${result.coord.lat}&lng=${result.coord.lon}`,{
                    })
                        .then(res => res.json())
                        .then(result => {
                            setTime(result);
                            console.log(result.formatted.substring(10, 13));
                            console.log(result.formatted.substring(12,13));
                            if (parseInt(result.formatted.substring(11,12)) === 0 ){
                                timeNumber = result.formatted.substring(12,13)
                            } else {
                                timeNumber = result.formatted.substring(10, 13)
                            }

                        });
                });
        }
    };






    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    };




    const timeBuilder = t => {
        let backGroundClass = 'app warm night';
        if (typeof weather.main != "undefined" && weather.main.temp > 16 && timeNumber > 8 && timeNumber < 20) {
            backGroundClass = 'app warm day'
        } else if (typeof weather.main != "undefined" && weather.main.temp > 16 && timeNumber < 8) {
            backGroundClass = 'app warm night'
        } else if (typeof weather.main != "undefined" && weather.main.temp < 16 && timeNumber < 8) {
            backGroundClass = 'app'
        } else if (typeof weather.main != "undefined" && weather.main.temp < 16 && timeNumber > 8 && timeNumber < 20) {
            backGroundClass = 'app cold day'
        }
        return backGroundClass
    }


     /*
<div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
<div className={timeBuilder()}>
     */

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>

        <main>
            <div className="search-box">

              <input
                  type="text"
                  className="search-bar"
                  placeholder="Search..."
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
              />
            </div>
                {(typeof weather.main != "undefined") ? (
            <div>
                <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>

                <div className="weather-box">
                    <div className="temp">
                        {Math.round(weather.main.temp)}°c
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                </div>
            </div>
                ) : ('')}

            <div className="time-box">

            </div>
        </main>
    </div>
    );
}

export default App;
