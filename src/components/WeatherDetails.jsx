import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';

// icons
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdCompress } from "react-icons/md";
import { LuWind } from "react-icons/lu";
import { IoIosWater } from "react-icons/io";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

const WeatherDetails = () => {

    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    const cityName = useParams();
    const currentCityName = cityName.cityName;

    // api key
    const weatherAPIKey = "63cedc7d03caea1c93cafc32f3f0ebea";


    useEffect(() => {

        const getWeatherData = async () => {

            setLoading(true);
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=${weatherAPIKey}`);
            const data = await res.json();

            setWeather({
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                des: `${data.weather[0].main}`,
                feels_like: `${Math.abs(data.main.feels_like - 273.15).toFixed(2)}`,
                temp: `${Math.abs(data.main.temp - 273.15).toFixed(2)}`,
                temp_min: `${Math.abs(data.main.temp_min - 273.15).toFixed(2)}`,
                temp_max: `${Math.abs(data.main.temp_max - 273.15).toFixed(2)}`,
                pressure: `${data.main.pressure} hPa`,
                humidity: `${data.main.humidity} %`,
                name: `${data.name}`,
                wind: `${data.wind.speed} m/s`,
                country: `${new Intl.DisplayNames(['en'], { type: "region" }).of(data.sys.country)}`,
                sunrise: `${new Date(data.sys.sunrise * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
                    }`,
                sunset: `${new Date(data.sys.sunset * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
                    }`
            });

            setLoading(false);
        }

        getWeatherData();

    }, [])

    return (
        <div className='w-full h-screen bg-slate-700 text-white flex justify-center items-center'>
            {
                loading ? <Loader/> :

                <div className='w-1/2 py-4 flex flex-col justify-center h-full'>
                    {/* back button */}
                    <div className='flex items-center w-2/3 mx-auto text-lg mb-4'>
                        <IoIosArrowBack />
                        <Link to={"/"}><span className='border-b-[2px] hover:font-bold'>Back</span></Link>
                    </div>

                    {/* city name */}
                    <h1 className='text-4xl bg-[#1e293b] w-2/3 mx-auto rounded-md py-3 uppercase font-bold text-center mb-4 shadow-sm'>{currentCityName}</h1>

                    {/* temperature */}
                    <div className='flex gap-7 items-center justify-center bg-[#1e293b] w-2/3 mx-auto p-4 rounded-md shadow-sm'>
                        {/* icon */}
                        <img src={weather.icon} className="temp-weather-icon"></img>

                        {/* temperature and description */}
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-5xl font-extrabold'>{weather.temp}&#8451;</h1>
                            <h1 className='text-2xl text-center'>{weather.des}</h1>
                        </div>

                        {/* sunrise ans sunset */}
                        <div className='text-lg flex gap-3'>
                            <div>
                                <h1 className='font-bold text-orange-300'>Sunrise :</h1>
                                <h1 className='font-bold text-orange-400'>Sunset :</h1>
                            </div>

                            <div>
                                <h1>{weather.sunrise}</h1>
                                <h1>{weather.sunset}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2 mx-auto text-center mt-4 w-2/3'>
                        {/* min temperature */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <FaArrowAltCircleDown />
                                <h1 className='text-lg font-bold'>Min-Temp</h1>
                            </div>
                            <h1 className=''>{weather.temp_min}&#8451;</h1>
                        </div>

                        {/* max temperature */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <FaArrowAltCircleUp />
                                <h1 className='text-lg font-bold'>Max-Temp</h1>
                            </div>
                            <h1 className=''>{weather.temp_max}&#8451;</h1>
                        </div>

                        {/* Pressure */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <MdCompress />
                                <h1 className='text-lg font-bold'>Pressure</h1>
                            </div>
                            <h1 className=''>{weather.pressure}</h1>
                        </div>

                        {/* Speed */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <LuWind />
                                <h1 className='text-lg font-bold'>Speed</h1>
                            </div>
                            <h1 className=''>{weather.wind}</h1>
                        </div>

                        {/* Humidity */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <IoIosWater />
                                <h1 className='text-lg font-bold'>Humidity</h1>
                            </div>
                            <h1 className=''>{weather.humidity}</h1>
                        </div>

                        {/* Feel Like */}
                        <div className='bg-[#1e293b] p-2 rounded-lg flex flex-col gap-1 shadow-sm'>
                            <div className='flex items-center gap-2 mx-auto'>
                                <FaFaceSmileBeam />
                                <h1 className='text-lg font-bold'>Feel Like</h1>
                            </div>
                            <h1 className=''>{weather.feels_like}</h1>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default WeatherDetails