<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";
  import { determineWeatherIcon } from "@/helpers/helpers";
  import TempRangeBar from "../components/TempRangeBar.vue";

  const store = useWeatherStore();

</script>

<template>
  <div class="forecast-container">
    <div class="forecast-header">
      <img 
        class="forecast-header-img"
        src="../assets/icons/ic_calendar.png">
      <p>NEXT 5 DAYS</p>
    </div>

    <div 
      v-for="day in store.forecastAggregate"
      class="forecast-item-grid">
      <p class="grid-item-1">{{ day.dayName }}</p>
      <span class="grid-item-2"><img 
        class="forecast-img"
        :src="determineWeatherIcon(day.weatherCondition)">
      </span>
      <p class="grid-item-3">{{ day.temperatureMin.toFixed(0) }}°</p>
      <TempRangeBar 
        :day="day"
        class="grid-item-4"/>
      <p class="grid-item-5">{{ day.temperatureMax.toFixed(0) }}°</p>
    </div>
  </div>
</template>

<style scoped>
  .forecast-container {
    width: 95%;
    margin: auto;
    background-color: v-bind("store.condition.color4");
    border-radius: 15px;
    margin-top: 20px;
    padding: 10px;
  }

  .forecast-header {
    display: flex;
    align-items: center;
    color: #e6e6e6;
    opacity: 0.5;
    font-size: 14px;
    gap: 10px;
    padding-bottom: 5px;
  }

  .forecast-header-img {
    width: 25px;
  }

  .forecast-item-grid {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(12, 1fr);
    font-size: 22px;
    border-top: 1px solid v-bind("store.condition.color1");
    margin-top: 10px;
    padding-top: 10px;
  }

  .grid-item-1 {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .grid-item-2 {
    padding-top: 5px;
    grid-column-start: 4;
    grid-column-end: 6;
  }

  .grid-item-3 {
    color: rgb(180, 180, 180);
    grid-column-start: 6;
    grid-column-end: 7;
  }

  .grid-item-4 {
    grid-column-start: 7;
    grid-column-end: 12;
  }

  .grid-item-5 {
    grid-column-start: 12;
    grid-column-end: 13;
  }

  .forecast-img {
    width: 30px;
  }


</style>