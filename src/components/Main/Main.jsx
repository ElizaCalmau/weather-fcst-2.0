import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { CityCard } from '../CityCard/CityCard';
import { WeeklyForecast } from '../WeeklyForecast/WeeklyForecast';
import { CurrentForecast } from '../CurrentForecast/CurrentForecast';
import './Main.css'

export const Main = ({onClick, isSubmitted}) => {
    const [trip, setTrip] = useState({city: '', start: '', end: ''})//global props which retrieves data in citycard and pass it to weekly and daily forecast
    const [dbCities, setDbCities] = useState([])
    const [checkedItem, setCheckedItem] = useState('');
    const handleInput = (e) => {
        const inputValue = e.target.value;
        const foundCity = dbCities.find(el => el.city.toLowerCase() === inputValue.toLowerCase());
        if (foundCity) {
            setTrip({ city: foundCity.city, start: foundCity.startDate, end: foundCity.endDate });
            setCheckedItem(foundCity.city)
        } 
    };

    useEffect(() => {
        // get cities from DB
        axios
          .get("http://localhost:3001/getCities")
          .then((resp) => {
            setTrip({city: resp.data[0].city, start: resp.data[0].startDate, end: resp.data[0].endDate});
            setDbCities(resp.data)
            setCheckedItem(resp.data[0].city)
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    return (
        <div className='pageWrapper'>
            <main>
                <p className='title'>Weather <b>Forecast</b></p>
                <div className='inputWrapper'>
                    <input className='searchInput' placeholder='Search your trip' onChange={(e) => handleInput(e)}/>
                    <div className='searchIcon'><Search className='search'/></div>
                </div>
                <div className='cityAndButtonWrapper'>
                    <CityCard setTrip={setTrip} isSubmitted={isSubmitted} checkedItem={checkedItem} setCheckedItem={setCheckedItem}/>
                    <button onClick={onClick}>Add trip</button>
                </div>
                <WeeklyForecast trip={trip}/>
                </main>
            <CurrentForecast trip={trip}/>
        </div>
    )
}