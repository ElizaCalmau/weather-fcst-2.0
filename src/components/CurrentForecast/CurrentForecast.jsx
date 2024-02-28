import { useContext, useEffect, useState } from "react";
import { TripContext } from "../Main/Main";
import axios from "axios";
import { forecastIcons } from "../../utils/weatherStates";
import { getDayOfWeek } from "../../utils/getDayOfWeek";
import { Timer } from "../Timer/Timer";
import "./CurrentForecast.css";

export const CurrentForecast = () => {
  const { trip } = useContext(TripContext)
  const [info, setInfo] = useState({ temp: "", seconds: "", icon: "" });
  const currentDate = new Date();
  const day = currentDate.getDay();
  const weekDay = getDayOfWeek(day);

  useEffect(() => {
      axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trip.city}?unitGroup=metric&key=QBJXJYDPNENDR6J6F4LPY8ARQ&contentType=json`)
          .then(response => {
              const data = response.data;
              setInfo({...data, temp: data.currentConditions.temp, seconds: data.currentConditions.datetimeEpoch, icon: data.currentConditions.icon});
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }, [trip]);

  return (
    <>
      {info && (
        <div className="currentForecastWrapper">
          <p className="weekDay">{weekDay}</p>
          <div className="tempWrapper">
            <img src={info && forecastIcons[info.icon]} alt="weather icon" />
            <p>{info.temp}°</p>
          </div>
          <p>{trip.city}</p>
          <Timer trip={trip} />
        </div>
      )}
    </>
  );
};
