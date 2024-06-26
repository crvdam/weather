<script setup lang="ts">
  import { useWeatherStore } from "../stores/weather";
  import { ref, watch } from "vue";
  
  const store = useWeatherStore();

  const showSearchInput = ref(false);

  const query = ref("");
  
  watch(query, () => {
    if (query.value.length > 2){
      store.fetchAutoComplete(query.value);
    } else {
      store.autocomplete = "";
    }
  })

</script>

<template>
  <div class="search-container">
    <input 
      v-show="showSearchInput"
      v-model="query"
      class="search-input" 
      type="text">
    <img 
      v-if="query && showSearchInput"
      @click="query = ''"
      class="clear-search"
      src="../assets/icons/ic_clear.png">
    <div 
      v-if="query.length > 2 && showSearchInput"
      class="search-suggestion-container">
      <div 
        v-for="suggestion in store.autocomplete"
        :key="suggestion.properties.place_id"
        @click="
          store.coordinates.lat = suggestion.properties.lat;
          store.coordinates.lon = suggestion.properties.lon;
          store.fetchForecast()
          query = ''
          showSearchInput = false" 
        class="search-suggestion">
          {{ suggestion.properties.city }}
      </div>
    </div> 
  </div>

  <img 
      @click="
        showSearchInput = !showSearchInput; 
        query = ''"
      :class="showSearchInput ? 'search-img active' : 'search-img'"
      src="../assets/icons/ic_search.png">
</template>

<style scoped>
  .search-container {
    justify-self: center;
    position: relative;
    transition-duration: 5s;;
  }
  
  input {
    font-family: inherit;
    font-size: 18px;
    justify-self: center;
    width: 200px;
    border: none;
    height: 30px;
    padding: 10px;
    animation: show-input 0.3s ease-in-out 1;
  }

  .clear-search {
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }

  .search-img {
    height: 35px;
    position: absolute;
    justify-self: center;
    cursor: pointer;
  }

  .active {
    position: relative;
    margin-left: 10px;
  }
  
  .search-img:hover {
    transform: scale(1.1);
    transition-duration: 0.1s;    
  }

  .search-img:active {
    transform: scale(0.9);
    transition-duration: 0ms;
  }

  .search-suggestion-container {
    position: absolute;
    bottom: 30px;
  }
  
  .search-suggestion {
    border: 1px solid #b5c9ee85;
    height: 30px;
    width: 200px;
    background: white;
    color: black;
    padding: 5px;
    cursor: pointer;
    z-index: 1;
    overflow: hidden;
  }

  .search-suggestion:hover {
    background: v-bind("store.condition.color1")
  }
  
  @keyframes show-input {
    0% {
      transform: scale(0);
      transform-origin: right;
    } 100% {
      transform: scale(1);
      transform-origin: right;
    }
  }

</style>