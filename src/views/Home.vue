<template>
  <div class="mt-8 flex flex-col w-56 m-auto space-y-4">
    <h1>View output in browser console</h1>
    <h1>Right-click -> inspect -> console</h1>
    <button @click="fetchGames()" class="px-4 py-2 bg-blue-500 rounded-lg">Fetch Games!</button>
    <button @click="fetchTags()" class="px-4 py-2 bg-red-500 rounded-lg">Fetch Tags!</button>
    <SyncAll></SyncAll>
    <Dropdown></Dropdown>
  </div>
</template>

<script>
import axios from 'axios';
//import Profile from './components/Profile.vue'
import SyncAll from '../components/SyncAll.vue'
import Dropdown from '../components/Dropdown.vue';
const api = import.meta.env.VITE_RAWG_API_KEY;

export default {

  components: {
    SyncAll,
    Dropdown
  }
}
</script>
