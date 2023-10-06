function formatDate() {
  return `${currentDay}, ${currentMonth} ${date}`;
}
function formatTime() {
  return `${hour}:${minutes}`;
}
let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();

let day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let currentDay = day[now.getDay()];

let Month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = Month[now.getMonth()];

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = formatDate();

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatTime();

// forecast data
function displayForecast() {}

// Local weather data on load
function getPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "b9b0b6e5b943ffbecf4de9d704e0c0f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

// Search Event
function showTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#currentCity");

  city.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  cityCoord = response.data.coord;

  let currentTemp = document.querySelector("#displayTemp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);

  let maxTemp = document.querySelector("#high");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);

  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector(".humidity");
  let humid = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humid} %`;

  let wind = document.querySelector(".wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windSpeed} km/h`;

  let icon = document.querySelector("#icon");
  let weatherIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector("#search-field");
  let searchTxt = input.value.trim();

  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "b9b0b6e5b943ffbecf4de9d704e0c0f3";
  let apiUrl = `${apiEndpoint}?q=${searchTxt}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

// unit conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#displayTemp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#displayTemp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

navigator.geolocation.getCurrentPosition(getPosition);

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
