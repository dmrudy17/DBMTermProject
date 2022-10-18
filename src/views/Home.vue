<template>
  <div class="mt-8 flex flex-col w-56 m-auto space-y-4">
    <h1>View output in browser console</h1>
    <h1>Right-click -> inspect -> console</h1>
    <button @click="fetchGames()" class="px-4 py-2 bg-blue-500 rounded-lg">Fetch Games!</button>
    <button @click="fetchTags()" class="px-4 py-2 bg-red-500 rounded-lg">Fetch Tags!</button>
    <SyncAll></SyncAll>
  </div>
</template>

<script>
import axios from 'axios';
//import Profile from './components/Profile.vue'
import SyncAll from '../components/SyncAll.vue'
const api = import.meta.env.VITE_RAWG_API_KEY;

export default {

  components: {
    SyncAll
  },

  methods: {
    async fetchGames() {
      try {
        // maximum page_size is 40
        const url = `https://api.rawg.io/api/games?key=${api}&page_size=40`;
        const response = await axios.get(url);
        const results = response.data.results;
        for (var game of results) {
          var platformList = "";
          for (var holder of game.platforms) {
            platformList += holder.platform.name + " ";
          }
          console.log("Game: " + game.slug + "\nReleased: " + game.released + "\nPlatforms: " + platformList);
        }
      } catch (err) {
        if (err.response) {
          console.log("Server Error: ", err);
        } else if (err.request) {
          console.log("Network Error: ", err);
        } else {
          console.log("Client Error: ", err);
        }
      }
    },
    async fetchTags() {
      try {
        // maximum page_size is 40
        const url = `https://api.rawg.io/api/tags?key=${api}&page_size=40`;
        const response = await axios.get(url);
        const results = response.data.results;
        console.log(results);
      } catch (err) {
        if (err.response) {
          console.log("Server Error: ", err);
        } else if (err.request) {
          console.log("Network Error: ", err);
        } else {
          console.log("Client Error: ", err);
        }
      }
    }
  }
}
</script>
