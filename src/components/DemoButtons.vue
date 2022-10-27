<template>
    <button @click="upsertAll()" class="px-4 py-2 bg-red-500 rounded-lg">Upsert All</button>
    <button @click="callUpdateRating()" class="px-4 py-2 bg-green-500 rounded-lg">Update Rating</button>
    <form @submit.prevent="callFetchGameInfo" style="display: inline;"> 
        <input v-model="gameName" placeholder="Enter game name">  
    </form>
</template>

<script>

import { upsertFromGames, upsertGenres, upsertPlatforms } from '../upsertTables'
import { updateRating_rpc, fetchGameInfo_rpc } from '../rpc'
import store from '../store/index';

export default {
    
    data() {
        return {
            gameName: ''
        }
    },
    methods: {
        async upsertAll() {

            await upsertFromGames();
            await upsertGenres();
            await upsertPlatforms();
        },
        async callUpdateRating() {
            
            await updateRating_rpc(store.state.user.id, 'RPG', 'Fallout 4', 7);
        },
        async callFetchGameInfo() {
            
            var response = await fetchGameInfo_rpc(this.gameName);
            console.log(response);
        }
    }
}

</script>
