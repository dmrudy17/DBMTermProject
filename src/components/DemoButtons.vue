<template>
    <button @click="upsertAll()" class="px-4 py-2 bg-red-500 rounded-lg">Upsert All</button>
    <button @click="callUpdateRating()" class="px-4 py-2 bg-green-500 rounded-lg">Update Rating</button>
    <button @click="callFetchGameInfo()" class="px-4 py-2 bg-blue-500 rounded-lg">Get Game Info</button>
</template>

<script>

import { upsertFromGames, upsertGenres, upsertPlatforms } from '../upsertTables'
import { updateRating_rpc, fetchGameInfo_rpc } from '../rpc'
import store from '../store/index';

export default {
    
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
            
            await fetchGameInfo_rpc('Fallout 4');
        }
    }
}

</script>
