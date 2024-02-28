import { Search } from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { FormContext } from '../../App';
import { CityCard } from '../CityCard/CityCard';
import { WeeklyForecast } from '../WeeklyForecast/WeeklyForecast';
import { CurrentForecast } from '../CurrentForecast/CurrentForecast';
import './Main.css'

export const TripContext = createContext()

export const Main = () => {

    const { handleFormVisibility } = useContext(FormContext)
    const [trip, setTrip] = useState({city: '', start: '', end: ''})
    const [dbCities, setDbCities] = useState([])
    const [checkedItem, setCheckedItem] = useState('');
    
    const TripContextValue = { trip, setTrip, dbCities, setDbCities, checkedItem, setCheckedItem }

    const { isSubmitted } = useContext(FormContext)

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
      }, [isSubmitted]);

    return (
        <TripContext.Provider value={TripContextValue}>
            <div className='pageWrapper'>
                <main>
                    <p className='title'>Weather <b>Forecast</b></p>
                    <div className='inputWrapper'>
                        <input className='searchInput' placeholder='Search your trip' onChange={(e) => handleInput(e)}/>
                        <div className='searchIcon'><Search className='search'/></div>
                    </div>
                    <div className='cityAndButtonWrapper'>
                        <CityCard/>
                        <button onClick={handleFormVisibility}>Add trip</button>
                    </div>
                    <WeeklyForecast/>
                </main>
                <CurrentForecast/>
            </div>
        </TripContext.Provider>
        
    )
}