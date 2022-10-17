<template>
    <button @click="fetchAll()" class="px-4 py-2 bg-green-500 rounded-lg">Fetch All!</button>
</template>

<script>

import { fetchGenres } from '../fetchGenres'

export default {
    
    methods: {
        async fetchAll() {

            await fetchGenres();
        },
    }
}

</script>
