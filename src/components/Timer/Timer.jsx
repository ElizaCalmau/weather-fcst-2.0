import { useEffect, useState } from "react"
import './Timer.css'

export const Timer = ({trip}) => {
    const [countdown, setCountdown]= useState({days: '', hours: '', minutes: '', seconds: ''})
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date().getTime();
            const tripStart = new Date(trip.start).getTime();
            const timeDiff = tripStart - currentDate;
            if (timeDiff <= 0) {
                clearInterval(intervalId);
                return;
            }

            const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60);
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setCountdown({ days: days, hours: hours, minutes: minutes, seconds: seconds });
        }, 1000);
    
        // Clean up the interval when the component unmounts or when trip changes
        return () => clearInterval(intervalId);
    }, [trip]);
    return(
        <>
        <div className="countdownWrapper">
            <div className="dateItem">{countdown.days} <span>DAYS</span></div>
            <div className="dateItem">{countdown.hours} <span>HOURS</span></div>
            <div className="dateItem"> {countdown.minutes} <span>MINUTES</span></div>
            <div className="dateItem">{countdown.seconds} <span>SECONDS</span></div>
        </div>
             
        </>
    )
}