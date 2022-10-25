<template>
    <button @click="upsertAll()" class="px-4 py-2 bg-green-500 rounded-lg">Upsert All</button>
    <button @click="testRPC()" class="px-4 py-2 bg-green-500 rounded-lg">Test rpc</button>
</template>

<script>

import { upsertFromGames, upsertGenres, upsertPlatforms } from '../upsertTables'
import { updateRating_rpc } from '../rpc'
import store from '../store/index';

export default {
    
    methods: {
        async upsertAll() {

            await upsertFromGames();
            await upsertGenres();
            await upsertPlatforms();
        },
        async testRPC() {
            
            await updateRating_rpc(store.state.user.id, 'RPG', 'Fallout 4', 7);
        }
    }
}

</script>
