// import React from 'react';
// import logo from './assets/react-router-logo.png';

// const About = () => {
//     return(
//         <div className="page">
//             <section>
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <h1>Use React Router and React Transition Group</h1>
//                 <p>Alias laboriosam maiores autem nemo consectetur sed perspiciatis minus quibusdam dolorem ratione sapiente amet quia quis voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum culpa odio.</p>
//             </section>
//         </div>
//     )
// }


import React, { useState } from 'react';
const api = {
    key: 'b96a8ca8eb77f4dc3d85d8f5cae00d42',
    base: 'https://api.openweathermap.org/data/2.5/',
}

function About() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={
            (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : "app"
        }>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Find your Location..'
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
                                {Math.round(weather.main.temp)}°C
          </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}
export default About;