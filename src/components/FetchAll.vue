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

            await fetchGenres();
        },
    }
}

// fetches genre pages from rawg and sends them to our database
// - leverages the value of response to determine when to stop fetching.  If it is undefined, it is most
//   likely because we passed the last valid page number.  Can check error message for details.
async function fetchGenres() {

    const totalPagesWeWant = 1;
    const pageSize = 40;

    for (var pageNum = 1; pageNum <= totalPagesWeWant; pageNum++) {

        var response = await fetchGenrePage(pageSize, pageNum);

        if (!response) // most likely indicates invalid page number
            break;

        for (var genre of response.data.results) 
            await sendGenreToDatabase(genre);
    }
}

// fetches a single genre page
// - returns the response if .get is successful.  If not, error is displayed and return value is undefined
async function fetchGenrePage(pageSize, pageNum) {

    try {

        const url = `https://api.rawg.io/api/genres?key=${apiKey}&page_size=${pageSize}&page=${pageNum}`;
        return await axios.get(url);

    } catch (err) {
        handleError(err);
    }
}

// sends an individual genre to our database
// - ignores errors with code 23505 (unique constraint violation) since that is expected
async function sendGenreToDatabase(g) {

    try {
        
        const { data, error } = await supabase
                .from('Genres')
                .insert( [{ genre_id: g.id, name: g.name}])

        if (error) {
            if (error.code != 23505)
                throw error
        }
        
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
