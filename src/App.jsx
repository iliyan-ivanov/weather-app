import { useEffect, useState } from "react";
import "./App.css";
import countries from "./countries";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Sofia");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8f9821771942355cf750149c18f182ca&units=metric`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((cityData) => setData(cityData));
  }, []);

  const searchCity = (e) => {
    if (e.key === "Enter") {
      fetch(url)
        .then((res) => res.json())
        .then((cityData) => setData(cityData));
    }
  };

  return (
    <main className="app">
      <section className="container">
        <article className="top">
          <div className="search">
            <input
              type="text"
              value={location}
              onKeyDown={searchCity}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="location">
            {data?.name ? <h2>City: {data?.name}</h2> : <h2>{data.message}</h2>}
          </div>
          <div className="country">
            <h2>{countries[data.sys?.country]}</h2>
          </div>
          <div className="temp">
            <h1>{data.main?.temp.toFixed(0)}ºC</h1>
          </div>
          <div className="description">
            <h2>{data.weather ? data.weather[0].description : null}</h2>
          </div>
        </article>
        <article className="bottom">
          <div className="feels">
            <p>{data.main?.feels_like.toFixed(0)}ºC</p>
            <p>Feels like</p>
          </div>
          <div className="wind">
            <p>{data.wind?.speed} MPH</p>
            <p>Wind Speed</p>
          </div>
          <div className="humidity">
            <p>{data.main?.humidity}%</p>
            <p>Humidity</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
