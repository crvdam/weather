<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";
  import { storeToRefs } from "pinia";

  const store = useWeatherStore(); 
  const { condition } = storeToRefs(store);

</script>

<template>
  <div class="background"></div>
  <div 
    v-show="condition.name === 'rain' || condition.name === 'thunder'" 
    class="rain"></div>
  <div
    v-show="condition.name === 'thunder'" 
    class="thunder"></div>
  <div
    v-show="condition.name === 'clear'" 
    class="sun"></div>
  <div
    v-show="condition.name === 'cloud'" 
    class="cloud"></div>
  <div
    v-show="condition.name === 'cloudHeavy'" 
    class="cloud-heavy"></div>
</template>

<style scoped>
  .background {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    background: linear-gradient(
      180deg, 
      v-bind("condition.color1") 15%, 
      v-bind("condition.color2") 70%, 
      v-bind("condition.color1") 100%)
  }

  .rain {
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(../assets/icons/bg_rain.png);
    animation: animate-rain 0.5s linear infinite;
    -webkit-animation: animate-rain 0.5s linear infinite;
  }

  .thunder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    animation: animate-thunder 5s linear infinite;
    -webkit-animation: animate-thunder 5s linear infinite;
  }

  .sun {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(../assets/icons/bg_sunbeam.png);
    opacity: 0.7;
    animation: animate-sun 15s linear infinite;
    -webkit-animation: animate-sun 15s linear infinite;
  }

  .cloud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(../assets/icons/bg_cloud.png);
    background-repeat: no-repeat;
    animation: animate-cloud 60s linear infinite;
    -webkit-animation: animate-cloud 60s linear infinite;
  }

  .cloud-heavy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url(../assets/icons/bg_cloud_heavy.png);
    background-repeat: no-repeat;
    animation: animate-cloud-heavy 60s ease-in infinite;
    -webkit-animation: animate-cloud-heavy 60s ease-in infinite;
  }

@keyframes animate-rain {
  0% {
    background-position: 0 0;
    opacity: 0.5;
  }
  100% {
    background-position: 20% 100%;
    opacity: 1;
  } 
}

@keyframes animate-thunder {
  0% {
    opacity: 0;
  }
  85% {
    opacity: 0;
  }
  87% {
    opacity: 1;
  }
  88% {
    opacity: 0;
  }
  98% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes animate-sun {
  0% {
    background-position: 0% 30%;
  }
  50% {
    background-position: 10% 40%;
  }
  100% {
    background-position: 0% 30%;
  }
}

@keyframes animate-cloud {
  0% {
    background-position: 180% 0;
  }
  100% {
    background-position: -150% 0;
  }
}

@keyframes animate-cloud-heavy {
  0% {
    background-position: 100% 0;
  }
  50% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

@media screen and (min-width: 600px) {
  div {
    width: 600px;
  }
}

</style>