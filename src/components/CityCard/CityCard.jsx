import { useEffect, useState } from "react";
import { getDayOfWeek } from "../../utils/getDayOfWeek";
import "./CityCard.css";
import axios from "axios";
import { set } from "mongoose";

const accessKey = "t7hhZ5uulANaG1kjtrYjldaQyenQzp6RmunyhjqRz5w";

export const CityCard = ({trip, setTrip}) => {
    
  const [imageUrl, setImageUrl] = useState([]);
  const [dbCities, setDbCities] = useState([]);
  const [checkedItem, setCheckedItem] = useState('Lviv');

  const handleChecked = (city) => {
    setCheckedItem(city.city);
    setTrip({city: city.city, start: city.startDate, end: city.endDate})
    console.log(city)
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

  const convertDate = (el) => {
    const startDate = new Date(el.startDate);
    const endDate = new Date(el.endDate);
    const formattedStart = `${String(startDate.getDate()).padStart(
      2,
      "0"
    )}.${String(startDate.getMonth() + 1).padStart(
      2,
      "0"
    )}.${startDate.getFullYear()}`;
    const formattedEnd = `${String(endDate.getDate()).padStart(
      2,
      "0"
    )}.${String(endDate.getMonth() + 1).padStart(
      2,
      "0"
    )}.${endDate.getFullYear()}`;
    return { formattedStart, formattedEnd };
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
  }, []);

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
          const start = convertDate(el).formattedStart;
          const end = convertDate(el).formattedEnd;
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
