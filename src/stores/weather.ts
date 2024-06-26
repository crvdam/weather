import { ref } from "vue";
import { defineStore } from "pinia";
import { determineCondition, determineDailyAggregate } from "@/helpers/helpers";

export const useWeatherStore = defineStore('weather', () => {
  let longitude = "4.9041";
  let latitude = "52.3676";

  // Openweathermap.org
  const API_KEY_OPENWEATHER = "";
  // Geoapify.com
  const API_KEY_GEOAPIFY = ""
  
  // Five day forecast in 3 hour timestamps
  const forecast = ref();

  // Five day forecast aggregate per day, 
  const forecastAggregate = ref(new Array);

  // Weather condition name and color scheme
  const condition = ref({
    name: "",
    color1: "",
    color2: "",
    color3: "",
    color4: "",
    color5: ""
  });

  const autocomplete = ref()

  // Default is Amsterdam
  const coordinates = ref({
    lon: "4.9041",
    lat: "52.3676"
  });

  async function fetchForecast() {
    forecastAggregate.value = [];

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.value.lat}&lon=${coordinates.value.lon}&appid=${API_KEY_OPENWEATHER}&units=metric&`);
    const data = await response.json();
    forecast.value = data;

    // Forecast API returns data in 3 hour intervals, this calculates the daily forecast
    determineDailyAggregate();

    // Used to set background animation and color scheme
    determineCondition(data.list[0].weather[0].id)
  };

  async function fetchAutoComplete(q: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${q}&apiKey=${API_KEY_GEOAPIFY}`);
    const data = await response.json();
    const onlyCities = data.features.filter((feature: any) => feature.properties.city);
    autocomplete.value = onlyCities.reverse();  
  };

  fetchForecast();

  return { 
    forecast, 
    condition, 
    autocomplete, 
    coordinates, 
    forecastAggregate,
    fetchForecast, 
    fetchAutoComplete
  };
})
