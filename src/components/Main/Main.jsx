import { Search } from 'lucide-react';
import './Main.css'
import { CityCard } from '../CityCard/CityCard';
import { WeeklyForecast } from '../WeeklyForecast/WeeklyForecast';
import { useState, useEffect } from 'react';
import { CurrentForecast } from '../CurrentForecast/CurrentForecast';
import axios from 'axios';

export const Main = ({onClick}) => {
    const [trip, setTrip] = useState({city: '', start: '', end: ''})//global props which retrieves data in citycard and pass it to weekly and daily forecast
    const handleInput = (e) => {
        setCity(e.target.value)
    }

    useEffect(() => {
        // get cities from DB
        axios
          .get("http://localhost:3001/getCities")
          .then((resp) => {
            console.log(resp.data);
            setTrip({city: resp.data[0].city, start: resp.data[0].startDate, end: resp.data[0].endDate,});
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

      console.log('trip obj from main', trip)

    return (
        <div className='pageWrapper'>
            <main>
                <p className='title'>Weather <b>Forecast</b></p>
                <div className='inputWrapper'>
                    <input className='searchInput' placeholder='Search your trip' onChange={(e) => handleInput(e)}/>
                    <div className='searchIcon'><Search/></div>
                </div>
                <div className='cityAndButtonWrapper'>
                    <CityCard trip={trip} setTrip={setTrip}/>
                    <button onClick={onClick}>Add trip</button>
                </div>
                <WeeklyForecast trip={trip}/>
                </main>
            <CurrentForecast trip={trip}/>
        </div>
    )
}