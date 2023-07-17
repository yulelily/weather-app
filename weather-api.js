async function callWeatherApi() {
    try {
        const weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=8a12a04504b043f893f32235231307&q=${locationQ}`, {mode: "cors"});
        const weatherData = await weather.json();
        console.log(weatherData);
    } catch(error) {
        console.log("oops...");
    }
}

function setLocation(newLocation) {
    locationQ = newLocation;
}

let locationQ = "hongkong";

callWeatherApi();
setLocation("shanghai");
callWeatherApi();