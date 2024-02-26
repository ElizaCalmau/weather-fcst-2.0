import { useEffect, useState } from "react"
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import { forecastIcons } from "../../utils/weatherStates"
import './WeeklyForecast.css'
import axios from "axios"

export const WeeklyForecast = ({trip}) => {
    const [days, setDays] = useState([]);
    const start = new Date(trip.start);
    const end = new Date(trip.end)
    const yymmddStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2,"0")}-${String(start.getDate()).padStart(2,"0")}`
    const yymmddEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2,"0")}-${String(end.getDate()).padStart(2,"0")}`
    console.log(yymmddStart, yymmddEnd)
    console.log(trip)   
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${yymmddStart}/${yymmddEnd}?unitGroup=metric&key=QBJXJYDPNENDR6J6F4LPY8ARQ&contentType=json`);
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
        <p>{trip.city}, {yymmddStart}, {yymmddEnd}</p>
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