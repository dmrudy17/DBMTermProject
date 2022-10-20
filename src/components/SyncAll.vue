<template>
    <button @click="syncAll()" class="px-4 py-2 bg-green-500 rounded-lg">Synchronize All!</button>
</template>

<script>

import { syncGenres, syncPlatforms } from '../syncTables'

export default {
    
    methods: {
        async syncAll() {

            //await syncGenres();
            //await syncPlatforms();
            
        },
    }
}

</script>
