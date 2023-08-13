const url = "https://api.openweathermap.org/data/2.5/";
const key = "a94df8162bfcbc26fce3bdd8fc2397fb";

// input with enter key
const setQuery = (e) => {
  if (e.keyCode == "13") getResult(searchBar.value);
};

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keypress", setQuery);

// Data extraction by city name
const getResult = (cityName) => {
  let query = `
  ${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr
  `;

  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)
    .catch(() => {
      document.querySelector(".error").style.display = "block";
    });

  searchBar.value = "";
};

//print data from api to screen
const displayResult = (result) => {
  document.querySelector(".error").style.display = "none";

  let city = document.querySelector(".city");
  city.innerText = `${result.name} / ${result.sys.country}
  `;

  let temp = document.querySelector(".temp");
  temp.innerText = `${Math.round(result.main.temp)}°C`;

  let desc = document.querySelector(".desc");
  desc.innerText = ` ${result.weather[0].description} `;

  let wind = document.querySelector(".wind");
  wind.innerText = ` ${result.wind.deg} / ${result.wind.speed}`;

  let droplet = document.querySelector(".droplet");

  droplet.innerText = ` ${result.main.humidity}`;

  let icons = document.querySelector(".icons");
  icons.classList.remove("hidden");

  let weatherIcon = `images/${result.weather[0].icon}.png`;

  let img = document.querySelector(".img");
  img.src = weatherIcon;
};
