# Weather Forecast

Full-stack aplication

## Description

This web application serves to create a trip and monitor the weather forecast for each selected trip.

## Tech Stack

- HTML
- CSS
- JS
- React.js
- Node.js
- Express.js
- axios
- MongoDB
- REST API
- Lucide-react

### Architecture
The application was created on React JS. Also i used Express.js to interract with Data Base. I choosed Mongo DB to store data.
When you load page useEffect hook sending an HTTP request to Visual Crossing API, which retrieves weather forecast data for initial city. All the cities are stored in Data base. The application interracting with data base using an end-points (set and post). 
To get images for each city I used Unsplash API. 
We can choose city in two ways: by clicking on it and by typing the existing city's name in the input. The chosen city will have blue border.
To add trip click on button 'Add trip' which places at the end of trips. This action will cause the apperance of the form. The form contains 3 fields: city which you'd like to visit and time range of your vacation (Start date and End date fields). All the fields 
are required.

Under the cities list places the weekly weather forecast. If your trip is equal or longer than a 7 days - it will shows forecast for 
7 days. If it's less than 7 days - all the days will appear on screen.

The right side of the screen represents the today's weather in chosen city and timer which shows the countdown till the start of your 
trip.
