import * as weather from "./weather-api.js";
import * as display from "./displayDOM.js";
import "./style.css";

const toggleCelsiusBtn = document.querySelector(".toggle-celsius-btn");
toggleCelsiusBtn.addEventListener("click", () => {
    display.toggleCelsius();
    display.currentDOM(weather.currentWeather());
});

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
    const searchForm = document.querySelector(".searchForm");
    const searchInput = document.getElementById("locationQuery").value;
    searchForm.reset();

    display.currentDOM(weather.currentWeather(searchInput));
});

display.currentDOM(weather.currentWeather("hongkong"));