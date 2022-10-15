<template>
    <button @click="fetchAll()" class="px-4 py-2 bg-blue-500 rounded-lg">Fetch All!</button>
</template>

<script>
import axios from 'axios';
const api = import.meta.env.VITE_RAWG_API_KEY;

export default {
  methods: {
    async fetchAll() {
      // try {
      //   // maximum page_size is 40
      //   const url = `https://api.rawg.io/api/games?key=${api}&page_size=40`;
      //   const response = await axios.get(url);
      //   const results = response.data.results;
      //   for (var game of results) {
      //     var platformList = "";
      //     for (var holder of game.platforms) {
      //       platformList += holder.platform.name + " ";
      //     }
      //     console.log("Game: " + game.slug + "\nReleased: " + game.released + "\nPlatforms: " + platformList);
      //   }
      // } catch (err) {
      //   if (err.response) {
      //     console.log("Server Error: ", err);
      //   } else if (err.request) {
      //     console.log("Network Error: ", err);
      //   } else {
      //     console.log("Client Error: ", err);
      //   }
      // }
    },
  }
}
</script>
