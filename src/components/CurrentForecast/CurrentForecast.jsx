import { useEffect, useState } from "react";
import {getDayOfWeek} from '../../utils/getDayOfWeek';
import { forecastIcons } from "../../utils/weatherStates";
import './CurrentForecast.css'


export const CurrentForecast = ({city}) => {
    const [info, setInfo] = useState({temp: '', seconds: '', icon: ''})
    const currentDate = new Date();
    const day = currentDate.getDay()
    const weekDay = getDayOfWeek(day)

    // useEffect(() => {
    //     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=metric&key=RQYD8HNC965NM98N9S8MVTPPC&contentType=json`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('current', data)
    //             setInfo({...data, temp: data.currentConditions.temp, seconds: data.currentConditions.datetimeEpoch, icon: data.currentConditions.icon})
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });

    // },
    // [])
    return (
            
        <div className='currentForecastWrapper'>
            <p>{weekDay}</p>
            <div className='tempWrapper'>
            <img src={forecastIcons[info.icon]} alt='weather icon' />
            <p>{info.temp}</p>

            </div>
            <p>{city}</p>
        </div>
    )
    }