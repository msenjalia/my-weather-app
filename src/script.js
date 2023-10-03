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

// Local weather data
function getPosition(position) {
  let longitude = position.coords.longitude;
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  console.log(position.coords.latitude);
  let apiKey = "b9b0b6e5b943ffbecf4de9d704e0c0f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  function currentTemperature(response) {
    console.log(response.data);
    let city = document.querySelector("#currentCity");
    city.innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = `${temperature}&degC`;
    let description = document.querySelector(".description");
    description.innerHTML = response.data.weather[0].description;
  }
  axios.get(apiUrl).then(currentTemperature);
}
navigator.geolocation.getCurrentPosition(getPosition);
// Search Event
function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector("#search-field");
  let searchTxt = input.value.trim();

  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "b9b0b6e5b943ffbecf4de9d704e0c0f3";
  let apiUrl = `${apiEndpoint}?q=${searchTxt}&appid=${apiKey}&units=${units}`;

  function showTemperature(response) {
    console.log(response.data);

    let city = document.querySelector("#currentCity");
    city.innerHTML = response.data.name;

    let currentTemp = document.querySelector(".temp");
    let cityTemp = Math.round(response.data.main.temp);
    currentTemp.innerHTML = `${cityTemp}&degC`;

    let maxTemp = document.querySelector("#high");
    let maxHigh = Math.round(response.data.main.temp_max);
    maxTemp.innerHTML = `High ${maxHigh}&degC`;

    let lowTemp = document.querySelector("#low");
    let minLow = Math.round(response.data.main.temp_min);
    lowTemp.innerHTML = `Low ${minLow}&degC`;

    let description = document.querySelector(".description");
    description.innerHTML = response.data.weather[0].description;

    let humidity = document.querySelector(".humidity");
    let humid = response.data.main.humidity;
    humidity.innerHTML = `Humidity: ${humid} %`;

    let wind = document.querySelector(".wind");
    let windSpeed = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${windSpeed} km/h`;
  }
  axios.get(apiUrl).then(showTemperature);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
