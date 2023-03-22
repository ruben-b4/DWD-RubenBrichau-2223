const apiKey = 'bab4a9d5589800aefb0877fbde66e63d'; // Vervang dit door je eigen API-key
const city = 'Brussel';
const language = 'nl';
const units = 'metric';

async function getWeather() {
    // build request
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=${language}&units=${units}`;

    // fetch 
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log('opvragen weer mislukt');
    }

    // get json data
    const weatherData = await resp.json();
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
   
    document.querySelector('#weer').innerHTML = `Het weer in ${city} is ${temp}°C en ${description}.`;
}

getWeather();