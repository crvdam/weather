<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";
  
  const store = useWeatherStore();

</script>

<template>
  <div class="current-weather-container">
    <h3>{{ store.forecast.city.name }}</h3>
    <h1>{{ store.forecast.list[0].main.temp.toFixed(0) }}°</h1>
    <p>{{  store.forecast.list[0].weather[0].description }}</p>
    <div class="min-max-wrapper">
      <p>Max:{{ store.forecast.list[0].main.temp_max.toFixed(0) }}</p>
      <p>Min:{{ store.forecast.list[0].main.temp_min.toFixed(0) }}</p>
    </div>
  </div>
</template>

<style scoped>
  .current-weather-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
  }

  .min-max-wrapper {
    display: flex;
    gap: 15px;
  }

  h1, h3, p {
    text-shadow: 2px 2px 5px v-bind("store.condition.color4");
    font-weight: 300;
  }

  h1 {
    font-size: 80px;
  }

  h3 {
    font-size: 40px;
  }
  
  p {
    font-size: 22px;
  }
</style>