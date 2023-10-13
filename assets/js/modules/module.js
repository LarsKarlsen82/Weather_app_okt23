// Global variables

let rawData;



export function getAddressByCity(myCity) {
  return fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(myCity)}&format=json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function extractCoords(data) {
  // console.log(data[0].lat, data[0].lon);
  const convertedCoords = {
    latitude: data[0].lat,
    longitude: data[0].lon
  }
  return convertedCoords;
}


export function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => reject(error)
    );
  });
}




export function getCurrentLocation(latitude, longitude) {
  const apiEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,winddirection_10m,windgusts_10m,soil_temperature_0cm,soil_moisture_0_1cm,uv_index,is_day,cape,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=Europe%2FBerlin`;

    return fetch(apiEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return response.json();
      }
    })

    .then((data) => {
    //   console.log("Samlet vejrdata", data);
        return data; // smider al dataen ind i variablen rawData
      })

    .catch((error) => {
      console.error(error);
    });
}

// convert data to readable format
export function dataConversion(data) {
  // indsat 'data' som parameter, så vi ved hvad der passeres videre til denne funktion
  rawData = data;
  // console.log("API Response", rawData);

  // kalder funktioner til at håndtere data (udtrække fra api'en)
  const convertedData = {
    tempData: makeTempData(rawData),
    weatherType: makeWeatherTypeData(rawData),
    windData: makeWindSpeedData(rawData),
    sunData: makeSunData(rawData),
    dayData: makeDayData(rawData),
    weekData: makeWeekData(rawData)
  }
  return convertedData;
}

// extract and sort info to array tempData
export function makeTempData(rawData) {
  const temp = rawData.hourly.temperature_2m;
  const humidity = rawData.hourly.relativehumidity_2m;
  //console.log(temp);
  //console.log(humidity);

  const currentHour = new Date().getHours();

  // Use the map method to create an array of objects
  const tempDatas = temp.map((temperature, i) => ({
    temperature,
    humidity: humidity[i],
  }));
    // console.log(tempDatas);
    

  if (tempDatas && currentHour >= 0 && currentHour < tempDatas.length) {
    const tempDatasNow = tempDatas[currentHour];
    // console.log(tempDatasNow);
    return tempDatasNow;
        
  } else {
    console.error("No data available for the current hour.");
  }
}

export function makeWeatherTypeData(rawData) {
  const weatherCode = rawData.hourly.weathercode;
  //console.log(weatherCode);

  // const currentHour = new Date().getHours();
  
  const weatherDescription = [];
  // console.log(weatherDescription);

  
  for (const code of weatherCode) {
    switch (true) {
      case code === 0:
        //console.log("Clear sky");
        weatherDescription.push("Clear sky");
        break;
      case code > 0 && code < 4:
        //console.log("Mainly clear, partly cloudy, and overcast");
        weatherDescription.push("Mainly clear, partly cloudy, and overcast");
        break;
      case code >= 45 && code < 49:
        //console.log("Fog and depositing rime fog");
        weatherDescription.push("Fog and depositing rime fog");
        break;
      case code >= 51 && code < 56:
        //console.log("Drizzle: Light, moderate, and dense intensity");
        weatherDescription.push(
          "Drizzle: Light, moderate, and dense intensity"
        );
        break;
      case code >= 56 && code < 58:
        //console.log("Freezing Drizzle: Light and dense intensity");
        weatherDescription.push("Freezing Drizzle: Light and dense intensity");
        break;
      case code >= 61 && code < 66:
        //console.log("Rain: Slight, moderate and heavy intensity");
        weatherDescription.push("Rain: Slight, moderate and heavy intensity");
        break;
      case code >= 66 && code < 68:
        //console.log("Freezing Rain: Light and heavy intensity");
        weatherDescription.push("Freezing Rain: Light and heavy intensity");
        break;
      case code >= 71 && code < 76:
        //console.log("Snow fall: Slight, moderate, and heavy intensity");
        weatherDescription.push(
          "Snow fall: Slight, moderate, and heavy intensity"
        );
        break;
      case code === 77:
        //console.log("Snow grains");
        weatherDescription.push("Snow grains");
        break;
      case code >= 80 && code < 83:
        //console.log("Rain showers: Slight, moderate, and violent");
        weatherDescription.push("Rain showers: Slight, moderate, and violent");
        break;
      case code >= 85 && code < 87:
        //console.log("Snow showers slight and heavy");
        weatherDescription.push("Snow showers slight and heavy");
        break;
      case code === 95:
        //console.log("Thunderstorm: Slight or moderate");
        weatherDescription.push("Thunderstorm: Slight or moderate");
        break;
      case code >= 96 && code < 100:
        //console.log("Thunderstorm with slight and heavy hail");
        weatherDescription.push("Thunderstorm with slight and heavy hail");
        break;
      default:
        console.log("Unknown weather code");
        break;
    }
  }
  // console.log(weatherDescription);
  return weatherDescription;
  
}

export function updateWindDirection(windDir) {
  let direction;

  switch (true) {
    case windDir >= 355 || windDir <= 15:
      direction = "North";
      break;
    case windDir >= 16 && windDir <= 80:
      direction = "North-East";
      break;
    case windDir >= 81 && windDir <= 105:
      direction = "East";
      break;
    case windDir >= 106 && windDir <= 175:
      direction = "South-East";
      break;
    case windDir >= 176 && windDir <= 190:
      direction = "South";
      break;
    case windDir >= 191 && windDir <= 240:
      direction = "South-west";
      break;
    case windDir >= 241 && windDir <= 280:
      direction = "West";
      break;
    case windDir >= 281 && windDir <= 354:
      direction = "North-West";
      break;
    default:
      direction = "Default North";
      break;
  }
//   console.log("simulatedWindDirection:", windDir); //The value can change between 0 - 360, shows wind direction
//   console.log("Wind Direction:", direction);
}

export function makeWindSpeedData(rawData) {
  const windSpeed = rawData.hourly.windspeed_10m;
  const windDirection = rawData.hourly.winddirection_10m;
  //console.log(windSpeed);
//   console.log(windDirection);

  const currentHour = new Date().getHours();

  const windDirectionArray = [];

  for (const windDir of windDirection) {
    switch (true) {
      case windDir >= 355 && windDir <= 15:
        windDirectionArray.push("North");
        break;
      case windDir >= 16 && windDir <= 80:
        windDirectionArray.push("North-East");
        break;
      case windDir >= 81 && windDir <= 105:
        windDirectionArray.push("East");
        break;
      case windDir >= 106 && windDir <= 175:
        windDirectionArray.push("South-East");
        break;
      case windDir >= 176 && windDir <= 190:
        windDirectionArray.push("South");
        break;
      case windDir >= 191 && windDir <= 240:
        windDirectionArray.push("South-west");
        break;
      case windDir >= 241 && windDir <= 280:
        windDirectionArray.push("West");
        break;
      case windDir >= 281 && windDir <= 354:
        windDirectionArray.push("North-West");
        break;
      default:
        windDirectionArray.push("Default North");
        break;
    }
    //console.log('simulatedWindDirection:', windDir); //The value can change between 0 - 360, shows wind direktion
  }

  const windSpeedDatas = windSpeed.map((windSpeed, i) => ({
    windSpeed,
    windDirection: windDirectionArray[i],
  }));
  //console.log(windSpeedDatas);

  if (
    windSpeedDatas &&
    currentHour >= 0 &&
    currentHour < windSpeedDatas.length
  ) {
    const windSpeedDatasNow = windSpeedDatas[currentHour];
    return windSpeedDatasNow;
    updateWindDirection(windSpeedDatasNow.windDirection); // Call the updateWindDirection function with windDirection
  } else {
    console.error("No data available for the current hour.");
  }
}

export function makeSunData(rawData) {
  const sunRise = rawData.daily.sunrise;
  const sunSet = rawData.daily.sunset;

  const sunDatas = sunRise.map((sunRiseTime, i) => {
    const sunriseTime = new Date(sunRiseTime);
    const sunsetTime = new Date(sunSet[i]);

    const sunriseHour = sunriseTime.getHours();
    const sunriseMinutes = sunriseTime.getMinutes();

    const sunsetHour = sunsetTime.getHours();
    const sunsetMinutes = sunsetTime.getMinutes();

    return {
      sunrise: `${sunriseHour}:${sunriseMinutes}`,
      sunset: `${sunsetHour}:${sunsetMinutes}`,
    };
  });

//   console.log(sunDatas);
return sunDatas
}

export function makeDayData(rawData) {
  const temperature = rawData.hourly.temperature_2m;
  const weathercode = rawData.hourly.weathercode;
  const cloudcover = rawData.hourly.cloudcover;
  const visibility = rawData.hourly.visibility;
  const rain = rawData.hourly.rain;
  //console.log(temperature);
  //console.log(weathercode);
  //console.log(cloudcover);
  //console.log(visibility);
  //console.log(rain);

  const weatherDescription = [];
  //console.log(weatherDescription);
  for (const code of weathercode) {
    switch (true) {
      case code === 0:
        //console.log("Clear sky");
        weatherDescription.push("Clear sky");
        break;
      case code > 0 && code < 4:
        //console.log("Mainly clear, partly cloudy, and overcast");
        weatherDescription.push("Mainly clear, partly cloudy, and overcast");
        break;
      case code >= 45 && code < 49:
        //console.log("Fog and depositing rime fog");
        weatherDescription.push("Fog and depositing rime fog");
        break;
      case code >= 51 && code < 56:
        //console.log("Drizzle: Light, moderate, and dense intensity");
        weatherDescription.push(
          "Drizzle: Light, moderate, and dense intensity"
        );
        break;
      case code >= 56 && code < 58:
        //console.log("Freezing Drizzle: Light and dense intensity");
        weatherDescription.push("Freezing Drizzle: Light and dense intensity");
        break;
      case code >= 61 && code < 66:
        //console.log("Rain: Slight, moderate and heavy intensity");
        weatherDescription.push("Rain: Slight, moderate and heavy intensity");
        break;
      case code >= 66 && code < 68:
        //console.log("Freezing Rain: Light and heavy intensity");
        weatherDescription.push("Freezing Rain: Light and heavy intensity");
        break;
      case code >= 71 && code < 76:
        //console.log("Snow fall: Slight, moderate, and heavy intensity");
        weatherDescription.push(
          "Snow fall: Slight, moderate, and heavy intensity"
        );
        break;
      case code === 77:
        //console.log("Snow grains");
        weatherDescription.push("Snow grains");
        break;
      case code >= 80 && code < 83:
        //console.log("Rain showers: Slight, moderate, and violent");
        weatherDescription.push("Rain showers: Slight, moderate, and violent");
        break;
      case code >= 85 && code < 87:
        //console.log("Snow showers slight and heavy");
        weatherDescription.push("Snow showers slight and heavy");
        break;
      case code === 95:
        //console.log("Thunderstorm: Slight or moderate");
        weatherDescription.push("Thunderstorm: Slight or moderate");
        break;
      case code >= 96 && code < 100:
        //console.log("Thunderstorm with slight and heavy hail");
        weatherDescription.push("Thunderstorm with slight and heavy hail");
        break;
      default:
        console.log("Unknown weather code");
        break;
    }
  }

  const dayDatas = temperature.map((temperature, i) => ({
    temperature,
    weathercode: weatherDescription[i],
    cloudcover: cloudcover[i],
    visibility: visibility[i],
    rain: rain[i],
  }));
  //console.log(dayDatas);
  return dayDatas;
}

export function makeWeekData(rawData) {
  const temperature = rawData.hourly.temperature_2m;
  const weatherCode = rawData.daily.weathercode;
  //console.log(temperature);
  //console.log(weatherCode);

  const weatherDescription = [];
  //console.log(weatherDescription);

  for (const code of weatherCode) {
    switch (true) {
      case code === 0:
        //console.log("Clear sky");
        weatherDescription.push("Clear sky");
        break;
      case code > 0 && code < 4:
        //console.log("Mainly clear, partly cloudy, and overcast");
        weatherDescription.push("Mainly clear, partly cloudy, and overcast");
        break;
      case code >= 45 && code < 49:
        //console.log("Fog and depositing rime fog");
        weatherDescription.push("Fog and depositing rime fog");
        break;
      case code >= 51 && code < 56:
        //console.log("Drizzle: Light, moderate, and dense intensity");
        weatherDescription.push(
          "Drizzle: Light, moderate, and dense intensity"
        );
        break;
      case code >= 56 && code < 58:
        //console.log("Freezing Drizzle: Light and dense intensity");
        weatherDescription.push("Freezing Drizzle: Light and dense intensity");
        break;
      case code >= 61 && code < 66:
        //console.log("Rain: Slight, moderate and heavy intensity");
        weatherDescription.push("Rain: Slight, moderate and heavy intensity");
        break;
      case code >= 66 && code < 68:
        //console.log("Freezing Rain: Light and heavy intensity");
        weatherDescription.push("Freezing Rain: Light and heavy intensity");
        break;
      case code >= 71 && code < 76:
        //console.log("Snow fall: Slight, moderate, and heavy intensity");
        weatherDescription.push(
          "Snow fall: Slight, moderate, and heavy intensity"
        );
        break;
      case code === 77:
        //console.log("Snow grains");
        weatherDescription.push("Snow grains");
        break;
      case code >= 80 && code < 83:
        //console.log("Rain showers: Slight, moderate, and violent");
        weatherDescription.push("Rain showers: Slight, moderate, and violent");
        break;
      case code >= 85 && code < 87:
        //console.log("Snow showers slight and heavy");
        weatherDescription.push("Snow showers slight and heavy");
        break;
      case code === 95:
        //console.log("Thunderstorm: Slight or moderate");
        weatherDescription.push("Thunderstorm: Slight or moderate");
        break;
      case code >= 96 && code < 100:
        //console.log("Thunderstorm with slight and heavy hail");
        weatherDescription.push("Thunderstorm with slight and heavy hail");
        break;
      default:
        console.log("Unknown weather code");
        break;
    }
  }

  const dataPerDay = [];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hoursPerDay = 24; // Assuming there are 24 hours in a day

  // Find the current day of the week
  const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Reorganize daysOfWeek array to start with the current day
  const reorderedDaysOfWeek = [
    ...daysOfWeek.slice(today),
    ...daysOfWeek.slice(0, today),
  ];

  // Loop through the temperature data and calculate the average per day
  for (let day = 0; day < 7; day++) {
    const startIndex = day * hoursPerDay;
    const endIndex = startIndex + hoursPerDay;

    const dailyData = temperature.slice(startIndex, endIndex);
    const dailyAverage =
      dailyData.reduce((sum, temp) => sum + temp, 0) / hoursPerDay;

    dataPerDay.push({
      dayOfWeek: reorderedDaysOfWeek[day], // Convert day number to day of the week
      averageTemperature: dailyAverage.toFixed(2), // Round to 2 decimal places
      weatherCode: weatherDescription[day],
    });
  }
  //console.log(dataPerDay);
  return dataPerDay;
}