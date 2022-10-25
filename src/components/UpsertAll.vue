<template>
    <button @click="upsertAll()" class="px-4 py-2 bg-green-500 rounded-lg">Upsert All</button>
    <button @click="testRPC()" class="px-4 py-2 bg-grey-500 rounded-lg">Test rpc</button>
</template>

<script>

import { upsertFromGames, upsertGenres, upsertPlatforms } from '../upsertTables'
import { addRating_rpc } from '../rpc'

export default {
    
    methods: {
        async upsertAll() {

            await upsertFromGames();
            await upsertGenres();
            await upsertPlatforms();
        },
        async testRPC() {

            await addRating_rpc('RPG', 'Fallout 4', 7);
        }
    }
}

</script>
