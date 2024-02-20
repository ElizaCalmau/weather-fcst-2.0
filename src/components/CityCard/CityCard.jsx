import { useEffect, useState } from "react";
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import './CityCard.css'

const accessKey = 't7hhZ5uulANaG1kjtrYjldaQyenQzp6RmunyhjqRz5w';

const city = {
    id: 1, 
    name: 'Tokyo',
    date_start: new Date(2024, 1, 22),
    date_end: new Date(2024, 1, 28),
}

const startDate = `${city.date_start.getDate()}.${city.date_start.getMonth() + 1}.${city.date_start.getFullYear()}`;
const endDate = `${city.date_end.getDate()}.${city.date_end.getMonth() + 1}.${city.date_end.getFullYear()}`;
const day = `${city.date_start.getDay()}`
const dayOfWeek = getDayOfWeek(day)

export const CityCard = ({city, setDayOfWeek}) => {
    const [imageUrl, setImageUrl] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    const handleChecked = () => {
        setIsChecked(!isChecked)
        console.log('checked')
    }

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setImageUrl(data.results[6].urls.thumb);
                }
                setDayOfWeek(dayOfWeek)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [imageUrl, city] )

    return (
        <>
        <input className="checkboxInput" type="checkbox" checked={isChecked} readOnly/>
        <div className={`cityCardWrapper ${isChecked ? 'checked' : ''}`} onClick={handleChecked}>
            <label>
                <img src={imageUrl} alt="city photo" />
            <div className="cardInfo">
                <p>{city}</p>
                <span> {startDate} - {endDate}</span>
            </div>
            </label>
            
        </div>
        </>
    )
}