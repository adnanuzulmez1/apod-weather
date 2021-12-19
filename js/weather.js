const weatherInput = document.querySelector(".weather-input input");
const date2 = new Date();
const hours = date2.getHours();
const weatherRow = document.querySelector("#weather-row");
const firstWeather = document.querySelector("#first-weather");
const weatherBtn = document.querySelector("#weather-btn");
var key;
var langSelect = document.querySelector("#select-box");
var lang = "tr";
langSelect.addEventListener("change", (event) => {
    lang = event.target.value;
});

weatherInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        var counter = 0;
        weatherRow.innerHTML = "";
        firstWeather.innerHTML = "";
        const cityName = weatherInput.value;

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=38c5af88893e4c64818111641211110&q=${cityName}&days=1&aqi=yes&alerts=no&lang=${lang}`)
            .then(response => response.json())
            .then(json => {
                const country = json.location.country;
                const city = json.location.name;
                const region = json.location.region;
                const airQualityRaw = JSON.stringify(json.current.air_quality.co)
                const airDot = airQualityRaw.indexOf(".");
                var airQuality;
                if (airQualityRaw.includes(".")) {
                    airQuality = airQualityRaw.slice(0, airDot);
                } else {
                    airQuality = airQualityRaw;
                }


                for (key = parseInt(hours); key < json.forecast.forecastday[0].hour.length; key++) {
                    const WeatherIcon = json.forecast.forecastday[0].hour[key].condition.icon;
                    const weatherCelsius = json.forecast.forecastday[0].hour[key].temp_c;
                    const fullDate = json.forecast.forecastday[0].hour[key].time;
                    const weatherText = json.forecast.forecastday[0].hour[key].condition.text;
                    const maxTemp = json.forecast.forecastday[0].day.maxtemp_c;
                    const minTemp = json.forecast.forecastday[0].day.mintemp_c;
                    let createTemplate = `
                <div class="fade-anim weather-now">
                    <img src="${WeatherIcon}">
                    <h5>${fullDate}</h5>
                    <h4>${weatherText}</h4>
                    <h3 class="city">${country}</h3>
                    <h3 class="city">${region}-${city}</h3>
                    <h3>CO Level: ${airQuality}</h3>
                    <h3>°${minTemp} - °${maxTemp}</h3>
                </div>
                `
                    let createOtherTemplate = `
                <div class="fade-anim col-lg-3 col-6">
                    <img src="${WeatherIcon}">
                    <h5>${key}:00</h5>
                    <h4>${weatherText}</h4>
                    <h3>°${weatherCelsius}</h3>
                </div>
                `
                    if (counter === 0) {
                        firstWeather.insertAdjacentHTML("beforeend", createTemplate);
                        counter++;
                    } else if (counter == 5) {
                        break;
                    } else {
                        weatherRow.insertAdjacentHTML("beforeend", createOtherTemplate);
                        counter++;
                    }
                    weatherRow.classList.add("fade-anim")
                    console.log(weatherCelsius, weatherText, lang);
                }
            })
    }
})

weatherBtn.addEventListener("click", () => {
    var counter = 0;
    weatherRow.innerHTML = "";
    firstWeather.innerHTML = "";
    const cityName = weatherInput.value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=38c5af88893e4c64818111641211110&q=${cityName}&days=1&aqi=yes&alerts=no&lang=${lang}`)
        .then(response => response.json())
        .then(json => {


            const country = json.location.country;
            const city = json.location.name;
            const region = json.location.region;
            const airQualityRaw = JSON.stringify(json.current.air_quality.co)
            const airDot = airQualityRaw.indexOf(".");
            var airQuality;

            if (airQualityRaw.includes(".")) {
                airQuality = airQualityRaw.slice(0, airDot);
            } else {
                airQuality = airQualityRaw;
            }

            for (key = parseInt(hours); key < json.forecast.forecastday[0].hour.length; key++) {
                const WeatherIcon = json.forecast.forecastday[0].hour[key].condition.icon;
                const weatherCelsius = json.forecast.forecastday[0].hour[key].temp_c;
                const fullDate = json.forecast.forecastday[0].hour[key].time;
                const weatherText = json.forecast.forecastday[0].hour[key].condition.text;
                const maxTemp = json.forecast.forecastday[0].day.maxtemp_c;
                const minTemp = json.forecast.forecastday[0].day.mintemp_c;
                let createTemplate = `
                <div class="fade-anim weather-now">
                    <img src="${WeatherIcon}">
                    <h5>${fullDate}</h5>
                    <h4>${weatherText}</h4>
                    <h3 class="city">${country}</h3>
                    <h3 class="city">${region}-${city}</h3>
                    <h3>CO Level: ${airQuality}</h3>
                    <h3>°${minTemp} - °${maxTemp}</h3>
                </div>
                `
                let createOtherTemplate = `
                <div class="fade-anim col-lg-3 col-6">
                    <img src="${WeatherIcon}">
                    <h5>${key}:00</h5>
                    <h4>${weatherText}</h4>
                    <h3>°${weatherCelsius}</h3>
                </div>
                `
                if (counter === 0) {
                    firstWeather.insertAdjacentHTML("beforeend", createTemplate);
                    counter++;
                } else if (counter == 5) {
                    break;
                } else {
                    weatherRow.insertAdjacentHTML("beforeend", createOtherTemplate);
                    counter++;
                }
                weatherRow.classList.add("fade-anim")
                console.log(weatherCelsius, weatherText, lang);
            }
        })
})