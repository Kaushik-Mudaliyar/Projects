document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "948149a9032de1d66b25855bd0cd423a";

  getWeatherBtn.addEventListener("click", () => {
    getWeather();
  });
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  });

  async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    // Whenever you are making a call to someone else's server. You need to remember two things:-
    // server may throw you some errors.
    // server/database is always in another continent.

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  }

  // so to fetch and display the weather data from the weather api we are creating two different function, each function will do their respective work.
  async function fetchWeatherData(city) {
    // fetch the weather data from the weather api

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    // console.log(typeof response);
    // console.log("response", response);

    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // display the data on the screen
    // console.log(data);
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // unlock the display properties of the html
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // we are also creating a fucntion to show the error part which we had a class hidden. So we just need to remove the class to show the error.
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
