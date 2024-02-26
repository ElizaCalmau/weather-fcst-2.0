import { useEffect, useState } from "react";
import { getDayOfWeek } from "../../utils/getDayOfWeek"
import './CityCard.css'
import axios from "axios";

const accessKey = 't7hhZ5uulANaG1kjtrYjldaQyenQzp6RmunyhjqRz5w'

export const CityCard = ({city, setDayOfWeek}) => {
    const [imageUrl, setImageUrl] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [dbCities, setDbCities] = useState([])

    const handleChecked = () => {
        setIsChecked(!isChecked)
        console.log('checked')
    }


    const fetchUrl = async (el) => {
         try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${el.city}&client_id=${accessKey}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            // console.log(data.results[6].urls.thumb);
            return data.results[6].urls.thumb;
        }
        return ''; // Return empty string if no image URL found
    } catch (error) {
        console.error('Error:', error);
        return ''; // Return empty string on error
    }
    }

    
    useEffect(() => {// get cities from DB
        axios.get('http://localhost:3001/getCities') 
        .then((resp) => {
            console.log(resp.data)
            setDbCities(resp.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }, [])
    
    useEffect(() => {
        if (dbCities) {
            Promise.all(dbCities.map(el => fetchUrl(el)))
                .then(urls => {//[promise, promise, promise]
                    // Create an array of objects where each object contains city and its URL
                    const cityUrls = dbCities.map((el, index) => ({
                        city: el.city,
                        url: urls[index]
                    }));
                    setImageUrl(cityUrls);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [dbCities]);

    {imageUrl && console.log(imageUrl)}
    return (
        <>
        <input className="checkboxInput" type="checkbox" checked={isChecked} readOnly/>

        {dbCities && dbCities.map((el) => {    
             let currentUrl = imageUrl.find(url => url.city === el.city);    
            return<div className={`cityCardWrapper ${isChecked ? 'checked' : ''}`} onClick={handleChecked} key={el._id}>
                 <label>
                    <img src={currentUrl ? currentUrl.url : ''} alt="city photo" />
                    <div className="cardInfo">
                        <p>{el.city}</p>
                        <p>{el.startDate}</p>
                        <p>{el.endDate}</p>
                    </div>
                </label>
            </div>
        })}
        </>
    )
}