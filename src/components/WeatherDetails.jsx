import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState({});
    const [temp, setTemp] = useState({});
    const [rise, setRise] = useState();
    const [weatherInfo, setWeatherInfo] = useState();
    const [wind, setWind] = useState();

    const cityName = useParams();
    const currentCityName = cityName.cityName;

    const weatherAPIKey = "63cedc7d03caea1c93cafc32f3f0ebea";


    useEffect(() => {

        const getWeatherData = async () => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=Metric&appid=${weatherAPIKey}`);
            const data = await res.json();
            console.log(data);
            setWeatherData(data);
            setTemp(data.main);
            setRise(data.sys);
            setWeatherInfo(data.weather);
            setWind(data.wind);
        }

        getWeatherData();

    }, [])

    return (
        <div>
            <h1>{currentCityName}</h1>
            <div>
                <h1>{temp.temp}</h1>
                    
            </div>
            <div>

            </div>
        </div>
    )
}

export default WeatherDetails