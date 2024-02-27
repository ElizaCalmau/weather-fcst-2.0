import { useEffect, useState } from "react";
import { getDayOfWeek } from "../../utils/getDayOfWeek";
import "./CityCard.css";
import axios from "axios";
import { set } from "mongoose";
import { formateDate } from "../../utils/formateDate";

const accessKey = "t7hhZ5uulANaG1kjtrYjldaQyenQzp6RmunyhjqRz5w";

export const CityCard = ({setTrip, isSubmitted}) => {
    
  const [imageUrl, setImageUrl] = useState([]);
  const [dbCities, setDbCities] = useState([]);
  const [checkedItem, setCheckedItem] = useState('');

  const handleChecked = (city) => {
    setCheckedItem(city.city);
    setTrip({city: city.city, start: city.startDate, end: city.endDate})
};

  const fetchUrl = async (el) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${el.city}&client_id=${accessKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.thumb;
      }
      return "";
    } catch (error) {
      console.error("Error:", error);
      return "";
    }
  };



  useEffect(() => {
    // get cities from DB
    axios
      .get("http://localhost:3001/getCities")
      .then((resp) => {
        console.log(resp.data);
        setDbCities(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isSubmitted]);
console.log(isSubmitted)
  useEffect(() => {
    //get img urls
    if (dbCities) {
      Promise.all(dbCities.map((el) => fetchUrl(el)))
        .then((urls) => {
          //[promise, promise, promise]
          // Create an array of objects where each object contains city and its URL
          const cityUrls = dbCities.map((el, index) => ({
            city: el.city,
            url: urls[index],
          }));
          setImageUrl(cityUrls);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [dbCities]);

  return (
    <>
      {dbCities &&
        dbCities.map((el) => {
          const currentUrl = imageUrl.find((url) => url.city === el.city);
          const start = formateDate(el.startDate)
          const end = formateDate(el.endDate)

          return (
            <>
              <div
                    key={el._id}
                    onClick={() => handleChecked(el)}
                    className={`cityCardWrapper ${checkedItem === el.city ? "checked" : ""}`}
                >
                <label>
                  <img src={currentUrl ? currentUrl.url : ""} alt="city photo"/>
                  <div className="cardInfo">
                    <p>{el.city}</p>
                    <p>{start}</p>
                    <p>{end}</p>
                  </div>
                </label>
              </div>{" "}
            </>
          );
        })}
    </>
  );
};
