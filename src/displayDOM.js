import format from "date-fns/format";

let celsius = true;
const toggleCelsiusBtn = document.querySelector(".toggle-celsius-btn");
function toggleCelsius() {
    celsius === true ? celsius = false : celsius = true; 
    if (celsius) {
        toggleCelsiusBtn.textContent = "°C→°F";
    } else {
        toggleCelsiusBtn.textContent = "°F→°C";
    }
}

// current
const displayCondition = document.querySelector(".display-condition");
const displayConditionIcon = document.querySelector(".display-condition-icon");
const displayTrueDegrees = document.querySelector(".display-true-degrees");
const displayDegrees = document.querySelector(".display-degrees");
const displayChanceOfRain = document.querySelector(".display-chance-of-rain");
const displayChanceOfSnow = document.querySelector(".display-chance-of-snow");
const displayHigh = document.querySelector(".display-high");
const displayLow = document.querySelector(".display-low");
const displayWindSpeed = document.querySelector(".display-wind-speed");
const displayHumidity = document.querySelector(".display-humidity");
const displayUVIndex = document.querySelector(".display-uv-index");
// location
const displayNameRegion = document.querySelector(".display-name-region");
const displayCountry = document.querySelector(".display-country");
const dateMonthDayYear = document.querySelector(".date-month-day-year");
const dateTime = document.querySelector(".date-time");
// hourly
const hourlyDiv = document.querySelector(".hourly");
async function currentDOM(weatherDataPromise) {
    const weatherData = await weatherDataPromise;
    const forecastDays = weatherData.forecast.forecastday;
    const today = forecastDays[0];

    displayCurrentInfo(weatherData, today);

    displayHourly(today.hour, forecastDays[1].hour, format(new Date(weatherData.location.localtime), "H"));

    displayForecast(forecastDays[1], forecastDays[2]);
}

function displayCurrentInfo(weatherData, today) {
    const current = weatherData.current;

    const condition = current.condition.text;
    displayCondition.textContent = condition;
    displayConditionIcon.src = `https:${current.condition.icon}`;
    displayConditionIcon.alt = condition;
    displayConditionIcon.title = condition;

    if (celsius) {
        displayHigh.textContent = `${today.day.maxtemp_c} °C`;
        displayLow.textContent = `${today.day.mintemp_c} °C`;
        displayTrueDegrees.textContent = `${current.temp_c} °C`;
        displayDegrees.textContent = `${current.feelslike_c} °C`;
        displayWindSpeed.textContent = `${today.day.maxwind_kph} km/h`;
    } else {
        displayHigh.textContent = `${today.day.maxtemp_f} °F`;
        displayLow.textContent = `${today.day.mintemp_f} °F`;
        displayTrueDegrees.textContent = `${current.temp_f} °F`;
        displayDegrees.textContent = `${current.feelslike_f} °F`;
        displayWindSpeed.textContent = `${today.day.maxwind_mph} mph`;
    }

    displayChanceOfRain.textContent = `${today.day.daily_chance_of_rain} %`;
    displayChanceOfSnow.textContent = `${today.day.daily_chance_of_snow} %`;
    displayHumidity.textContent = `${today.day.avghumidity} %`;
    displayUVIndex.textContent = today.day.uv;

    const location = weatherData.location;
    const name = location.name;
    const region = location.region
    displayNameRegion.textContent = `${name}`
    if (region !== name && region) {
        displayNameRegion.textContent += `, ${region}`;
    }
    displayCountry.textContent = `${location.country}`;
    dateMonthDayYear.textContent = format(new Date(location.localtime), "LLLL do, y");
    dateTime.textContent = format(new Date(location.localtime), "EEEE, h:mm a");
}

function displayHourly(hours, tomorrowHours, currentHour) {
    hourlyDiv.replaceChildren();
    currentHour++;

    let displayCount = 0;
    while(currentHour < 24) {
        const hourCard = document.createElement("div");
        const hourTitle = document.createElement("p");
        hourTitle.textContent = format(new Date(hours[currentHour].time), "h a");
        hourCard.appendChild(hourTitle);

        const temp = document.createElement("p");
        if (celsius) {
            temp.textContent = `${hours[currentHour].temp_c} °C`;
        } else {
            temp.textContent = `${hours[currentHour].temp_f} °F`;
        }
        hourCard.appendChild(temp);

        const img = new Image();
        img.src = `https:${hours[currentHour].condition.icon}`;
        const condition = hours[currentHour].condition.text;
        img.alt = condition;
        img.title = condition;
        hourCard.appendChild(img);

        if (hours[currentHour].chance_of_rain) {
            const rain = document.createElement("p")
            rain.textContent = `🌧 ${hours[currentHour].chance_of_rain} %`;
            hourCard.appendChild(rain);
        }
        if (hours[currentHour].chance_of_snow) {
            const snow = document.createElement("p");
            snow.textContent = `❄ ${hours[currentHour].chance_of_snow} %`;
            hourCard.appendChild(snow);
        }

        hourlyDiv.appendChild(hourCard);
        currentHour++;
        displayCount++;
    }

    let tomorrowHour = 0;
    while (displayCount < 24) {
        const hourCard = document.createElement("div");
        const hourTitle = document.createElement("p");
        hourTitle.textContent = format(new Date(tomorrowHours[tomorrowHour].time), "h a");
        hourCard.appendChild(hourTitle);

        const temp = document.createElement("p");
        if (celsius) {
            temp.textContent = `${tomorrowHours[tomorrowHour].temp_c} °C`;
        } else {
            temp.textContent = `${tomorrowHours[tomorrowHour].temp_f} °F`;
        }
        hourCard.appendChild(temp);

        const img = new Image();
        img.src = `https:${tomorrowHours[tomorrowHour].condition.icon}`;
        const condition = tomorrowHours[tomorrowHour].condition.text;
        img.alt = condition;
        img.title = condition;
        hourCard.appendChild(img);

        if (tomorrowHours[tomorrowHour].chance_of_rain) {
            const rain = document.createElement("p")
            rain.textContent = `🌧 ${tomorrowHours[tomorrowHour].chance_of_rain} %`;
            hourCard.appendChild(rain);
        }
        if (tomorrowHours[tomorrowHour].chance_of_snow) {
            const snow = document.createElement("p");
            snow.textContent = `❄ ${tomorrowHours[tomorrowHour].chance_of_snow} %`;
            hourCard.appendChild(snow);
        }

        hourlyDiv.appendChild(hourCard);
        tomorrowHour++;
        displayCount++;
    }
}

const tomorrowDate = document.querySelector(".tomorrow-date");
const tomorrowTemps = document.querySelector(".tomorrow-min-max-temp");
const tomorrowConditionIcon = document.querySelector(".tomorrow-condition-icon");
const tomorrowRainOrSnow = document.querySelector(".tomorrow-rain-or-snow");

const dayafterDate = document.querySelector(".dayafter-date");
const dayafterTemps = document.querySelector(".dayafter-min-max-temp");
const dayafterConditionIcon = document.querySelector(".dayafter-condition-icon");
const dayafterRainOrSnow = document.querySelector(".dayafter-rain-or-snow");
function displayForecast(tomorrow, dayafter) {
    tomorrowDate.textContent = format(new Date(tomorrow.date), "EEEE");
    dayafterDate.textContent = format(new Date(dayafter.date), "EEEE");

    if (celsius) {
        tomorrowTemps.textContent = `${tomorrow.day.maxtemp_c} °C / ${tomorrow.day.mintemp_c} °C`;
        dayafterTemps.textContent = `${dayafter.day.maxtemp_c} °C / ${dayafter.day.mintemp_c} °C`;
    } else {
        tomorrowTemps.textContent = `${tomorrow.day.maxtemp_f} °F / ${tomorrow.day.mintemp_f} °F`;
        dayafterTemps.textContent = `${dayafter.day.maxtemp_f} °F / ${dayafter.day.mintemp_f} °F`;
    }

    const tCondition = tomorrow.day.condition.text;
    tomorrowConditionIcon.src = `https:${tomorrow.day.condition.icon}`;
    tomorrowConditionIcon.alt = tCondition;
    tomorrowConditionIcon.title = tCondition;

    const daCondition = dayafter.day.condition.text;
    dayafterConditionIcon.src = `https:${dayafter.day.condition.icon}`;
    dayafterConditionIcon.alt = daCondition;
    dayafterConditionIcon.title = daCondition;

    tomorrowRainOrSnow.replaceChildren();
    if (tomorrow.day.daily_chance_of_rain) {
        const rain = document.createElement("p")
        rain.textContent = `🌧 ${tomorrow.day.daily_chance_of_rain} %`;
        tomorrowRainOrSnow.appendChild(rain);
    }
    if (tomorrow.day.daily_chance_of_snow) {
        const snow = document.createElement("p");
        snow.textContent = `❄ ${tomorrow.day.daily_chance_of_snow} %`;
        tomorrowRainOrSnow.appendChild(snow);
    }

    dayafterRainOrSnow.replaceChildren();
    if (dayafter.day.daily_will_it_rain) {
        const rain = document.createElement("p")
        rain.textContent = `🌧 ${dayafter.day.daily_chance_of_rain} %`;
        dayafterRainOrSnow.appendChild(rain);
    }
    if (dayafter.day.daily_will_it_snow) {
        const snow = document.createElement("p");
        snow.textContent = `❄ ${dayafter.day.daily_chance_of_snow} %`;
        dayafterRainOrSnow.appendChild(snow);
    }
}

export {
    toggleCelsius,
    currentDOM,
};