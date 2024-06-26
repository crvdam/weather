import { useWeatherStore } from "@/stores/weather";

export function determineWeatherIcon(id: number) {
  // Heavy clouds
  if (id >= 803) { return "/src/assets/icons/ic_clouds.png" };
  // Partly clouded
  if (id >= 801) { return "/src/assets/icons/ic_part_cloud.png" };
  // Clear
  if (id === 800) { return "/src/assets/icons/ic_sun.png" };
  // Snow
  if (id >= 600) { return "/src/assets/icons/ic_snow.png" };
  // Rain
  if (id >= 300) { return "/src/assets/icons/ic_rain.png" };
  // Thunder
  if (id >= 200) { return "/src/assets/icons/ic_thunder.png" };
};

export function determineCondition(id: number) {
  const store = useWeatherStore();

  // Heavy clouds
  if (id >= 803) { 
    store.condition.name = "cloudHeavy"
    store.condition.color1 = "rgb(69, 74, 78)"
    store.condition.color2 = "rgb(29, 40, 48)"
    store.condition.color3 = "rgb(62, 84, 99)"
    store.condition.color4 = "rgba(59, 78, 90, 0.7)"
    store.condition.color5 = "rgba(59, 78, 90, 1)"
    return;
  };

  // Partly clouded
  if (id >= 801) { 
    store.condition.name = "cloud"
    store.condition.color1 = "rgb(103, 172, 214)"
    store.condition.color2 = "rgb(114, 171, 209)"
    store.condition.color3 = "rgb(173, 210, 233)"
    store.condition.color4 = "rgba(53, 142, 194, 0.7)"
    store.condition.color5 = "rgba(53, 142, 194, 1)"
    return;
   };

  // Clear
  if (id === 800) { 
    store.condition.name = "clear"
    store.condition.color1 = "rgb(103, 172, 214)"
    store.condition.color2 = "rgb(114, 171, 209)"
    store.condition.color3 = "rgb(173, 210, 233)"
    store.condition.color4 = "rgba(53, 142, 194, 0.7)"
    store.condition.color5 = "rgba(53, 142, 194, 1)"
    return;
   };

  // Snow
  if (id >= 600) { 
    store.condition.name = "snow"
    store.condition.color1 = "rgb(159, 178, 190)"
    store.condition.color2 = "rgb(127, 161, 182)"
    store.condition.color3 = "rgb(173, 210, 233)"
    store.condition.color4 = "rgba(89, 108, 120, 0.7)"
    store.condition.color5 = "rgba(89, 108, 120, 1)"
    return;
   };

  // Rain
  if (id >= 300) { 
    store.condition.name = "rain"
    store.condition.color1 = "rgb(69, 74, 78)"
    store.condition.color2 = "rgb(29, 40, 48)"
    store.condition.color3 = "rgb(62, 84, 99)"
    store.condition.color4 = "rgba(59, 78, 90, 0.7)"
    store.condition.color5 = "rgba(59, 78, 90, 1)"
    return;
   };

  // Thunder
  if (id >= 200) { 
    store.condition.name = "thunder"
    store.condition.color1 = "rgb(49, 52, 54)"
    store.condition.color2 = "rgb(29, 40, 48)"
    store.condition.color3 = "rgb(64, 77, 85)"
    store.condition.color4 = "rgba(59, 78, 90, 0.7)"
    store.condition.color5 = "rgba(59, 78, 90, 1)"
   };
}

export function determineDailyAggregate() {
  const store = useWeatherStore()

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let comparisonDay = new Date().getDay();
  let temperatureMax: number = -100;
  let temperatureMin: number = 100;
  let weatherConditionArray: number[] = new Array();
  let weeklyMaxTemp: number = -100;
  let weeklyMinTemp: number = 100; 

  store.forecast.list.forEach((item: any) => {
    const today = new Date(item.dt * 1000).getDay();

    if (today !== comparisonDay) {  
      store.forecastAggregate.push({
        dayName: dayNames[comparisonDay],
        temperatureMax: temperatureMax,
        temperatureMin: temperatureMin,
        weatherCondition: weatherConditionArray[Math.floor(weatherConditionArray.length / 2)]
      })

      temperatureMax = -100;
      temperatureMin = 100;
      comparisonDay = today;
    }

    if (item.main.temp_max > temperatureMax) {
      temperatureMax = item.main.temp_max;
    }

    if (item.main.temp_min < temperatureMin) {
      temperatureMin = item.main.temp_min
    }

    if (item.main.temp_max > weeklyMaxTemp) {
      weeklyMaxTemp = item.main.temp_max
    }

    if (item.main.temp_min < weeklyMinTemp) {
      weeklyMinTemp = item.main.temp_min
    }

    weatherConditionArray.push(item.weather[0].id)
  });  

    store.forecastAggregate.forEach((day: any) => {
      day.weeklyMaxTemp = weeklyMaxTemp,
      day.weeklyMinTemp = weeklyMinTemp
    })

};
