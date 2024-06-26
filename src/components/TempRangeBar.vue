<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";

  const store = useWeatherStore();
  const { day, index } = defineProps(["day"]);

  function getColor(temperature: number) {
    if (temperature < 10) { return "rgba(0, 150, 255, 0.7)" }
    if (temperature < 15) { return "rgba(0, 255, 120, 0.7)" }
    if (temperature < 20) { return "rgba(255, 255, 120, 0.7)" }
    if (temperature < 30) { return "rgba(255, 100, 0, 0.7)" }
    if (temperature >= 30) { return "rgba(255, 50, 0, 0.7)" }
  }
  const temperatureRange = day.weeklyMaxTemp - day.weeklyMinTemp;
  const maxTempPercent = 100 - day.temperatureMax / day.weeklyMaxTemp * 100;
  const minTempPercent = 100 - day.weeklyMinTemp / day.temperatureMin * 100;  

  const temperatureColors = {
    color1: getColor(day.weeklyMinTemp),
    color2: getColor(day.weeklyMinTemp + temperatureRange * 0.25),
    color3: getColor(day.weeklyMinTemp + temperatureRange * 0.50),
    color4: getColor(day.weeklyMinTemp + temperatureRange * 0.75),
    color5: getColor(day.weeklyMaxTemp)
  }

</script>

<template>
<span>
  <div class="range-bar">
    <div class="cutoff left"></div>
    <div class="cutoff right"></div>
  </div>
  
</span>  

</template>

<style scoped>
  .range-bar {
    position: relative;
    background: linear-gradient(90deg,
     v-bind("temperatureColors.color1") 0%,
     v-bind("temperatureColors.color2") 25%,
     v-bind("temperatureColors.color3") 50%,
     v-bind("temperatureColors.color4") 75%,
     v-bind("temperatureColors.color5") 100%);
    width: auto;
    height: 5px;
    border-radius: 4px;
    margin: 0 20px;
  }

  .cutoff {
    position: absolute;
    background-color: v-bind("store.condition.color5");
    height: 5px;
    
 
  }

  .left {
    border-radius: 2px 0 0 2px;
    width: v-bind("minTempPercent + '%'")
  }

  .right {
    border-radius: 0 2px 2px 0;
    right: 0;
    width: v-bind("maxTempPercent + '%'")
  }
</style>