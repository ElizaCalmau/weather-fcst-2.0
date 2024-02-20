import { useEffect, useState } from "react"
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import { forecastIcons } from "../../utils/weatherStates"

export const WeeklyForecast = ({city}) => {
    const [days, setDays] = useState([])

    // useEffect(() => {
    //     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2024-02-19/2024-02-27?unitGroup=metric&key=RQYD8HNC965NM98N9S8MVTPPC&contentType=json`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('weekly', data)
    //            setDays(data.days)
    //            console.log(data.days)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // },
    // [city])

    return(
        <div className="weeklyForecastWrapper">
            {days.map((el) => {
                const currentDate = new Date(el.datetimeEpoch * 1000)
                console.log(currentDate)
                const offsetMinutes = currentDate.getTimezoneOffset();
                const currentDay = currentDate.getDay();
                const weekDay = getDayOfWeek(currentDay)
                console.log('current day', currentDay)
                return (
                    <div className="dayOfWeekWrapper" key={el.datetime}>
                        <p>day of the week {weekDay} </p>
                        <img src={forecastIcons[el.icon]} alt='weather icon'/>
                        <p>{el.tempmax}°/{el.tempmin}°</p>
                    </div>
                ) 
            } )}
        </div>
    )
}