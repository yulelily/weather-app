import format from "date-fns/format";

let celsius = true;
const toggleCelsiusBtn = document.querySelector(".toggle-celsius-btn");
function toggleCelsius() {
    celsius === true ? celsius = false : celsius = true; 
    if (celsius) {
        toggleCelsiusBtn.textContent = "displaying °C";
    } else {
        toggleCelsiusBtn.textContent = "displaying °F";
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

    console.log(weatherData);
    displayHourly(today.hour, forecastDays[1].hour, format(new Date(weatherData.location.localtime), "H"));

    displayForecast(forecastDays[1], forecastDays[2]);
}

function displayCurrentInfo(weatherData, today) {
    const current = weatherData.current;

    const condition = current.condition.text;
    displayCondition.textContent = condition;
    displayConditionIcon.src = current.condition.icon;
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
    currentHour++;

    let displayCount = 0;
    while(currentHour < 24) {
        const hourCard = document.createElement("div");
        const hourTitle = document.createElement("p");
        hourTitle.textContent = format(new Date(hours[currentHour].time), "h a");
        hourCard.appendChild(hourTitle);

        hourlyDiv.appendChild(hourCard);
        currentHour++;
        displayCount++;
    }

    let tomorrowHour = 0;
    while (displayCount < 24) {
        const hourCard = document.createElement("div");
        const hourTitle = document.createElement("p");
        hourTitle.textContent = format(new Date(hours[tomorrowHour].time), "h a");
        hourCard.appendChild(hourTitle);

        hourlyDiv.appendChild(hourCard);
        tomorrowHour++;
        displayCount++;
    }
}

const tomorrowDate = document.querySelector(".tomorrow-date");
const tomorrowTemps = document.querySelector(".tomorrow-min-max-temp");
const tomorrowConditionIcon = document.querySelector(".tomorrow-condition-icon");
const dayafterDate = document.querySelector(".dayafter-date");
const dayafterTemps = document.querySelector(".dayafter-min-max-temp");
const dayafterConditionIcon = document.querySelector(".dayafter-condition-icon");
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
    tomorrowConditionIcon.src = tomorrow.day.condition.icon;
    tomorrowConditionIcon.alt = tCondition;
    tomorrowConditionIcon.title = tCondition;

    const daCondition = dayafter.day.condition.text;
    dayafterConditionIcon.src = dayafter.day.condition.icon;
    dayafterConditionIcon.alt = daCondition;
    dayafterConditionIcon.title = daCondition;
}

export {
    toggleCelsius,
    currentDOM,
};