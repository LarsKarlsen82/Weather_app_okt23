export function DisplayTemperature(currentTempData, displayElement) {
  // find dom elemenent
  const myApp = document.getElementById(displayElement);

  myApp.innerHTML = "";

  let myTempHtml = "";
  myTempHtml = `<h2>${currentTempData.tempData.temperature} °C</h2>`;

  myApp.innerHTML = myTempHtml;
}


// export function DisplayWind(currentWindData, displayElement) {
//   const Mywind = document.getElementById(displayElement);

//   Mywind.innerHTML = "";
  

//   console.log(currentWindData);
//   let windDirectionData = currentWindData.windData.windDirection;

//   let MyDirection = '';
//   //let North = `<i class="fa-regular fa-arrow-up"></i>`;
//   let North = '/assets/images/north.png';
//   //let NorthEast = `<i class="fa-solid fa-arrow-up-right"></i>`;
//   let NorthEast = '/assets/images/northEast.png';
//   let East = `<i class="fa-solid fa-arrow-right"></i>`;
//   let SouthEast = `<i class="fa-solid fa-arrow-down-right"></i>`;
//   let South = `<i class="fa-solid fa-arrow-down"></i>`;
//   let SouthWest = `<i class="fa-solid fa-arrow-down-left"></i>`;
//   let West = `<i class="fa-sharp fa-regular fa-arrow-left"></i>`;
//   //let NorthWest = `<i class="fa-solid fa-arrow-up-left"></i>`;
//   let NorthWest = 'assets/images/northWest.png';
//   let WindDefault = `<i class="fa-regular fa-comments-question"></i>`;

//   switch (windDirectionData) {
//     case 'North':
//       MyDirection = `${North}`;
//       break;
//     case 'North-East':
//       MyDirection = `${NorthEast}`;
//       break;
//     case 'East':
//       MyDirection = `${East}`;
//       break;
//     case 'South-East':
//       MyDirection = `${SouthEast}`;
//       break;
//     case 'South':
//       MyDirection = `${South}`;
//       break;
//     case 'South-West':
//       MyDirection = `${SouthWest}`;
//       break;
//     case 'West':
//       MyDirection = `${West}`;
//       break;
//     case 'North-West':
//       MyDirection = `${NorthWest}`;
//       break;
//     default:
//       MyDirection = `${WindDefault}`;
//       break;
//   }

//   // Convert wind speed from km/h to m/s
//   let windSpeedInMetersPerSecond = currentWindData.windData.windSpeed / 3.6;
//   //let windSpeedText = currentWindData.windData.windSpeed;
  
//   let windSpeedHTML = `${windSpeedInMetersPerSecond.toFixed(1)} m/s`;

//   Mywind.innerHTML = `<h4>${windDirectionData}</h4><h2>${windSpeedHTML}</h2>`;
// }

export function DisplayWind(currentWindData, displayElement) {
  const Mywind = document.getElementById(displayElement);
  console.log(currentWindData);
  Mywind.innerHTML = "";

  let windDirectionData = currentWindData.windData.windDirection;
  let MyDirection = '';

  switch (windDirectionData) {
    case 'North':
      MyDirection = 'assets/images/north.png';
      break;
    case 'North-East':
      MyDirection = 'assets/images/northEast.png';
      break;
    case 'North-West':
      MyDirection = 'assets/images/northWest.png';
      break;
    case 'South':
      MyDirection = 'assets/images/south.png';
      break;
    case 'South-East':
      MyDirection = 'assets/images/southEast.png';
      break;
    case 'South-West':
      MyDirection = 'assets/images/southWest.png';
      break;
    case 'West':
      MyDirection = 'assets/images/west.png';
      break;
    case 'East':
      MyDirection = 'assets/images/east.png';
      break;


    // Add cases for other directions similarly
    default:
      MyDirection = 'assets/images/default.png'; // Provide a default image path
      break;
  }

  let windSpeedInMetersPerSecond = currentWindData.windData.windSpeed / 3.6;
  let windSpeedHTML = `${windSpeedInMetersPerSecond.toFixed(1)} m/s`;

  // Create an image element and set its src attribute
  let image = document.createElement('img');
  image.src = MyDirection;

  image.alt = windDirectionData; // Set alternative text for accessibility

  // Apply CSS styles to the image element
  image.style.maxWidth = '30%'; // Limit the width to the div's width
  image.style.maxHeight = '100%'; // Limit the height to the div's height

  Mywind.appendChild(image); // Append the image element to the Mywind div

  Mywind.appendChild(image); // Append the image element to the Mywind div
  Mywind.innerHTML += `<h2>${windSpeedHTML}</h2>`;
}


export function DisplaySunset(currentSunset, displayElement) {
  const MYSunSet = document.getElementById(displayElement);

  let sunRiseHTML = `<h2>${currentSunset.sunData[0].sunrise}</h2>`;
  let sunSetHTML = `<h3>${currentSunset.sunData[0].sunset}</h3>`;
  MYSunSet.innerHTML = sunRiseHTML + sunSetHTML;
}

export function DisplayWeatherType(currentWeatherType, displayElement) {
  // console.log(currentWeatherType.weatherType[0]);

  // target element
  const targetElement = document.getElementById(displayElement);

  // clear html
  targetElement.innerHTML = "";

  let myWeatherTypeHtml = "";

  let clear = `<i class="fa-regular fa-sun iconSize"></i>`;
  let mainlyClear = `<i class="fa-solid fa-cloud-sun iconSize"></i>`;
  let fog = `<i class="fa-solid fa-smog iconSize"></i>`;
  let droplets = `<i class="fa-solid fa-droplet iconSize"></i>`;
  let rain = `<i class="fa-solid fa-cloud-rain iconSize"></i>`;
  let snow = `<i class="fa-regular fa-snowflake iconSize"></i>`;
  let rainShower = `<i class="fa-solid fa-cloud-showers-heavy iconSize"></i>`;
  let thunder = `<i class="fa-solid fa-bolt-lightning iconSize"></i>`;
  let noData = `<i class="fa-solid fa-circle-xmark iconSize"></i>`;

  // writing html with switch
  switch (currentWeatherType.weatherType[0]) {
    case "Clear sky":
      myWeatherTypeHtml = `${clear}`;
      break;
    case "Mainly clear, partly cloudy, and overcast":
      myWeatherTypeHtml = `${mainlyClear}`;
      break;
    case "Fog and depositing rime fog":
      myWeatherTypeHtml = `${fog}`;
      break;
    case "Drizzle: Light, moderate, and dense intensity":
      myWeatherTypeHtml = `${droplets}`;
      break;
    case "Freezing Drizzle: Light and dense intensity":
      myWeatherTypeHtml = `${droplets}`;
      break;
    case "Rain: Slight, moderate and heavy intensity":
      myWeatherTypeHtml = `${rain}`;
      break;
    case "Freezing Rain: Light and heavy intensity":
      myWeatherTypeHtml = `${rain}`;
      break;
    case "Snow fall: Slight, moderate, and heavy intensity":
      myWeatherTypeHtml = `${snow}`;
      break;
    case "Snow grains":
      myWeatherTypeHtml = `${snow}`;
      break;
    case "Rain showers: Slight, moderate, and violent":
      myWeatherTypeHtml = `${rainShower}`;
      break;
    case "Snow showers slight and heavy":
      myWeatherTypeHtml = `${snow}`;
      break;
    case "Thunderstorm: Slight or moderate":
      myWeatherTypeHtml = `${thunder}`;
      break;
    case "Thunderstorm with slight and heavy hail":
      myWeatherTypeHtml = `${thunder}`;
      break;
    default:
      myWeatherTypeHtml = `${noData}`;
      break;
  }

  targetElement.innerHTML = `<div class="weather" onclick="window._viewCallbacks.weatherClick('${currentWeatherType.weatherType}')">${myWeatherTypeHtml}</div>`;
}

const yeet = document.querySelectorAll(".box1");

yeet.forEach((element) => {
  const weatherText = element.querySelector(".weather-text");

  // Hide the text when the page loads
  weatherText.style.display = "none"; // Hide the text

  element.addEventListener("mousedown", () => {
    // Toggle the "origin" class on click
    element.classList.toggle("origin");

    if (element.classList.contains("origin")) {
      weatherText.style.display = "block"; // Show the text
    } else {
      weatherText.style.display = "none"; // Hide the text
    }
  });
});

export function DisplayWeatherTypeOnly(weatherTypes, displayElement) {
  // console.log(weatherTypes);

  const targetElement = document.getElementById(displayElement);

  targetElement.innerHTML = "";

  let myWeatherTypeHtml = "";

  // defining weather icon variables
  let clear = `<i class="fa-regular fa-sun iconSize"></i>`;
  let clearText = `<p>Klar himmel</p>`;
  let mainlyClear = `<i class="fa-solid fa-cloud-sun iconSize"></i>`;
  let mainlyClearText = `<p>Skyet</p>`;
  let fog = `<i class="fa-solid fa-smog iconSize"></i>`;
  let fogText = `<p>Tåget</p>`;
  let droplets = `<i class="fa-solid fa-droplet iconSize"></i>`;
  let dropletsText = `<p>Småregn</p>`;
  let rain = `<i class="fa-solid fa-cloud-rain iconSize"></i>`;
  let rainText = `<p>Regnvejr</p>`;
  let snow = `<i class="fa-regular fa-snowflake iconSize"></i>`;
  let snowText = `<p>Snevejr</p>`;
  let rainShower = `<i class="fa-solid fa-cloud-showers-heavy iconSize"></i>`;
  let rainShowerText = `<p>Skybrud</p>`;
  let thunder = `<i class="fa-solid fa-bolt-lightning iconSize"></i>`;
  let thunderText = `<p>Tordenvejr</p>`;
  let noData = `<i class="fa-solid fa-circle-xmark iconSize"></i>`;
  let noDataText = `<p>Ingen data</p>`;

  myWeatherTypeHtml = `<div>${clear}${clearText}</div><div>${mainlyClear}${mainlyClearText}</div><div>${fog}${fogText}</div><div>${droplets}${dropletsText}</div><div>${rain}${rainText}</div><div>${snow}${snowText}</div><div>${rainShower}${rainShowerText}</div><div>${thunder}${thunderText}</div><div>${noData}${noDataText}</div>`;

  targetElement.innerHTML = `<div class="weatherExpand" onclick="window._viewCallbacks.returnClick('return')">${myWeatherTypeHtml}</div>`;
}

// Kald funktionen for at aktivere træk-og-slip-funktionaliteten

/* <i id="myIcon"></i>;

let myIcon = document.getElementById("myIcon");
myIcon.classList.add("fas", "fa-arrow-down"); */

export function DisplayForecastDaily(myWeatherData, displayElement) {
  // console.log(myWeatherData.dayData);
  const targetElement = document.getElementById(displayElement);

  const dailyForecast = myWeatherData.weekData;
  // console.log(dailyForecast);
  // console.log(dailyForecast[0].dayOfWeek);

  targetElement.innerHTML = "";

  

  dailyForecast.forEach((object) => {
    // console.log(object);
    let clear = `<i class="fa-regular fa-sun iconSize iconScale"></i>`;
    let mainlyClear = `<i class="fa-solid fa-cloud-sun iconSize iconScale"></i>`;
    let fog = `<i class="fa-solid fa-smog iconSize iconScale"></i>`;
    let droplets = `<i class="fa-solid fa-droplet iconSize iconScale"></i>`;
    let rain = `<i class="fa-solid fa-cloud-rain iconSize iconScale"></i>`;
    let snow = `<i class="fa-regular fa-snowflake iconSize iconScale"></i>`;
    let rainShower = `<i class="fa-solid fa-cloud-showers-heavy iconSize iconScale"></i>`;
    let thunder = `<i class="fa-solid fa-bolt-lightning iconSize iconScale"></i>`;
    let noData = `<i class="fa-solid fa-circle-xmark iconSize iconScale"></i>`;
    let weatherString = object.weatherCode;
    // console.log(weatherString);

    let myForecastHtml = "";
    let myForecastIcon = "";

    switch (weatherString) {
      case "Clear sky":
        myForecastIcon = `${clear}`;
        break;
      case "Mainly clear, partly cloudy, and overcast":
        myForecastIcon = `${mainlyClear}`;
        break;
      case "Fog and depositing rime fog":
        myForecastIcon = `${fog}`;
        break;
      case "Drizzle: Light, moderate, and dense intensity":
        myForecastIcon = `${droplets}`;
        break;
      case "Freezing Drizzle: Light and dense intensity":
        myForecastIcon = `${droplets}`;
        break;
      case "Rain: Slight, moderate and heavy intensity":
        myForecastIcon = `${rain}`;
        break;
      case "Freezing Rain: Light and heavy intensity":
        myForecastIcon = `${rain}`;
        break;
      case "Snow fall: Slight, moderate, and heavy intensity":
        myForecastIcon = `${snow}`;
        break;
      case "Snow grains":
        myForecastIcon = `${snow}`;
        break;
      case "Rain showers: Slight, moderate, and violent":
        myForecastIcon = `${rainShower}`;
        break;
      case "Snow showers slight and heavy":
        myForecastIcon = `${snow}`;
        break;
      case "Thunderstorm: Slight or moderate":
        myForecastIcon = `${thunder}`;
        break;
      case "Thunderstorm with slight and heavy hail":
        myForecastIcon = `${thunder}`;
        break;
      default:
        myForecastIcon = `${noData}`;
        break;
    }

    myForecastHtml = `<div>${object.dayOfWeek}</div><div>${myForecastIcon}</div><div class="tempWeekly">${object.averageTemperature} °C</div>`;

    targetElement.innerHTML += `<div>${myForecastHtml}</div>`;
  })


}