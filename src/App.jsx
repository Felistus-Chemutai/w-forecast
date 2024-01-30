import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import loading from "../public/images/images/loading";
import "./App.css";
import SearchComponent from "./Components/SearchComponent";
import TodayWeather from "./Components/TodayWeather";
import DailyCard from "./Components/DailyCard";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentCity, setCurrentCity] = useState("Nyeri");
  const [currentWeather, setCurrentWeather] = useState();
  function handleChange(event) {
    setSearchText(event.target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setCurrentCity(searchText);
    }
  }
  useEffect(() => {
    const API_KEY = "ae2a0b0783c26f2da1386f42ae36fb88";

    // lat={lat}&lon={lon}
    // lat=${lat}&lon=${lon}
    async function getCurrentWeatherData(cityName) {
      // const [lat, lon]= await getCoordinates(cityName)
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }

    getCurrentWeatherData(currentCity).then((data) => {
      setCurrentWeather(data);
    });
  }, [currentCity]);

  console.log(currentWeather);
  return (
    <div className="app">
      <SearchComponent
        searchText={searchText}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      <div
        className="main-component"
        style={currentWeather === undefined ? { justifyContent: "center" } : {}}
      >
        {currentWeather === undefined ? (
          <img src={loading} alt="loading" />
        ) : (
          <>
            <TodayWeather
              currentWeather={currentWeather}
              currentCity={currentCity}
            />
            <DailyCard currentWeather={currentWeather} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
