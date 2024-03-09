const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-button");
const cityNameEl = document.getElementById("cityname");
// const cityHistoryEl = document.getElementById("city-history"); // city history

const indexs = [0, 7, 15, 23, 31, 39];

const cityDayEl = Array.from({ length: 6 }, (_, i) => document.getElementById(`cityday${i}`));
const tempEls = Array.from({ length: 6 }, (_, i) => document.getElementById(`temp${i}`));
const humidEls = Array.from({ length: 6 }, (_, i) => document.getElementById(`humid${i}`));
const windEls = Array.from({ length: 6 }, (_, i) => document.getElementById(`wind${i}`));
const weatherIconEls = Array.from({ length: 6 }, (_, i) => document.getElementById(`weather-icon${i}`));
const weatherDisplayEl = document.getElementById("displayweather");
const weatherIconEl = document.getElementById("weather-icon");
const tempEl = document.getElementById("temp");
const apiKey = "50f4ed4873a72a56c7d4f0e301c00dd1";
let cities = [];
let city_history = [];
const temps = new Array(6);
const humids = new Array(6);
const winds = new Array(6);
const dates = new Array(6);

function getLocation(city) {
  const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=50f4ed4873a72a56c7d4f0e301c00dd1`;

  fetch(locationUrl)
    .then((data) => data.json())
    .then((data) => {
      const { lat, lon } = data[0];
      getWeather(lat, lon);
    });
}
function getWeather(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=english&appid=50f4ed4873a72a56c7d4f0e301c00dd1`;

  fetch(weatherUrl)
    .then((data) => data.json())
    .then((data) => {
      displayWeather(data);
    });
}
function displayWeather(data) {
  const city = data.city.name;
  // cityHistoryEl.textContent = ""; //

  for (let i = 0; i < 6; i++) {
    temps[i] = data.list[indexs[i]].main.temp;
    humids[i] = data.list[indexs[i]].main.humidity;
    winds[i] = data.list[indexs[i]].wind.speed;
    dates[i] = new Date(data.list[indexs[i]].dt * 1000);
  }
  console.log(temps);

  console.log(tempEls);
  // for (let i = 0; i < 5; i++) {
  //   cities.push(data.list[i]);
  // } //

  for (let j = 0; j < 6; j++) {
    tempEls[j].textContent = `Temperature: ${temps[j]}°C`;
    humidEls[j].textContent = `Humidity: ${humids[j]}%`;
    windEls[j].textContent = `Wind Speed: ${winds[j]} KM/H`;
    // cityDayEl[j].textContent = `City Day: ${city} ${dates[j].toLocaleDateString()}`; //
    // weatherIconEls[j].setAttribute("src", `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`); //
  }
}

searchButtonEl.addEventListener("click", () => {
  const searchInput = searchInputEl.value;
  getLocation(searchInput);

  if (city_history.length < 3) {
    city_history.unshift(searchInput);
  } else {
    city_history.length = city_history.length - 1;
    city_history.unshift(searchInput);
  }
  // updateCityHistory(city_history); //
});

// city_history = JSON.parse(localStorage.getItem("city_history")) || [];

// function printCityHistory() {
//   cityHistoryEl.innerHTML = "";

//   for (let i = 0; i < city_history.length; i++) {
//     const list = document.createElement("li");
//     list.setAttribute("id", city_history[i]);
//     cityHistoryEl.appendChild(list);
//     const container = document.getElementById(city_history[i]);
//     const button = document.createElement("button");
//     button.setAttribute("value", city_history[i]);
//     button.textContent = city_history[i];
//     container.appendChild(button);
//     button.addEventListener("click", (event) => {
//       const city = event.target.value;
//       getLocation(city);
//     });
//   }
// }

// function updateCityHistory(searchInput) {
//   localStorage.setItem("city_history", JSON.stringify(searchInput));
//   printCityHistory();
// }

// printCityHistory();
