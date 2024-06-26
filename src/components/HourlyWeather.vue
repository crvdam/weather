<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";
  import { determineWeatherIcon } from "../helpers/helpers";

  const store = useWeatherStore();

</script>

<template>
  <div class="hourly-weather-container">
    <div 
      v-for="weatherItem in store.forecast.list"
      :key="weatherItem.dt"
      class="weather-item-wrapper">
        <p class="item-time">
          {{ weatherItem.dt_txt.slice(11, 13) }}
        </p>
        <p class="item-icon">
          <img :src="determineWeatherIcon(weatherItem.weather[0].id)">
        </p>
        <p class="item-temperature">
          {{ weatherItem.main.temp.toFixed(0) }}°
        </p>
      </div>
  </div>
</template>

<style scoped>
  .hourly-weather-container {
    display: flex;
    gap: 30px;
    width: 95%;
    margin: auto;
    margin-top: 40px;
    padding: 15px;
    overflow-x: scroll;
    background-color: v-bind("store.condition.color4");
    border-radius: 15px;
  }

  .weather-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 25px;
    height: 25px;
  }

  .item-time {
    font-size: 13px;
  }

</style>