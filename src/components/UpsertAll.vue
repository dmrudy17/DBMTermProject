<template>
    <button @click="upsertAll()" class="px-4 py-2 bg-green-500 rounded-lg">Upsert All!</button>
</template>

<script>

import { upsertFromGames, upsertGenres, upsertPlatforms } from '../upsertTables'

export default {
    
    methods: {
        async upsertAll() {

            await upsertFromGames();
            await upsertGenres();
            await upsertPlatforms();
        },
    }
}

</script>
