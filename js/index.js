const apiKey = '15aa8949769647ca849211327242112';
var search = document.querySelector(".weather form input[type='search']");
var todayWeather = document.querySelector(".weather .weather-days .row .item1");
var tomorrowWeather = document.querySelector(".weather .weather-days .row .item2");
var afterTomorrowWeather = document.querySelector(".weather .weather-days .row .item3");
var hourlyForeset = document.querySelector(".weather .weather-days .row .item4 .row");
// var mode = document.querySelector(".mode");
// var modeChange = document.querySelector(".mode-change");
// var weather = document.querySelector(".weather");


search.addEventListener("input", async function (e) {
    const searchData = search.value;
    const data = await getData(searchData);
    displayToday(data);
    hourForest(data)


});

async function getData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=${apiKey}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function displayToday(weatherData) {
    let box1 = '';
    let box2 = '';
    let box3 = '';

    if (weatherData.forecast.forecastday) {

        const first = weatherData.forecast.forecastday[0];
        const second = weatherData.forecast.forecastday[1];
        const third = weatherData.forecast.forecastday[2];
        let currentDate = new Date(first.date);
        var date = currentDate.toDateString()
        var today = date.split(" ").splice(0, 1).join("")

        let tomorrowDate = new Date(second.date);
        var date = tomorrowDate.toDateString()
        var tomorrow = date.split(" ").splice(0, 1).join("")

        let afterTomorrowDate = new Date(third.date);
        var date = afterTomorrowDate.toDateString()
        var afterTomorrow = date.split(" ").splice(0, 1).join("")


        box1 = `
            <div class="date">
                <div class="day">
                    <span>${today}</span>
                </div>
                <div class="month">
                    <span>${first.date}</span>
                </div>
            </div>
            <div class="location">
                <span>${weatherData.location.name}, ${weatherData.location.country}</span>
            </div>
            <div class="degree">
                <span>${first.day.maxtemp_c}°C</span>
            </div>
            <div class="cutom d-flex align-items-center justify-content-between fs-4">
                ${first.day.condition.text}
                <div class="img">
                    <img src="${first.day.condition.icon}" alt="" class="w-50">
                </div>
            </div>
            <div class="stutus">
                <span class="d-flex align-items-center justify-content-center gap-2">
                    <img src="images/icon-umberella.png" alt="">
                    <span>${first.day.daily_chance_of_rain}%</span>
                </span>
                <span class="d-flex align-items-center justify-content-center gap-2">
                    <img src="images/icon-wind.png" alt="">
                    <span>${first.day.maxwind_kph} km/h</span>
                </span>
                <span class="d-flex align-items-center justify-content-center gap-2">
                    <img src="images/icon-compass.png" alt="">
                    <span>${weatherData.current.wind_dir}</span>
                </span>
            </div>
        `;

        box3 = `
            <div class="date text-center d-block">
                <div class="day text-center">
                    <span>${tomorrow}</span>
                </div>
            </div>
            <div class="degree d-flex flex-column my-4">
                <span class="fs-2 text-white mt-3">
                    ${third.day.maxtemp_c}C
                </span>
                <span>
                    ${third.day.mintemp_c}C
                </span>
            </div>
           <div class="cutom d-flex align-items-center justify-content-between fs-4">
                ${third.day.condition.text}
                <div class="img">
                    <img src="${third.day.condition.icon}" alt="" class="w-50">
                </d
        `;

        box2 = `
            <div class="date text-center d-block">
                <div class="day text-center">
                    <span>${afterTomorrow}</span>
                </div>
            </div>
            <div class="degree d-flex flex-column my-4">
                <span class="fs-2 text-white mt-3">
                    ${second.day.maxtemp_c}C
                </span>
                <span>
                    ${second.day.mintemp_c}C
                </span>
            </div>
            <div class="cutom d-flex align-items-center justify-content-between fs-4">
                ${second.day.condition.text}
                <div class="img">
                    <img src="${second.day.condition.icon}" alt="" class="w-50">
                </d
        `;
    } else {
        box1 = '<p>No data available</p>';
    }

    todayWeather.innerHTML = box1;
    tomorrowWeather.innerHTML = box2;
    afterTomorrowWeather.innerHTML = box3;

}
function hourForest(weatherData) {
    weatherData = weatherData.forecast.forecastday[0].hour.splice(0, 6)

    var box = ''
    for (var i = 0; i < weatherData.length; i++) {
        var dayHour = weatherData[i].time.split(" ").splice(1, 2).join("")
        box += `<div class="col">
          <div class="hour-foreset d-flex justify-content-between align-items-center flex-column bg-gradient rounded-5 p-4 my-4">
        <div class="hour">
                 <span>${dayHour}</span>
                  </div>
                  <div class="icone w-50">
                  <img src="${weatherData[i].condition.icon}" alt="">
                   </div>
                 <div class="wind">
                  <span>${weatherData[i].temp_c}C</span>
                  </div>
                  </div></div>`
    }
    hourlyForeset.innerHTML = box

}
// mode.addEventListener("click", function() {
//     modeChange.style.transform = "translateX(100%)";
//     var state = document.documentElement.classList.toggle("light-mode"); // استخدام documentElement للوصول إلى عنصر html
//     if (!state) {
//         document.documentElement.classList.remove("light-mode");
//         modeChange.style.transform = "translateX(0)";
//     }
// });
