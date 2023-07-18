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
const displayTrueDegrees = document.querySelector(".display-true-degrees");
const displayDegrees = document.querySelector(".display-degrees");

// location
const displayNameRegion = document.querySelector(".display-name-region");
const displayCountry = document.querySelector(".display-country");
const dateMonthDayYear = document.querySelector(".date-month-day-year");
const dateTime = document.querySelector(".date-time");

async function currentDOM(weatherDataPromise) {
    const weatherData = await weatherDataPromise;
    console.log(weatherData);
    
    const current = weatherData.current;
    displayCondition.textContent = `${current.condition.text}`;
    if (celsius) {
        displayTrueDegrees.textContent = `${current.temp_c} °C`;
        displayDegrees.textContent = `Feels Like: ${current.feelslike_c} °C`;
    } else {
        displayTrueDegrees.textContent = `${current.temp_f} °F`;
        displayDegrees.textContent = `Feels Like: ${current.feelslike_f} °F`;
    }

    const location = weatherData.location;
    const name = location.name;
    const region = location.region
    displayNameRegion.textContent = `${name}`
    if (region !== name && region) {
        displayNameRegion.textContent += `, ${region}`;
    }
    displayCountry.textContent = `${location.country}`;
    dateMonthDayYear.textContent = format(new Date(location.localtime), "LLLL do, y");
    dateTime.textContent = format(new Date(location.localtime), "h:mm a");
}

export {
    toggleCelsius,
    currentDOM
};