import {
  extractCoords,
  getAddressByCity,
  makeWeekData,
  makeDayData,
  makeSunData,
  makeWindSpeedData,
  updateWindDirection,
  makeWeatherTypeData,
  getCurrentLocation,
  getPosition,
  dataConversion,
  makeTempData,
} from "./modules/module.js";
import {
  DisplayTemperature,
  DisplayWeatherType,
  DisplaySunset,
  DisplayWind,
  DisplayWeatherTypeOnly,
  DisplayForecastDaily,
} from "./modules/view.js";

// let displayElementId = '';
let weatherData;
let searchData;

initApp();

function initApp() {
  getPosition()
    .then(({ latitude, longitude }) => {
      return getCurrentLocation(latitude, longitude);
    })
    .then((data) => {
      weatherData = data;
      const allData = dataConversion(weatherData);

      DisplayTemperature(allData, "myApp");
      DisplayWind(allData, "windSpeed");
      DisplayWeatherType(allData, "weatherType");
      DisplaySunset(allData, "sunSet");
      DisplayForecastDaily(allData, "forecast");
    })
    .catch((error) => {
      console.error("Error getting location:", error);
    });
}

// CALLBACKS HER ("KLIKKERE")
// hoisted functions
window._viewCallbacks = { weatherClick, returnClick };

function weatherClick(weatherTypeData) {
  DisplayWeatherTypeOnly(weatherTypeData, "weatherType");
}

function returnClick() {
  initApp();
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.code === 13) {
    getAddressByCity(searchInput.value)
      .then((coordinates) => {
        return extractCoords(coordinates);
      })
      .then(({ latitude, longitude }) => {
        return getCurrentLocation(latitude, longitude);
      })
      .then((data) => {
        searchData = data;
        const allSearchedData = dataConversion(searchData);

        DisplayTemperature(allSearchedData, "myApp");
        DisplayWind(allSearchedData, "windSpeed");
        DisplayWeatherType(allSearchedData, "weatherType");
        DisplaySunset(allSearchedData, "sunSet");
      })
      .catch((error) => {
        console.error("Error getting location:", error);
      });
  }
});



// DARKMODE:

document.addEventListener("DOMContentLoaded", function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const body = document.body;

  // Check the user's preference from previous visits, if available
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
      enableDarkMode();
      toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener('change', () => {
      if (toggleSwitch.checked) {
          // Toggle is ON (Dark mode)
          enableDarkMode();
      } else {
          // Toggle is OFF (Normal mode)
          disableDarkMode();
      }
  });

  function enableDarkMode() {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
  }

  function disableDarkMode() {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', null);
  }
});



/* function enableDragAndDrop() {
  var draggableElement = document.getElementById("element1");
  var isDragging = false;
  var offsetX = 0;

  draggableElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - draggableElement.getBoundingClientRect().left;
    e.preventDefault();
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      var left = e.clientX - offsetX;
      draggableElement.style.left = left + "px";
    }
  });
}

// Kald funktionen for at aktivere træk-og-slip-funktionaliteten
enableDragAndDrop(); */
