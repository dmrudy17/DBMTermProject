<template>
    <button @click="fetchAll()" class="px-4 py-2 bg-green-500 rounded-lg">Fetch All!</button>
</template>

<script>
import axios from 'axios';
import { supabase } from '../supabase'
const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export default {
    
    methods: {
        async fetchAll() {

            var response = await fetchGenres();

            const genreList = response.data.results;
            
            for (var genre of genreList) {
                
                await passGenreToDatabase(genre);
            }
        },
    }
}

async function fetchGenres() {

    try {
        
        const url = `https://api.rawg.io/api/genres?key=${apiKey}&page_size=40`;
        return await axios.get(url);
        
    } catch (err) {
        handleError(err);
    }
}

async function passGenreToDatabase(g) {

    try {
        
        const { data, error } = await supabase
                .from('Genres')
                .insert( [{ genre_id: g.id, name: g.name}])

        if (error) throw error
        
    } catch (err) {
        handleError(err);
    }
}

function handleError(e) {
    
    if (e.response) {
        console.log("Server Error: ", e);
    } else if (e.request) {
        console.log("Network Error: ", e);
    } else {
        console.log("Client Error: ", e);
    }
}

</script>
