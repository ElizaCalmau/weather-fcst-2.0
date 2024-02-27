import { useEffect, useState } from "react"
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import { forecastIcons } from "../../utils/weatherStates"
import './WeeklyForecast.css'
import axios from "axios"
import { formatDateFetch } from "../../utils/formatDateFetch"

export const WeeklyForecast = ({trip}) => {
    const [days, setDays] = useState([]);
    const start = formatDateFetch(trip.start)
    const end = formatDateFetch(trip.end)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${start}/${end}?unitGroup=metric&key=QBJXJYDPNENDR6J6F4LPY8ARQ&contentType=json`);
    //             const data = await response.json();
    //             console.log('weekly', data);
    //             setDays(data.days);
    //             console.log(data.days);
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };
    
    //     fetchData();
    // }, [trip, yymmddStart, yymmddEnd]);

   
    return(
        <>
        <h3>Week</h3>
        <p>{trip.city}, {start}, {end}</p>
        <div className="weeklyForecastWrapper">
            {days &&days.slice(0, 7).map((el) => {
                const currentDate = new Date(el.datetimeEpoch * 1000)
                console.log(currentDate)
                const currentDay = currentDate.getDay();
                const weekDay = getDayOfWeek(currentDay)
                console.log('current day', currentDay)
                return (
                    <div className="dayOfWeekWrapper" key={el.datetime}>
                        <p>{weekDay} </p>
                        <img src={forecastIcons[el.icon]} alt='weather icon'/>
                        <p>{el.tempmax}°/{el.tempmin}°</p>
                    </div>
                ) 
            } )}
        </div>
        </>
    )
}