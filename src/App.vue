<script setup lang="ts">
  import CurrentWeather from "./components/CurrentWeather.vue";
  import Background from "./components/Background.vue";
  import HourlyWeather from "./components/HourlyWeather.vue";
  import Forecast from "./components/Forecast.vue";
  import Footer from "./components/Footer.vue";
  import { useWeatherStore } from "./stores/weather";

  const store = useWeatherStore();

</script>

<template>
  <div v-if="!store.forecast">
    LOADING
  </div>
  <div 
    v-else
    class="app-container">
      <Background />
      <CurrentWeather />
      <HourlyWeather />
      <Forecast />
      <Footer />
  </div>
</template>

<style scoped>
  .app-container {
    align-self: center;
    justify-self: center;
    margin: 0 auto;
    height: 90vh;
    width: 100vw;
  }

@media screen and (min-width: 600px) {
  .app-container {
    width: 600px;
  }
}

</style>
