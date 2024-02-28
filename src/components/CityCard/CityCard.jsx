import { useContext, useEffect, useState } from "react";
import { TripContext } from "../Main/Main";
import { formatDate } from "../../utils/formatDate";
import "./CityCard.css";

const accessKey = "t7hhZ5uulANaG1kjtrYjldaQyenQzp6RmunyhjqRz5w";

export const CityCard = () => {
  const { dbCities, setTrip, checkedItem, setCheckedItem } = useContext(TripContext)
  
  const [imageUrl, setImageUrl] = useState([]);

  const handleChecked = (city) => {
    setCheckedItem(city.city);
    setTrip({ city: city.city, start: city.startDate, end: city.endDate });
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


  useEffect(() => {//get img urls
    if (dbCities) {
      Promise.all(dbCities.map((el) => fetchUrl(el)))
        .then((urls) => {
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
          const start = formatDate(el.startDate);
          const end = formatDate(el.endDate);

          return (
            <>
              <div
                key={el._id}
                onClick={() => handleChecked(el)}
                className={`cityCardWrapper ${
                  checkedItem === el.city ? "checked" : ""
                }`}
              >
                <img src={currentUrl ? currentUrl.url : ""} alt="city photo" />
                <div className="cardInfo">
                  <p>{el.city}</p>
                  <p>{start}</p>
                  <p>{end}</p>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};
