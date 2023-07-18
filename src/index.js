import * as weather from "./weather-api.js";
import "./style.css";

weather.callWeatherApi();
weather.setLocation("Shanghai");
weather.callWeatherApi();