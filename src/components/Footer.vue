<script setup lang="ts">
  import Search from "./Search.vue";
  import { useWeatherStore} from "@/stores/weather"; 

  const store = useWeatherStore();

</script>

<template>
  <div class="footer">
    <Search />
  </div>
</template>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
    background-color: v-bind("store.condition.color4");
    border-top: 1px solid v-bind("store.condition.color2");
  }
  .search-input {
    height: 30px;
  }

  img {
    height: 30px;
  }

</style>