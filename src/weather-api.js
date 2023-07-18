let location = "hongkong";
// try catch block throws an error if user submits empty form, thus ${location} as default parameter
async function currentWeather(searchLocation = `${location}`) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8a12a04504b043f893f32235231307&q=${searchLocation}&days=3`, {mode: "cors"});

        if (!response.ok) {
            throw new Error ("Something went wrong with fetch (forecast).");
        }
        location = searchLocation;
        return await response.json();
    } catch(error) {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8a12a04504b043f893f32235231307&q=${location}&days=3`, {mode: "cors"});
        return await response.json();
    }
}

export {
    currentWeather
};