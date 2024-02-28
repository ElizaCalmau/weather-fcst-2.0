import { useEffect, useState } from "react"
import axios from "axios"
import { formatDateFetch } from "../../utils/formatDateFetch"
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import { forecastIcons } from "../../utils/weatherStates"
import './WeeklyForecast.css'

export const WeeklyForecast = ({trip}) => {
    const [days, setDays] = useState([]);
    const start = formatDateFetch(trip.start)
    const end = formatDateFetch(trip.end)

//    useEffect(()=> {
//     axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}/${start}/${end}?unitGroup=metric&key=QBJXJYDPNENDR6J6F4LPY8ARQ&contentType=json`)
//             .then(response => {
//                 const data = response.data;
//                 setDays(data.days);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }, [trip, start, end])
   
    return(
        <>
        <h3>Week</h3>
        <div className="weeklyForecastWrapper">
            {days &&days.slice(0, 7).map((el) => {
                const currentDate = new Date(el.datetimeEpoch * 1000)
                const currentDay = currentDate.getDay();
                const weekDay = getDayOfWeek(currentDay)
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