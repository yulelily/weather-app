import * as weather from "./weather-api.js";
import * as display from "./displayDOM.js";
import "./style.css";

const toggleCelsiusBtn = document.querySelector(".toggle-celsius-btn");
toggleCelsiusBtn.addEventListener("click", () => {
    display.toggleCelsius();
    display.currentDOM(weather.currentWeather());
});

const searchForm = document.querySelector(".searchForm");
const searchInput = document.getElementById("locationQuery");
searchForm.addEventListener("submit", () => {
    display.currentDOM(weather.currentWeather(searchInput.value));
    searchForm.reset();
})

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
    display.currentDOM(weather.currentWeather(searchInput.value));
    searchForm.reset();
});

const refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.addEventListener("click", () => {
    display.currentDOM(weather.currentWeather());
});

const errorSpan = document.querySelector(".search-error");
errorSpan.style.display = "none";
errorSpan.textContent = "Error, no location found.";
display.currentDOM(weather.currentWeather());