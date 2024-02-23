import { Search } from 'lucide-react';
import './Main.css'
import { CityCard } from '../CityCard/CityCard';
import { WeeklyForecast } from '../WeeklyForecast/WeeklyForecast';
import { useState } from 'react';
import { CurrentForecast } from '../CurrentForecast/CurrentForecast';

export const Main = ({onClick}) => {
    const [city, setCity] = useState('Tokyo');
    const [dayOfWeek, setDayOfWeek] = useState('')
    const handleInput = (e) => {
        setCity(e.target.value)
    }

    return (
        <div className='pageWrapper'>
            <main>
                <p className='title'>Weather <b>Forecast</b></p>
                <div className='inputWrapper'>
                    <input className='searchInput' placeholder='Search your trip' onChange={(e) => handleInput(e)}/>
                    <div className='searchIcon'><Search/></div>
                </div>
                <div className='cityAndButtonWrapper'>
                    <CityCard city={city} setDayOfWeek={setDayOfWeek}/>
                    <button onClick={onClick}>Add trip</button>
                </div>
                <WeeklyForecast city={city} day={dayOfWeek}/>
                </main>
            <CurrentForecast city={city}/>
        </div>
    )
}